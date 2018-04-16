var mongoose=require('mongoose');

var news=new mongoose.Schema({
    title:{
        type:String
    },
    img:{
        type:String
    },
    createTime:{
        type:String
    },
    updateTime: {
        type: String
    },
    content:{
        type:String
    },
    type:{
        type:String
    },
    contentText:{
        type:String
    },
    count:{
        type:String
    }
},{versionKey:false});

module.exports=mongoose.model('news',news,'news');