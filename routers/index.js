const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	if(req.session.video){
		res.redirect("/home");
		return;
	}
	else{
		req.session.video = true;
	}
    res.render("index.ejs");
});

module.exports = router;