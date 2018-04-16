var express = require('express');
var router = express.Router();
var cards = require('../../database/model/card');

router.post('/add', (req, res) => {
    let {content, type} = req.body;
    let user = req.session.user;
    if (!user || user == null) {
        res.json({
            data: '我没有拿到你的session',
            msg: '我没有拿到你的session',
            code: 400,
            ret: false
        })
        return;
    }
    cards.create({user, content, type}, (err, data) => {
        if (err) {
            res.json({
                data: 'err',
                msg: 'err',
                code: 500,
                ret: false
            })
            return;
        }
        if (data == null) {
            res.json({
                data: "用户不存在",
                msg: '用户不存在',
                code: 400,
                ret: false
            })
            return;
        }
        else {
            res.json({
                data: "发布评论成功",
                msg: '发布评论成功',
                code: 200,
                ret: true
            })
        }
        return;
    })
});

router.post('/get', (req, res) => {
    console.log(req.body);
    let {page = 1, rows = 5, type, id} = req.body;
    let params = {};
    if (!id || id == null) {
        params = {};
    } else {
        params = {_id: id};
    }
    cards.find(params).skip((page - 1) * rows).limit(rows).exec((err, data) => {
        if (err) {
            res.json({
                data: err,
                msg: "出错了",
                code: 500,
                ret: false
            });
            return;
        }
        if (data == null || data.length == 0) {
            res.json({
                data,
                msg: "你的参数出错了",
                code: 400,
                ret: false
            });
            return;
        } else {
            cards.count({}, (err, num) => {
                if (err) {
                    res.json({
                        data: err,
                        msg: "出错了",
                        code: 500,
                        ret: false
                    });
                    return;
                }
                else {
                    res.json({
                        data,
                        num: num,
                        msg: "success",
                        code: 200,
                        ret: true
                    });
                    return;
                }
            });
        }
    })
});
router.post('/update', (req, res) => {
    let {userId, comment, id} = req.body;
    console.log(req.body);
    cards.update({_id: id}, {$push: {comment: {userId, comment}}}, (err, data) => {
        console.log(data);
        if (err) {
            res.json({
                data: 'err',
                msg: 'err',
                code: 500,
                ret: false
            })
            return;
        }
        if (data.n == 0) {
            res.json({
                data: "用户不存在",
                msg: '用户不存在',
                code: 400,
                ret: false
            });
            return;
        }
        else {
            res.json({
                data: "对帖子评论成功",
                msg: '对帖子布评论成功',
                code: 200,
                ret: true
            })
        }
        return;
    })
});
router.post('/del', (req, res) => {
    let {_id} = req.body;
    cards.remove({_id}, (err, data) => {
        console.log(data);
        if (err) {
            res.json({
                data: 'err',
                msg: 'err',
                code: 500,
                ret: false
            })
            return;
        }
        if (data.n == 0) {
            res.json({
                data: "评论不存在",
                msg: '评论不存在',
                code: 400,
                ret: false
            });
            return;
        }
        else {
            res.json({
                data: "删除帖子成功",
                msg: '删除帖子成功',
                code: 200,
                ret: true
            });
            return;
        }
    })
});

module.exports = router;
