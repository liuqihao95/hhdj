var mongoose = require('mongoose');

var pingyi = new mongoose.Schema({
    userId: {
        type: String
    },
    img: {
        type: String
    },
    comment: {},
}, {versionKey: false});

module.exports = mongoose.model('pingyi', pingyi, 'pingyi');