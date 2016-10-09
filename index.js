var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio')

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    var cprovince=req.query.province;
    var ccity=req.query.city;

    //encodeUnicode
    function encodeUnicode(str) {
        var temp = "";
        temp += str;
        var result = "";
        for (var i = 0; i < temp.length; i++) {
            var code = temp.charCodeAt(i);
            var unicode = code.toString(16).toUpperCase();
            result = result + "&#x" + unicode + ";";
        }
        return result;
    }

    //search province
    var provinceURL;
    var arr=new Array();
    request("http://tianqi.moji.com/weather/china/", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            provinceURL=$('.city .city_list li a').filter(function (i,element) {
                return $(this).html()==encodeUnicode(cprovince);
            }).attr('href');
            var cityURL;
            var uri="http://tianqi.moji.com"+provinceURL;
            request({url:uri}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(body);
                    cityURL=$('.city_hot li a').filter(function (i,element) {
                        return $(this).html()==encodeUnicode(ccity);
                    }).attr('href');
                    request({uri:cityURL}, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var $ = cheerio.load(body);
                            var todWeather=$('.forecast .days li').eq(1).text();
                            var todayWeather=todWeather.trim();
                            var tomWeather=$('.forecast .days li').eq(6).text();
                            var tomorrowWeather=tomWeather.trim();
                            var dWeather=$('.forecast .days li').eq(11).text();
                            var DATomorrowWeather=dWeather.trim();
                            res.json({"now":{
                                "temperature":$('.wea_weather em').html(),
                                "weather":$('.wea_weather b').html(),
                                "wind":$('.wea_about em').html(),
                            },
                            "today":{
                                "temperature":$('.forecast .days li').eq(2).html(),
                                "weather":todayWeather,
                                "wind":$('.forecast .days li em').eq(0).html()+$('.forecast .days li b').eq(0).html()
                            },
                            "tomorrow":{"temperature":$('.forecast .days li').eq(7).html(),
                                "weather":tomorrowWeather,
                                "wind":$('.forecast .days li em').eq(1).html()+$('.forecast .days li b').eq(1).html()
                            },
                                "DATomorrow":{"temperature":$('.forecast .days li').eq(12).html(),
                                    "weather":DATomorrowWeather,
                                    "wind":$('.forecast .days li em').eq(2).html()+$('.forecast .days li b').eq(2).html()
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
app.listen(3000);