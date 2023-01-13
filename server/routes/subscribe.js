const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber.js');



//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
     // 비디오를 서버에 저장한다
     Subscriber.find({ "userTo": req.body.userTo })
        .exec((err, subscirbe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, subscribeNumber: subscirbe.length})
        })
});

router.post('/subscribed', (req, res) => {
    // 비디오를 서버에 저장한다
    Subscriber.find({ "userTo": req.body.userTo, 'userFrom': req.body.userFrom })
       .exec((err, subscirbe) => {
           if(err) return res.status(400).send(err);
           let result = false;
           if(subscirbe.length !== 0 ) {
                result = true
           }
           res.status(200).json({ success: true , subscribed: result})
       })
});


module.exports = router;
