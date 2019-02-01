const express = require("express");
const MYSQL = require("../models/mysql");
const router = express.Router();

router.get("/",(req,res)=>{
    let query = req.query;
    let condition = null;
    if(query.id){
        condition = "where id = " + query.id;
    }
    else{
        condition = "where 1 = 1";
    }
    MYSQL.queryFromSql("select * from Lecture " + condition, (rows) => {
        res.jsonp(rows);
    })
});

router.get("/content",(req,res) =>{
    let query = req.query;
    let condition = null;
    if(query.id){
        condition = "where id = " + query.id;
    }
    else{
        condition = "where 1 = 1 limit 1";
    }
    MYSQL.queryFromSql("select name,content from LectureContent " + condition, (rows) => {
        res.jsonp(rows);
    })
});

module.exports = router;