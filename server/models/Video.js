const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    
    writer: {
        type: Schema.Types.ObjectId, //특이하다
        ref: 'User' //유저 모델에서 다 불러올 수 있다
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true }) //만든 date, 업데이트 date 표시됨

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }