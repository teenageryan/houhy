var express = require('express')

//var bodyParser = require('body-parser')

var app = express()
app.use(express.static('wwwroot'))
//解析body的编码，extended：false 表示开启高级编码功能
//app.use(bodyParser.urlencoded( {extend:false}))

app.get('/login',function(req,res){
   //服务器内部设置接收的请求信息参数值
    if(req.query.sex == 'lucy' && req.query.name == '123456'){
        //console.log('登录成功')     终端显示登录成功
        setTimeout(function () {
            res.send('登录成功')
        },5000)
    }
    else{
        setTimeout(function(){

            console.log('登录失败')
        })
    }
})

//express自身是不支持Post请求的，所以需要导入body-parser模块
//app.post('/login',function(req,res){
//    if(req.body.name == 'lucy'&&req.body.pwd=='123456'){
//        res.status(200).send('post登录成功')
//    }
//    else{
//        res.status(200).send('post登录失败')
//    }
//})

app.listen(3000, function () {
    console.log('kaishi')
})