const MYSQL = require("../models/mysql");
module.exports = (req,res) =>{
    MYSQL.queryFromSql("select * from Analysis",(rows)=>{
        res.locals.rows = rows;
        res.render("analysis.ejs");
    });
};