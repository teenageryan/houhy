var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
var app = express()
var form = multer()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
app.post('/login',form.array(),function(req,res){
    res.send('请求成功')
    fs.exists('data',function(exists){
        if(!exists){
            fs.mkdirSnyc('data')
        }
        var inf = req.body
        var infs = {
            body:inf,
            data:new Data()
        }
        var info = JSON.stringify(infs)
        fs.appendFile('data/info.text',info,function(error){
            if(error){
                console.log('存储失败')
            }
            else{
                console.log('Yicun')
                res.send('成功存储')
            }
        })
    })
})
app.listen(3000, function () {
    console.log('chenggong')
})
app.get('/login',function(req,res){
    fs.exists('data', function (exists) {
        if(exists){
            fs.readFile('data/info.text',function(err,data){
                if(data){
                    res.send(data)
                }
                else{
                    console.log('读取信息失败')
                }
            })
        }
    })
})
