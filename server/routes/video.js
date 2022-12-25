const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require('multer');

//Storage Multer Config
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
        // const ext = path.extname(file.originalname)
        console.log(fileType+"박스는 보도록")
        if (fileType == 'mp4') {
            cb(null, true);
        }
        else {cb({msg:'mp4 파일만 업로드 가능합니다.'}, false)}
    } 


const upload = multer({ storage: storage, fileFilter: fileFilter}).single("file")

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
     // 비디오를 서버에 저장한다
     upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
     })
})


module.exports = router;
