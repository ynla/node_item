
var express = require('express');
var router = express.Router();
var sqlQuery = require('../../model/mysql')
var crypto = require('crypto')

function jiami(str) {
    let salt = "fjdsoigijasoigjasdiodgjasdiojoasid"
    let obj = crypto.createHash('md5')
    str = salt + str;
    obj.update(str)
    return obj.digest('hex')
}

router.get('/register', function (req, res, next) {
    res.render('login/register.ejs')
});

router.post('/register', async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    //判断用户是否存在
    let sqlStr = "SELECT * FROM  user where username = ?"
    let result = await sqlQuery(sqlStr, [username]);
    if (result.length != 0) {
        res.render('info/info', {
            title: "注册失败",
            content: "用户已存在",
            href: "/r/register",
            hrefTxt: "注册页"
        })
    } else {
        //告知用户注册成功
        sqlStr = "insert into user (username,password) values (?,?)"
        await sqlQuery(sqlStr, [username, jiami(password)])
        res.render('info/info', {
            title: "注册成功",
            content: "即将进入页面",
            href: "/rl/login",
            hrefTxt: "登录页"
        })
    }
});




module.exports = router;