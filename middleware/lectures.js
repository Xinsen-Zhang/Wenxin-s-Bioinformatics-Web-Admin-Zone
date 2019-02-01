const MYSQL = require("../models/mysql");
module.exports = (req,res) =>{
    MYSQL.queryFromSql("select * from Lecture",(rows)=>{
        res.locals.rows = rows;
        res.render("lecture.ejs");
    });
};