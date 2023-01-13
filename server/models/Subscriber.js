const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { timestamps: true }) //만든 date, 업데이트 date 표시됨

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }