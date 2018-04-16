var mongoose = require('mongoose');

var thinkings = new mongoose.Schema({
    userId: {
        type: String
    },
    img: {},
    user: {},
    state:{
        type:String
    }
}, {versionKey: false});

module.exports = mongoose.model('thinkings', thinkings, 'thinkings');