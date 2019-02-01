const mysql = require("mysql");

var MYSQL = {};



MYSQL.connect =  function() {
    MYSQL.connection = mysql.createConnection({
        host: "xxxxxxxxxx", // configure your data base correctly
        port: xxxxx,
        user: "xxxxx",
        password: "xxxxxxx",
        database: "xxxxx"
    });
    MYSQL.connection.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("连接成功");
    });
};
MYSQL.queryFromSql = function(query,cb) {
    MYSQL.connect();
    MYSQL.connection.query(query, (error, rows) => {
        if (error) {
            console.log(error);
            return;
        }
        cb(rows);
    });
    MYSQL.close();
};
MYSQL.close =  function() {
    MYSQL.connection.end((error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("连接关闭成功");
    });
};
module.exports = MYSQL;
