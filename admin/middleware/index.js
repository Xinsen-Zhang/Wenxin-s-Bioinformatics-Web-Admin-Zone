const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");


router.get("/admin/",(req,res) => {
	// console.log("Now into index");
	// console.log(req.session);
	if(!req.session.success){
		res.redirect("/admin/login");
		return ;
	}
	else{
		// console.log("else branch");
		// res.send("Hello world");
		if(req.session.uploadMessage){
			res.locals.uploadMessage = req.session.uploadMessage;
		}
		fs.readdir(path.join(__dirname,"../assets/uploads"),(err,files) =>{
			// console.log(path.join(__dirname,"../assets/uploads"));
			res.locals.files = files;
			res.render("admin/index.ejs");
		})
	}
});

// router.get("/index",(req,res) => {
// 	console.log("Now into index");
// 	console.log(req.session);
// 	if(!req.session.success){
// 		res.redirect("/admin/login");
// 		return ;
// 	}
// 	res.render("admin/index.ejs");
// });

module.exports = router;