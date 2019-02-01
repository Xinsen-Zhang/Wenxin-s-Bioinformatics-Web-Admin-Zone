const express = require("express");
const router = express.Router();
const MYSQL = require("../models/mysql");
const MD5 = require("../models/MD5");

router.post("/login",(req,res,next)=>{
    req.username = req.body.username;
    req.password = req.body.password;
    if(!req.username){
        // req.session.message = "please input your username";
        // req.session.success = false;
        let json = {};
        json.success = false;
        json.message = "Please input your username";
        // res.redirect("/home");
        res.json(json);
        return next("router");
    }
    if(!req.password){
        // req.session.message = "please input your password";
        // req.session.success = false;
        let json = {};
        json.success = false;
        json.message = "Please input your password";
        // res.redirect("/home");
        res.json(json);
        return next("router");
    }
    const query = `select password from users where username = "${req.username}"`;
    // console.log(query);
    MYSQL.queryFromSql(query,(rows) => {
        // result = rows;
        req.pass = rows;
        next();
    });
});

router.post("/login",(req,res,next) => {
    if(!req.pass[0]){
        res.message = "User doesn't exit";
        res.success = false;
    }
    else if(req.pass[0].password === MD5.md5(req.password)){
        req.session.username = req.username;
        res.message = `Welcome back ${req.username}`;
        res.success = true;
    }
    else{
        res.message = "password is error";
        res.success = false;
    }
    next();
});

//渲染业务
//不用渲染页面。重新加载会增加浏览器的负载
//使用ajax进行登录请求
router.post("/login",(req,res)=>{
    // 如果成功登录的话，现在在session里面已经记录了数据了
    // 那么只要返回json格式的数据便可
    let json = {}
    json.message = res.message;
    json.success = res.success;
    res.json(json);
});

module.exports = router;