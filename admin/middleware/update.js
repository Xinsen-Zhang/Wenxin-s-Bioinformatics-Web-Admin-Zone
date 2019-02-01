const express = require("express");
const MYSQL = require("../../models/mysql");
const router = express.Router();

router.post("/api/update",(req,res) => {
	console.log(req.body);
	const field = req.body.field;
	const name = req.body.name.trim();
	const query = req.body.query;
	const content = req.body.content.replace(/'/g,'"');
	const tableName = field.split("=")[1];
	let sql = `update ${tableName} set name= '${name}', content = '${content}' where ${query}`;
	MYSQL.queryFromSql(sql,() => {
		let anotherTable = tableName.replace("Content","");
		sql = `update ${anotherTable} set name = '${name}' where ${query}`;
		// console.log(sql);
        MYSQL.queryFromSql(sql,()=>{
        	let message = {};
            message.success = true;
            res.jsonp(message);
		})
	})
});

module.exports = router;
