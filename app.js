const express = require("express");
const weather = require("./api/city");
const lectures = require("./api/lectures");
const analysis = require("./api/analysis");
const bodyParser = require("body-parser");
const adminApi = require("./admin/middleware/api");



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/", weather.hangzhou);
app.use("/api/lectures",lectures);
app.use("/api/analysis",analysis);
app.use("/admin",adminApi);
const server = app.listen(1221);


server.on("error",function(error){
    console.log("on error handler");
    console.error(error);
    // server = app.listen(80);
});
server.setTimeout(0);