/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express')
//express.router()
var router = express.Router()
//console.log(router)

router.get('/',function(req,res){
    res.send('通过get请求处理的网站首页')
})
module.exports = router

//模板引擎写法
//app.engine('.html',template.__express)
//app.set('view engine','html')
//template.config('cache',false)