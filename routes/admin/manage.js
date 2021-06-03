var express = require('express');
var router = express.Router();
var sqlQuery = require('../../model/mysql')
var sd = require('silly-datetime');

let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

//展示后端页面的信息
router.get('/shop', (req, res) => {
    let sqlStr = 'select * from tab_goods order by(id) desc '
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('admin/shop', {
            list: result
        });
    })
});


//新增页面
router.get('/addpage', function (req, res) {
    res.render('admin/add', { obj: {}, id: "" });
});

//新增页面的数据
router.post('/add', (req, res) => {
    let user = {
        'name': req.body.goods_name,
        'images': req.body.goods_images,
        'brief': req.body.goods_brief,
        'oldprice': parseFloat(req.body.goods_oldprice),
        'newprice': parseFloat(req.body.goods_newprice),
        'createtime': req.body.goods_createtime
    }
    let sqlStr = `INSERT INTO tab_goods(goods_name,goods_images,goods_brief,goods_oldprice,goods_newprice,goods_createtime) VALUES('${user.name}','${user.images}','${user.brief}','${user.oldprice}','${user.newprice}','${time}')`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/admin/shop')
    })
})

//商品的搜索功能
router.post('/shop', (req, res) => {
    let message = req.body.queryInput
    let sqlStr = `SELECT * FROM tab_goods WHERE goods_name LIKE "%${message}%"`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('admin/shop', { list: result })
    })
})

//商品的删除功能
router.delete('/shop/del/:id', (req, res) => {
    let sqlStr = `delete from tab_goods where id = "${req.params.id}"`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("成功删除")
    })
})

//商品的修改功能
router.get('/shop/update/:id', (req, res) => {
    let sqlStr = `SELECT * FROM tab_goods WHERE ID ="${req.params.id}" `
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("admin/update", { arr: result })
    })
})

router.post('/update/:id', (req, res) => {
    let user = {
        'name': req.body.goods_name,
        'images': req.body.goods_images,
        'brief': req.body.goods_brief,
        'oldprice': parseFloat(req.body.goods_oldprice),
        'newprice': parseFloat(req.body.goods_newprice),
        'createtime': req.body.goods_createtime
    }
    let sqlStr = `delete from tab_goods where id = "${req.params.id}"`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err
        console.log(result)
        let sqlStr1 = `INSERT INTO tab_goods(goods_name,goods_images,goods_brief,goods_oldprice,goods_newprice,goods_createtime) VALUES('${user.name}','${user.images}','${user.brief}','${user.oldprice}','${user.newprice}','${time}')`
        sqlQuery(sqlStr1, (err, result) => {
            if (err) throw err
            console.log(result)
            res.redirect('/admin/shop')
        })
    })


})



module.exports = router;