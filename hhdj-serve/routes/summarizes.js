var express = require('express');
var router = express.Router();
var summarizes = require('../database/model/summarize');
router.post('/add', (req, res) => {
    let {userId, img} = req.body;
    let user = req.session.user;
    if(!user||user==null){
        res.json({
            data:"失败",
            msg: "我没有拿到你的cookie",
            code: 400,
            ret: false
        });
        return;
    }
    summarizes.create({userId, img, user}, (err, data) => {
        if (err) {
            res.json({
                data: err,
                msg: "后台出错了",
                code: 500,
                ret: false
            });
            return;
        }
        if (data == null) {
            res.json({
                data,
                msg: "你出错了",
                code: 400,
                ret: false
            });
            return;
        }
        else {
            res.json({
                data:"success",
                msg: "心得上传成功",
                code: 200,
                ret: true
            });
            return;
        }
    })

});

router.post('/get', (req, res) => {
    let {page=1, rows=5,userId} = req.body;
    let params={};
    if(!userId||userId==null){
        page = Number(page);
        rows = Number(rows);
        params={}
    }else{
        params={userId}
    }
    summarizes.find(params).sort({_id:-1}).skip((page - 1) * rows).limit(rows).exec((err, data) => {
        if (err) {
            res.json({
                data: err,
                msg: "出错了",
                code: 500,
                ret: false
            });
            return;
        }
        if (data == null||data.length==0) {
            res.json({
                data,
                msg: "你的参数出错了",
                code: 400,
                ret: false
            });
            return;
        } else {
            summarizes.count(params,(err,num)=>{
                if(err){
                    res.json({
                        data:err,
                        msg: "success",
                        code: 500,
                        ret: false
                    });
                    return;
                }else {
                    res.json({
                        data,
                        num,
                        msg: "success",
                        code: 200,
                        ret: true
                    });
                    return;
                }
            })
        }
    })
});

router.post('/del',(req,res)=>{
    let {id}=req.body;
    summarizes.remove({_id:id},(err,data)=>{
        if (err){
            res.json({
                data,
                msg:"后台出错了",
                code:500,
                ret:false
            });
            return;
        }
        if (data.n==0){
            res.json({
                data,
                msg:"ID不存在",
                code:400,
                ret:false
            });
            return;
        }else {
            res.json({
                data:'删除成功',
                msg:"success",
                code:200,
                ret:true
            });
            return;
        }
    })
});

router.post('/update',(req,res)=>{
    let {id,state,reason}=req.body;
    let passTime=Number(new Date());
    summarizes.update({_id:{$in:id}},{$set:{state,reason,passTime}},{multi:true},(err,data)=>{
            if (err){
                res.json({
                    data:err,
                    msg:"后台出错了",
                    code:500,
                    ret:false
                });
                return;
            }
            if (data.n==0){
                res.json({
                    data,
                    msg:"前台出错了",
                    code:400,
                    ret:false
                });
                return;
            }else {
                res.json({
                    data:'修改成功',
                    msg:"success",
                    code:200,
                    ret:true
                });
                return;
            }
        })
});

module.exports = router;