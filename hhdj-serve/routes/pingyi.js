var express = require('express');
var router = express.Router();
var pingyi = require('../database/model/pingyi');
router.post('/add', (req, res) => {
    let {userId, img,comment,commentPeople} = req.body;
    let state="审核中";
    pingyi.create({userId, img,comment,commentPeople,state},(err, data) => {
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
                data,
                msg: "评议上传成功",
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
    if(userId==null){
        page = Number(page);
        rows = Number(rows);
        params={}
    }else{
        page = Number(page);
        rows = Number(rows);
        params={userId}
    }
    pingyi.find(params).sort({_id:-1}).skip((page - 1) * rows).limit(rows).exec((err, data) => {
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
            res.json({
                data,
                msg: "success",
                code: 200,
                ret: true
            });
            return;
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
    let {id,state}=req.body;
    console.log(id[1]);
    // let id0=JSON.parse(id);
    // id=JSON.stringify(id);
    summarizes.update({_id:{$in:id}},{$set:{state}},{multi:true},(err,data)=>{
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