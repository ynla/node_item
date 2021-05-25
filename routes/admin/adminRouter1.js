//这是前端注册路由

var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('admin/index1')
});


module.exports = router;