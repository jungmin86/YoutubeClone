const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber.js');



//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
     // 비디오를 서버에 저장한다
     Subscriber.find({ "userTo": req.body.userTo})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, subscribeNumber: subscribe.length})
        })
});

router.post('/subscribed', (req, res) => {
    // 비디오를 서버에 저장한다
    Subscriber.find({ "userTo": req.body.userTo, 'userFrom': req.body.userFrom })
       .exec((err, subscribe) => {
           if(err) return res.status(400).send(err);
           let result = false;
           if(subscribe.length !== 0 ) {
                result = true
           }
           res.status(200).json({ success: true , subscribed: result})
       })
});


router.post('/unSubscribe', (req, res) => {

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, doc})
        })
});
router.post('/subscribe', (req, res) => {

    const subscribe = new Subscriber(req.body);
    subscribe.save((err, doc) => {
        if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, doc})
    })
    
});



module.exports = router;
