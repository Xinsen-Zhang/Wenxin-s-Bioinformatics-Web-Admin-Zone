const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
exports.hangzhou = router.get("/weather",(req,res) =>{
    request.get("http://www.tianqi.com/hangzhou/",(err, response, body)=> {
        const $ = cheerio.load(body);
        const weatherInfo = $("dl.weather_info");
        const now = weatherInfo.find("p.now b").text() + weatherInfo.find("p.now i").text();
        const temp =  weatherInfo.find(".weather>span").text();
        const obj = {"date":Date().toString().split(" ").splice(0,4).join(","),
            city:"hangzhou",
            weather: temp,
            now: now};
        res.jsonp(obj);
    });
});