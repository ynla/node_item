var express = require('express');
var router = express.Router();
var sqlQuery = require('../../model/mysql')

//展示页面的信息
router.get('/shop', (req, res, next) => {
    let sqlStr = 'select * from goods order by(id) desc '
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
        'name': req.body.name,
        'brief': req.body.brief,
        'taste': req.body.taste,
        'price': parseFloat(req.body.price),
    }
    let sqlStr = `INSERT INTO goods(name,brief,taste,price) VALUES('${user.name}','${user.brief}','${user.taste}','${user.price}')`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/admin/shop')
    })
})

//商品的搜索功能
router.post('/shop/:message', (req, res) => {
    let message = req.params.message
    let sqlStr = `SELECT * FROM goods WHERE name LIKE "%${message}%"`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})

//商品的删除功能
router.delete('/shop/del/:id', (req, res) => {
    let sqlStr = `delete from goods where id = "${req.params.id}"`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("成功删除")
    })
})

//商品的修改功能
router.get('/shop/update/:id', (req, res) => {
    let sqlStr = `SELECT * FROM goods WHERE ID ="${req.params.id}" `
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("admin/update", { arr: result })
    })
})

router.post('/update/:id', (req, res) => {
    let user = {
        'name': req.body.name,
        'brief': req.body.brief,
        'taste': req.body.taste,
        'price': parseFloat(req.body.price),
    }
    let sqlStr = `delete from goods where id = "${req.params.id}"`
    sqlQuery(sqlStr, (err, result) => {
        if (err) throw err
        console.log(result)
        let sqlStr1 = `INSERT INTO goods(id,name,brief,taste,price) VALUES('${req.params.id}','${user.name}','${user.brief}','${user.taste}','${user.price}')`
        sqlQuery(sqlStr1, (err, result) => {
            if (err) throw err
            console.log(result)
            res.redirect('/admin/shop')
        })
    })


})



module.exports = router;