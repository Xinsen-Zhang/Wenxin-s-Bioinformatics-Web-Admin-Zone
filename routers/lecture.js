const express = require("express");
const router = express.Router();
const lectureInfo = require("../middleware/lectures");


router.get("/",lectureInfo);
// routers.get("/",(req,res) => {
//     res.render("lecture.ejs");
// })
module.exports = router;