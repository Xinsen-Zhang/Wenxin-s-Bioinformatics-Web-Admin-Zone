const express = require("express");
const router = express.Router();

router.get("/edit",(req,res) => {
	if(!req.session.success){
		res.redirect("/admin/login");
	}
	const query = req.query;
	let message = {};
	if(!query.field){
		message.message = "Missing field";
		res.jsonp(message);
		return ;
	}
	if(!query.id){
		message.message = "Missing query";
		res.jsonp(message);
		return ;
	}
	res.render("admin/edit.ejs");
})

module.exports = router;