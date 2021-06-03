let mysql = require('mysql')

let options = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "12345",
    database: "yygl",
    timezone: "SYSTEM"
};

let con = mysql.createConnection(options)

con.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("数据库连接成功");
    }
})

function sqlQuery(strSql, arr) {
    return new Promise(function (resolve, reject) {
        con.query(strSql, arr, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery;
