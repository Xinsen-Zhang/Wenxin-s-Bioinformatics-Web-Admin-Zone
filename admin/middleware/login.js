const express = require("express");
const MYSQL = require("../../models/mysql");
const MD5 = require("../../models/MD5");
const router = express.Router();


router.post("/login",(req,res,next) =>{
	req.username = req.body.username;
    req.password = req.body.password;
    req.session.avatar = req.body.avatar ? req.body.avatar : "assets/static/avatar/default.jpeg";
    // res.session.success = false;
    if(!req.username){
    	req.session.message = "Please input your username";
        res.redirect("/admin/login");
        return next("router");
    }
    req.session.username = req.username;
    if(!req.password){
    	req.session.message = "Please input your username";
        res.redirect("/admin/login");
    	return next("router");
    }
    const query = `select password from users where username = "${req.username}"`;
    // console.log(query);
    MYSQL.queryFromSql(query,(rows) => {
        // console.log(rows[0]);
        req.pass = rows;
        next();
    });
});

router.post("/login",(req,res) => {
    if(!req.pass[0]){
        res.message = "User doesn't exit";
        req.session = res.message;
        res.redirect("/admin/login");
        // return next("router");
    }
    else if(req.pass[0].password === MD5.md5(req.password)){
        req.session.username = req.username;
        req.session.success = true;
        res.redirect("/admin/");
        // return next("router");
    }
    else{
        res.message = "password is error";
        req.session.message = res.message;
        res.redirect("/admin/login");
        // return next("router");

    }
    // next();
});


router.get("/login",(req,res) => {
	if(req.session.message){
        res.locals.username = req.session.username;
		res.locals.message = req.session.message;
		res.locals.avatar = req.session.avatar;
		console.log(res.locals.message);
		console.log(res.locals.avatar);
	}
    if(req.query){
        if(req.query.logout){
            req.session.success = null;
        }
    }
	res.render("admin/login.ejs");
})


module.exports = router;

