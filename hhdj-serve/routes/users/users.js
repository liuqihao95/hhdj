var express = require('express');
var router = express.Router();
var users = require('../../database/model/user');
var md5 = require('blueimp-md5');

router.post('/get', (req, res) => {
    let {page = 1, rows = 5, type = 1, id, blong} = req.body;
    let params = {};
    if (id == null) {
        params = {blong}
    } else {
        params = {_id: id}
    }
    users.find(params).sort({_id: -1, type}).skip((page - 1) * rows).limit(rows).exec((err, data) => {
        if (err) {
            res.json({
                data,
                code: 500,
                msg: '查询出错',
                ret: true
            })
        }
        if (data == null) {
            res.json({
                data,
                code: 500,
                msg: '你输入的参数有误',
                ret: true
            })
        }
        else {
            res.json({
                data,
                code: 200,
                msg: 'success',
                ret: true
            })
        }

    })
});

router.post('/add', (req, res) => {
    let {name, userId, homeAddress, workAddress, nation, weixin, qq, sex, highestDeg, title, wage, createTime, lastTime, type, blong} = req.body;
    console.log(blong);
    let params = {
        name,
        userId,
        homeAddress,
        workAddress,
        nation,
        weixin,
        qq,
        sex,
        highestDeg,
        title,
        wage,
        createTime,
        lastTime,
        type,
        blong
    };
    users.create(params, (err, data) => {
        if (err) {
            res.json({
                data,
                code: 500,
                msg: "失败",
                ret: false
            })
        }
        else {
            console.log(data);
            res.json({
                data,
                code: 200,
                msg: "添加成功",
                ret: true
            })
        }
    })

});

router.post('/del', (req, res) => {
    let {id} = req.body;
    let pwd = md5(123456);
    console.log(pwd);
    users.update({_id:{$in:id}},{$set:{pwd}},{multi:true}, (err, data) => {
        if (err) {
            res.json({
                data,
                code: 500,
                msg: "失败",
                ret: false
            });
            return;
        }
        if (data.n == 0) {
            res.json({
                data: "批量重置密码失败",
                code: 400,
                msg: "批量重置密码失败",
                ret: false
            });
            return;
        } else {
            res.json({
                data: '批量重置密码成功',
                code: 200,
                msg: "批量重置密码成功",
                ret: true
            });
            return;
        }
    })

});

router.post('/update', (req, res) => {
    let {img, name, userId, homeAddress, workAddress, nation, weixin, qq, sex, highestDeg, title, wage, createTime, lastTime, type,} = req.body;
    let params = {
        img,
        name,
        homeAddress,
        workAddress,
        nation,
        weixin,
        qq,
        sex,
        highestDeg,
        title,
        wage,
        createTime,
        lastTime,
        type
    };
    users.update({userId}, {$set: params}, (err, data) => {
        if (err) {
            res.json({
                data,
                code: 500,
                msg: "失败",
                ret: true
            })
        }
        if (data.n == 0) {
            res.json({
                data,
                code: 400,
                msg: "修改失败",
                ret: false
            })
        }
        else {
            res.json({
                data,
                code: 200,
                msg: "修改成功",
                ret: true
            })
        }
    })

});

router.post('/logging', (req, res) => {
    let {logging,_id} = req.body;
    console.log(logging)
    console.log(_id)
    users.update({_id}, {$set: {logging}}, (err, data) => {
        if (err) {
            res.json({
                data,
                code: 500,
                msg: "失败",
                ret: true
            })
        }
        if (data.n == 0) {
            res.json({
                data,
                code: 400,
                msg: "修改失败",
                ret: false
            })
        }
        else {
            res.json({
                data,
                code: 200,
                msg: "修改成功",
                ret: true
            })
        }
    })

});

module.exports = router;