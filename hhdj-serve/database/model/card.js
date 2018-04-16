var mongoose=require('mongoose');

var cards= new mongoose.Schema({
    user:{
    },
    content:{
        type:String
    },
    type:{
        type:String
    },
    comment:{
    }
},{versionKey:false});
module.exports=mongoose.model("cards",cards,"cards")

