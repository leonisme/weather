# weather
一个通过node.js爬虫实现的国内天气API
##简介
这是一个关于国内天气的node.js爬虫项目，爬虫的数据来自墨迹天气PC端网站(http://tianqi.moji.com/
)。通过GET方法传入省份名和城市名，可以实时获取该地区当前、今天、明天以及后天的天气信息。
##使用方法
###安装npm
需要安装express、request、cheerio这三个node.js库

`$ npm install express --save`

`$ npm install request --save`

`$ npm install cheerio --save`
###运行[index.js](https://github.com/leonisme/weather/blob/master/index.js)
`$ node index.js`
###获取API
在URI后加上省份和城市（市、区、县等均可）名

例如：

`http://127.0.0.1:3000/?province=北京&city=北京市`
###API
API以json形式返回

-`now`:当前天气的相关信息

-`today`:今天天气的相关信息

-`tomorrow`:明天天气的相关信息

-`DATomorrow`:后天天气的相关信息

-`temperature`：温度

-`weather`：天气状况

-`wind`:风向
##案例
见[example.html](https://github.com/leonisme/weather/blob/master/example.html)
