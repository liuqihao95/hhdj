var mongoose = require('mongoose');

var summarizes = new mongoose.Schema({
    userId: {
        type: String
    },
    img: {
        type: String
    },
    user: {},
    state: {
        type: Number,
        default:0
    },
    reason: {
        type: String,
        default:''
    },
    passTime: {
        type: Number,
    }
}, {versionKey: false});

module.exports = mongoose.model('summarizes', summarizes, 'summarizes');