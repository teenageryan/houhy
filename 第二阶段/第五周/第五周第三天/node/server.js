//引入express模块  node.js的第三方框架，可以快速创建一个网站
var express = require('express')
//使用express函数创建一个实例对象
//var app = express(function(){
//    return new express()
//})
var app = express()
//use是express调用中间件的方法。
//通过一个中间件，每一个请求都会经过这个处理程序
//将wwwroot静态资源，默认打开静态资源的网站页面是Index.html
app.use(express.static('wwwroot'))
//req : request请求
//res:response响应
//当用户访问当前页面的时候，数据返回浏览器
//与页面传送地址一致
app.get('/user',function(req,res){
    //res.send('ajax is running')
    //获取请求中的数据age，当前age在request的query属性中
    var age = req.query.age
    res.status(200).send(age)
})
//使用listen方法绑定3000端口，并执行回调函数
app.listen(3000,function(){
    //判断服务器是否运行
    console.log('ajax is runing')
})
//NPM（node package manager），通常称为node包管理器
//1.npm init ---- 初始化当前的包管理工具，设置属性：名称、描述、作者等信息
//2.npm install express --save    ----安装express框架
//3.在js文件中，搭建服务器