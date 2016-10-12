/**
* Created by Administrator on 2016/9/8.
*/
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
//app.get('/login',function(req,res){
//    //var t = req.query.tea
//
//    if(req.query.name == 'nd' && req.query.val == 'di'){
//        res.send('登录成功')
//    }
//    else{
//        console.log('失败')
//    }
//    //var t = req.query.tea
//    //    res.status(200).send(t)
//
//})

app.get('/login', function (req,res) {
    if( req.query.name == 'nd' && req.query.val == 'di'){
        res.send('成功了')
    }
    else{
        console.log('失败')
    }
})
app.listen(3000,function(){
    console.log('hahaha')
})


