const express = require("express");
const MYSQL = require("../../models/mysql");
const MD5 = require("../../models/MD5");
const router = express.Router();



router.get("/api/user",(req,res) => {
	let message = {};
	const query = req.query;
	if(!query.username){
		message.success = false;
		res.jsonp(message);
		return ;
	}
	const username = query.username;
	let sql = `select avatar from users where username = "${username}" limit 1`;
	MYSQL.queryFromSql(sql,(rows) =>{
		if(rows[0]){
			message.success = true;
			message.avatar = rows[0].avatar;
		}else{
			message.success = false;
			message.message = "user doesn't exit";
		}
		res.jsonp(message);
	})
});

router.get("/api/title",(req,res) => {
	let message = {};
	const query = req.query;
	if(!query.field){
		message.success = false;
		res.jsonp(message);
		return ;
	}
	const field = query.field;
	let sql = `select * from ${field}`;
	MYSQL.queryFromSql(sql,(rows) =>{
		if(rows[0]){
			message.success = true;
			message.data = rows;
		}else{
			message.success = false;
			message.message = "field doesn't exit";
		}
		res.jsonp(message);
	})
})


router.get("/api/content",(req, res) => {
	let message = {};
	const query = req.query;
	if(!query.field){
		message.success = false;
		message.message = "missing field";
		res.jsonp(message);
		return ;
	}
	const field = query.field;
	if(!query.id){
		message.success = false;
		message.message = "missing query id";
		res.jsonp(message);
		return ;
	}
	const id = query.id;
	let sql = `select * from ${field} where id = ${id} limit 1`;
	MYSQL.queryFromSql(sql,(rows) =>{
		if(rows[0]){
			message.success = true;
			message.data = rows;
		}else{
			message.success = false;
			message.message = "field doesn't exit";
		}
		res.jsonp(message);
	})
})


module.exports = router;