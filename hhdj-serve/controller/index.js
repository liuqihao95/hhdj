const {Router} = require("express");
const router = Router();
const session = require('express-session');
const dbConfig = require('../database/config');
const getData = require('./getData')

router.use(
    session({
        secret: "yao",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 3600 * 1000 * 24 * 30}
    })
);

router.use("/", require("./upload"));
router.use('/news', require("../routes/news/news"));
router.use('/users', require("../routes/users/users"));
router.use('/users', require("../routes/login"));
router.use('/users', require("../routes/loginout"));
router.use('/users', require("../routes/changePwd"));
router.use('/cards', require("../routes/card/cards"));
router.use('/notices', require("../routes/notice"));
router.use('/summarizes', require("../routes/summarizes"));
router.use('/thinkings', require("../routes/thinkings"));
router.use('/apply', require("../routes/apply"));
router.use('/newsType', require("../routes/newsType"));
router.use('/fengcai', require("../routes/fengcai"));
router.use('/lunbo', require("../routes/lunbo"));
router.use('/blong', require("../routes/blong"));
router.use('/pingyi', require("../routes/pingyi"));
router.use('/score', require("../routes/score"));

router.get("/getDate", (req, res, next) => {
    getData().then(data => {
        res.json({
            data,
            mag: '成功',
            code: 200,
            ret: true
        })
    })
})

function checklogin(req, res, next) {
    if (!req.session.user) {
        res.json({
            data: "用户未登录",
            code: 401,
            msg: "你还没有登录，去登陆不吧，亲！",
            ret: false
        });
        return;
    }
    next();
};
module.exports = router;