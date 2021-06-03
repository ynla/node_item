//这是前端注册路由

var express = require('express');
var router = express.Router();
var sqlQuery = require('../../model/mysql')


router.get('/', (req, res) => {
    let sqlStr = 'select * from tab_goods order by(id) desc '
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('admin/index1', {
            list: result
        });
    })
});





module.exports = router;