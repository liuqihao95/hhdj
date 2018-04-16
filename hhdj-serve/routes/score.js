var express = require('express');
var router = express.Router();
var score = require('../database/model/score');

router.post('/get', (req, res) => {
    let {page = 1, rows = 5,userId} = req.body;
    score.find({userId}).sort({_id: -1}).skip((page - 1) * rows).limit(rows).exec((err, data) => {
        if (err) {
            res.json({
                data,
                code: 500,
                msg: '查询出错',
                ret: true
            })
        }
        if (data == null || data.length == 0) {
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

module.exports = router;