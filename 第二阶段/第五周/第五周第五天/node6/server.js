var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
//要用到multer的对象和方法所以要实例化
var form = multer()

var app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
app.get('/login', function (req,res) {
    //res.send('ddd')

    res.status(200).send('服务器')
   // console.log( req.query )     //终端显示信息
  
})
app.post('/login',form.array(),function(req,res){
    console.log( req.body )      //终端显示信息
    res.status(200).send('已接收')
})
app.listen(3000,function(){
    console.log('s')
})