const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const uploadDir = "./admin/assets/uploads";

const createDir = function(folder){
    try{
        fs.accessSync(folder);
    }
    catch(e){
        fs.mkdirSync(folder);
    }
};

createDir(uploadDir);

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,uploadDir);
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = function(req,file,cb){
    if(file.mimetype.indexOf("image")!== -1){
        req.message = "File upload is successful";
        cb(null,true);
    }else{
        req.message = file.originalname + " error, only image file accepts";
        cb(null,false);
    }
};

const upload = multer({storage: storage,fileFilter:fileFilter});

router.post("/imageUpload",upload.array("image"),(req,res) =>{
    // res.locals.message = req.message;
    // console.log("balaba;a");
    // const uplaod = upload;
    // console.log(req.message);
    req.session.uploadMessage = req.message;
    res.redirect("/admin");
});

module.exports = router;