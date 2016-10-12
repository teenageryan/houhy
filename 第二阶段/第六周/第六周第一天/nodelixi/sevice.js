/**
 * Created by Administrator on 2016/9/11.
 */
var express = require('express')
//express自身不支持POST请求，所以需要导入body-parser模块
var bodyParser = require('body-parser')
//处理formdata数据的请求要引入multer模块
var multer = require('multer')
//fs --file system 负责存储和管理文件信息，具有创建、添加、删除等作用
var fs = require('fs')
//要用到multer的对象和方法所以要实例化
var form = multer()
var app = express()
app.use(express.static('wwwroot'))
//解析body的编码，extended:false 表示开启高级编码功能
//body对象将包含键值,该值可以是一个字符串或者数组(当扩展是假的),或者任何类型(当扩展是正确的，已废弃)。
app.use(bodyParser.urlencoded({extended:false}))
app.post('/login',form.array(), function (req,res) {
    console.log(req.body)      //终端显示的信息
    //res.send('数据已接收')
    //判断data文件夹是否存在，如果不存在，就创建该文件夹
    fs.exists('data',function(exists){
        if(!exists){
            fs.mkdirSync('data')    //sync同步
        }
        var infos = req.body

        //把js对象转化成json数据，在新创建的文件夹的txt文件中能够显示具体提交数据信息，否则只显示[object,object]
        inf = JSON.stringify(infos)
        console.log(inf)
        //添加文件并保存文件信息
        fs.appendFile('data/info.text',inf + ',',function(error){
            if(error){
                console.log('错了')
                res.send('错误')
            }
            else{
                console.log('chuang')
                //res.send('创建成功')
                var contText = fs.readFileSync('data/info.text','utf-8')
                res.send(contText)
            }
        })

    })
})
app.listen(3000,function(){
    console.log('输出')
})