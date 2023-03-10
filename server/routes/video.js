const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video.js");
const { auth } = require("../middleware/auth.js");
const { Subscriber } = require('../models/Subscriber.js');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

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
        console.log(fileType)
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

// router.post('/getVideoDetail', (req, res) => {

//     Video.findOne({'_id' : req.body.videoId})
//         .populate('writer')
//         .exec((err, videoDetail) => {
//             if(err) return res.status(400).send(err);
//             return res.status(200).json({success: true, videoDetail})
//         })
    
// })

router.post("/getVideoDetail", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, VideoDetail) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, VideoDetail })
    })
});

router.post('/uploadVideo', (req, res) => {
    // 비디오 정보들을 mongoDB에 저장한다
    const video = new Video(req.body)

    video.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success : true })
    })
})

router.get('/getVideos', (req, res) => {
    // 비디오를 DB에서 가져와서 클라이언트에 보낸다.

    Video.find()
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, video})
    })
})

router.post('/getSubscriptionVideos', (req, res) => {
    // 자신의 ID를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find( { userFrom: req.body.userFrom })
        .exec((err, subscriberInfo) => {
            if(err) return res.status(400).send(err);

            let subscribedUser = [];
            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo)
            })

            Video.find({ writer: {$in: subscribedUser}})
                .populate('writer')
                .exec((err, videos) => {
                    if(err) return res.status(400).send(err);
                    res.status(200).json({success: true, videos})
                })
        })
    //찾은 사람들의 비디오를 가지고 온다.
    

    
})



router.post('/thumbnail', (req, res) => {
    //썸네일 생성하고 비디오 러닝타임 같은 정보 가져오기 

    
    let filePath = "";
    let fileDuration = "";
  
     // 비디오 전체 정보 추출
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
      console.dir(metadata);
      console.log(metadata.format.duration);
  
      fileDuration = metadata.format.duration;
    });
    //썸네일 생성   
    ffmpeg(req.body.url)
    .on('filenames', function (filenames) { //파일네임 생성 (썸네일 파일네임)
        console.log("Will generate " + filenames.join(', '));
        console.log(filenames);

        filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', function() { //다 생성하고 무엇을 할 것인지
        console.log("Screenshots taken");
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', function(err) { //에러가 났을 시?
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots( {  //
        count: 3, //3개의 썸네일 찍을 수 있음
        folder: 'uploads/thumbnails/', //썸네일 저장될 위치
        size: '320x240',
        filename: 'thumbnail-%b.png' //썸네일-원래 네임(익스텐션 제외)
    })
})


module.exports = router;
