/**
 * Created by Administrator on 2016/9/13.
 */
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
var app = express()
var form = multer()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
app.post('/login',form.array(), function (req,res) {
    res.send()
    fs.exists('data',function(exists) {
        if(!exists){
            fs.mkdirSync('data')
            var inf = req.body
            console.log(inf)
            var infs = {
                body:inf,
                date:new Date()
            }
            console.log(infs)
            var info = JSON.stringify(infs)
            console.log(info)
            fileN = 'data/' + req.body.name + '.text'
            console.log(fileN)
            fs.appendFile(fileN,info,function(error){
                //console.log('dddd')
                if(error){

                    console.log('存储失败')
                }
                else{
                    console.log('存储成功')
                }
            })
        }
        else{
            var inf = req.body
            console.log(inf)
            var infs = {
                body:inf,
                date:new Date()
            }
            console.log(infs)
            var info = JSON.stringify(infs)
            //console.log(info)
            fileN = 'data/' + req.body.name + '.text'
            fs.appendFile(fileN,info,function(error){
                console.log(fileN)
                if(error){
                    console.log('存储失败')
                }
                else{
                    console.log('ieieiei')
                    console.log('存储成功')
                }
            })
        }
    })

})

app.get('/login',function(req,res){
    fileN = 'data/' + req.query.name + '.text'
    fs.exists('data',function(exists){
        if(exists){

            fs.readFile(fileN,function(err,data){
                if(data){
                    res.send(data)
                }
                else{
                    res.send('获取失败')
                }
            })

        }
    })
})
app.listen(3000,function(){
    console.log('请求成功')
})
