const express = require("express");
const router = express.Router();

router.all("/logout",(req,res)=>{
    if(req.session.username){
        req.session.username = null;
        req.session.message = null;
    }
    else{
        req.session.message = "please login";
        req.session.success = false;
    }
    res.redirect("/home");
});

module.exports = router;