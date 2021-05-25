//这是后端注册路由

var express = require('express');
var router = express.Router();

//是否允许进入后台的中间件
function permisson(req, res, next) {
    if (req.session.username == undefined) {
        res.render("info/info", {
            title: "尚未登录",
            content: "请重新登录,即将进入登录页",
            herf: "/rl/login",
            herfTxt: "登录页",
        })
    } else {
        next()
    }
}

router.get('/', permisson, function (req, res, next) {
    res.render('admin/index')
});




module.exports = router;