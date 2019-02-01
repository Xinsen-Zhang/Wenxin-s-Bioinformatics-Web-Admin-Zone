const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");
const index = require("./routers/index");
const home = require("./routers/home");
const lecture = require("./routers/lecture");
const analysis = require("./routers/analysis");
const reflection = require('./routers/reflection');
const profile = require('./routers/profile');
const login = require("./middleware/login");
const logout = require("./middleware/logout");
const adminLogin = require("./admin/middleware/login");
const adminIndex = require("./admin/middleware/index");
const adminEdit = require("./admin/middleware/edit");
const update = require("./admin/middleware/update");
const uploadImage = require("./admin/middleware/imageUpload");


const app = express();

app.use(express.static("./assets/static"));
app.use(express.static("./assets/vendor"));
app.use('/admin',express.static("./admin/",{index:"login"}));
// app.use(express.static("./admin/assets/vendor"));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));

app.use("/",login);
app.use("/",logout);
app.use("/", index);
app.use("/index", index);
app.use("/home", home);
app.use("/lecture", lecture);
app.use("/analysis", analysis);
app.use("/reflection", reflection);
app.use("/profile", profile);


// 后台页面
app.use("/admin",adminLogin);
app.use("/",adminIndex);
app.use("/admin",uploadImage);
app.use("/admin",adminEdit);
app.use("/admin",update);
var server = app.listen(80);

server.on("error",function(error){
    console.log("on error handler");
    console.error(error);
    // server = app.listen(80);
});
server.setTimeout(0);
