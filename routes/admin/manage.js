var express = require('express');
var router = express.Router();
var sqlQuery = require('../../model/mysql')
var sd = require('silly-datetime');

let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')



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
    sqlQuery(sqlStr, (err, result1) => {
        let page = (req.query.page == undefined) ? 0 : req.query.page;
        let startPage = page * 5;
        console.log(startPage);

        //从数据库上拿数据
        let count = 'select count(*) as count from tab_goods';
        let sql = `select * from tab_goods order by(id) desc limit ${startPage},5 `;

        sqlQuery(count, (err, result) => {
            if (err) throw err;
            let countNum = result[0].count;
            sqlQuery(sql, (err, result) => {
                if (err) throw err;
                // console.log(result);
                res.render('admin/shop', {
                    list: result1,
                    count: countNum,
                    page: page
                })
            })
        })
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

//分页功能
router.get('/shop', (req, res) => {
    console.log(req.query.page);
    // 获取get后面的page参数值，没有page的数值的时候，给它的默认值为0;
    let page = (req.query.page == undefined) ? 0 : req.query.page;
    let startPage = page * 5;
    console.log(startPage);

    //从数据库上拿数据
    let count = 'select count(*) as count from tab_goods';
    let sql = `select * from tab_goods order by(id) desc limit ${startPage},5 `;

    sqlQuery(count, (err, result) => {
        if (err) throw err;
        let countNum = result[0].count;
        sqlQuery(sql, (err, result) => {
            if (err) throw err;
            // console.log(result);
            res.render('admin/shop', {
                list: result,
                count: countNum,
                page: page
            })
        })
    })
})


module.exports = router;