/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express')
var app = express()

function first(req,res,next){
    console.log('我是第一个请求处理')
    next()
}
function second(req,res,next){
    console.log('我是第er个请求处理')
    next()
}
function third(req,res,next){
    console.log('我是第sa个请求处理')
    //res.send('第三个请求已开始返回响应数据')
    next()
}
function fouth(req,res,next){
    console.log('我是第s个请求处理')
    //res.send('第四个请求已开始返回响应数据')
    next()
}

//一个请求多个处理方法，直到方法中有响应数据，请求停止，如果方法中没有相应数据，会执行下一个方法（都有next方法）

//没有next（）不会接着执行下面的方法third里边没有next的话，只会执行first和third的内容，其他不会执行（按顺序执行）
app.get('/',first ,third,second,fouth,function(req,res){
    console.log('我正在访问当前这个页面')
    res.send('依然在访问中')
})
app.listen(3000,function(){
    console.log('请求处理管线 is running')
})

app.get('/login',function(req,res){
    var name = req.query.name
    res.send(name)
})
app.get('/user/:age/:male',function(req,res){
    var age = req.params.age
    var male = req.params.male
    res.send(age + ' ' + male)
})