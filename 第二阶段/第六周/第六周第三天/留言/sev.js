/**
 * Created by Administrator on 2016/9/12.
 */
// 引入模块
var express = require('express')
// 处理post请求
var bodyParser = require('body-parser')
// 处理formdata数据，还能上传文件
var multer = require('multer')
// 存储文件
var fs = require('fs')

// 实例化对象
var form = multer()
var app = express()

// 引入中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))

// 接收及处理post请求
// form.array()解析FormData数据，不解析不能输出信息
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

// 监听端口
app.listen(4000,function(){
    console.log('chenggong')
})