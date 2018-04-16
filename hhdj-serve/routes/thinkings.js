var express = require('express');
var router = express.Router();
var thinking = require('../database/model/thinking');

router.post('/add', (req, res) => {
    let {userId, img} = req.body;
    let state="审核中";
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
    thinking.create({userId, img, user,state}, (err, data) => {
        console.log(data);
            if(err){
                res.json({
                    data:err,
                    msg:'后台错了',
                    code:500,
                    ret:false
                });
                return;
            }
            if (data==null){
                res.json({
                    data,
                    msg:'前台错了',
                    code:400,
                    ret:false
                });
                return;
            } else{
                res.json({
                    data:"success",
                    msg:'思想汇报添加成功',
                    code:200,
                    ret:true
                });
                return;
            }
    });
});

router.post('/get', (req, res) => {
    let {page=1, rows=5,id,userId} = req.body;
    console.log(req.body)
    let params={};
    if(id==null){
        page = Number(page);
        rows = Number(rows);
        params={userId}
    }else{
        params={_id:id}
    }
    thinking.find(params).sort({_id:-1}).skip((page - 1) * rows).limit(rows).exec((err, data) => {
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

router.post('/getState', (req, res) => {
    let {id} = req.body;
    thinking.findOne({_id:id},(err, data) => {
        if (err) {
            res.json({
                data: err,
                msg: "出错了",
                code: 500,
                ret: false
            });
            return;
        }
        if (data == null) {
            res.json({
                data,
                msg: "你的参数出错了",
                code: 400,
                ret: false
            });
            return;
        } else {
            res.json({
                data:data.state,
                msg: "success",
                code: 200,
                ret: true
            });
            return;
        }
    })
});

router.post('/update', (req, res) => {
    let {id,state} = req.body;
    console.log(id)
    thinking.update({_id:{$in:id}},{$set:{state}},{multi:true},(err, data) => {
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
                data:"success",
                msg: "修改成功",
                code: 200,
                ret: true
            });
            return;
        }
    })
});

router.post('/del', (req, res) => {
    let {id} = req.body;
    thinking.remove({_id:id},(err, data) => {
        if (err) {
            res.json({
                data: err,
                msg: "出错了",
                code: 500,
                ret: false
            });
            return;
        }
        if (data.n == 0) {
            res.json({
                data,
                msg: "你的参数出错了",
                code: 400,
                ret: false
            });
            return;
        } else {
            res.json({
                data:"删除成功",
                msg: "success",
                code: 200,
                ret: true
            });
            return;
        }
    })
});




module.exports = router;