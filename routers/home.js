const express =require("express");
const router = express.Router();

router.get("/",(req,res) => {
    if(!req.session.username){
        res.locals.success = false;
        res.locals.message = "Hi,visitor~";
    }

    if(req.session.message){
        res.locals.success = req.session.success;
        res.locals.message = req.session.message;
    }
    // else{
    //     res.locals.success = false;
    //     res.locals.message = "Hi,visitor~";
    // }

    res.render("home.ejs");
});

module.exports = router;