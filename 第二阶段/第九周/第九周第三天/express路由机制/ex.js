/**
 * Created by Administrator on 2016/10/10.
 */
var express  = require('express')
//var app = express(function(){
//    return new express
//})

//路由---由路径和HTTP请求方法组成，处理浏览器发起的请求（含路径），以及返回的响应
//路由结构 --- app.METHOD(url,callback)
//eg:app.get('/',function(){
//    res.send('9999')
//})
//方法一和方法二比较，方法一中，所有方法比较分散，当处理同一个路径时，不便于管理和查询
//方法二把对同一路径的请求处理绑定在同一个app.route（）中，便于管理和查询

var app = express()
//没有写请求方式时，默认为POST请求；all能匹配所有请求方式，其他都是对应的
app.route('/').post(function(req,res){
    res.send('eeeee')
}).all(function(req,res){
    res.send('all处理过的首页')
}).get(function(req,res){
    res.send('get请求处理的首页')
}).post(function(req,res){
    res.send('post请求处理的首页')
}).put(function(req,res,next){
    res.send('put请求处理的首页')
})

//app.get('/',function(req,res){
//    res.send('网站首页')
//})
//app.get('/login',function(req,res){
//    res.send('登录页面')
//})
//app.get('/zhuce',function(req,res){
//    res.send('注册页面')
//})
//app.post('/',function(res,res){
//    res.send('发起POST请求')
//})


app.listen(1000,function(){
    console.log('route is running')
})