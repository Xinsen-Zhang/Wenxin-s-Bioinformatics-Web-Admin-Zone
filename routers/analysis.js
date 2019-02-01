const express = require("express");
const router = express.Router();
const analysisInfo = require("../middleware/analysis");


router.get("/",analysisInfo);
// routers.get("/",(req,res) => {
//     res.render("lecture.ejs");
// })
module.exports = router;