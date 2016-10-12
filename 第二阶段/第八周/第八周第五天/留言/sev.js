/**
 * Created by Administrator on 2016/9/12.
 */
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')

var form = multer()
var app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
app.post('/login',form.array(),function(req,res){
    //res.send('请求成功')
    fs.exists('data',function(exists){
        if(!exists){
            fs.mkdirSync('data')
        }
        var info = req.body

        var infs = {
            body:info,
            data:new Date()
        }
        var inf = JSON.stringify(infs)
        fs.appendFile('data/info.text',inf + ',',function(error){
            if(error){
                console.log('You')
            }
            else{
                console.log('wu')
                res.send('读取成功')
            }
        })
    })
})
app.get('/login', function (req,res) {
    fs.exists('data', function (exists) {
        if(exists){
            fs.readFile('data/info.text',function(err,o){
                if(o){
                    res.send(o)
                }
                else{
                    res.send('获取数据失败')
                }
            })
        }
    })
})
app.listen(3000,function(){
    console.log('chenggong')
})