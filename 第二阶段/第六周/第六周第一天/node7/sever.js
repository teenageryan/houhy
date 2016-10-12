var express = require('express')
var bodyParser = require('body-parser')
//处理formdata数据的请求要引入的模块
var multer = require('multer')
//fs -- file system 负责存储和管理文件信息，具有创建、添加、删除文件等作用

var fs = require('fs')
var form = multer()
var app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
app.post('/login',form.array(),function(req,res){
    console.log( req.body )
    //res.send('数据接收成功')
    //判断是否存在data文件夹，如果不存在，就创建该文件夹
    fs.exists('data',function(exists){
        if(!exists){
            console.log('文件不存在，需要创建文件')
            fs.mkdirSync('data')
        }
        var infos = req.body
        //console.log(infos)

        var mess = {
            name:infos,
            date:new Date(),
            ip:req.ip
        }
//把js对象转化成json数据，在文件中能够显示数据信息，否则只显示[object,object]
        var str = JSON.stringify(infos)
        console.log( str )

        //console.log(mess)
    //添加文件，并保存文件信息
        fs.appendFile('data/info.txt', str + ',' , function (error) {
    if(error){
        console.log('数据保存失败')
        res.send('数据保存失败')
    }
            else{
        console.log('数据保存成功')
        res.send('数据保存成功')
    }
        })
    })

})
app.listen(3000,function(){
    console.log('成功')
})
