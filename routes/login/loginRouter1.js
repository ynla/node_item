var express = require('express');
var router = express.Router();
var sqlQuery = require('../../model/mysql')
var jiami = require("../../model/jiami")


router.get('/login', function (req, res, next) {
    res.render('login/login1')
});

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let sqlStr = "SELECT * FROM login_user where username=? and password = ?";
    let result = await sqlQuery(sqlStr, [username, jiami(password)])
    if (result.length == 0) {
        //登录失败
        res.render('info/info', {
            title: "登录失败",
            content: "用户或密码错误",
            href: "/r/login",
            hrefTxt: "登录页"
        })

    } else {
        req.session.username = username;
        res.render('info/info', {
            title: "登录成功",
            content: "立即跳转至后台",
            href: "/admin1",
            hrefTxt: "蛋糕官网"
        })
    }
})




module.exports = router;

