/**
 * Created by Administrator on 2016/9/12.
 */
    //引入所需模块
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')

//用到模块的方法和对象的，需要实例化
var app = express()
var form = multer()

//use方法用来引用中间件
app.use(express.static('wwwroot'))
//express模块不能解析POST请求数据，需要运用bodyParser模块
app.use(bodyParser.urlencoded({extended:false}))
//设置请求的处理及响应
app.post('/login',form.array(),function(req,res){
    //res.send('成功了')
    //判断data文件夹是否存在
    //fs.exists(文件夹名，查看文件是否存在的函数（true/false）)
    fs.exists('data',function(exists){
        if(!exists){
            //不存在的话创建data文件夹
            fs.mkdirSync('data')
        }
        var infos = req.body
        var inf = {
            ifm:infos,
            date:new Date()
        }
        //把infos对象解析为json数据
        var infs = JSON.stringify(inf)
        //else{
        console.log(infs)
        //fs.appendFile(文件路径，文件内容，文件是否已经保存)
            fs.appendFile('data/infos.text',infs + ',', function (error) {
                if(error){
                    console.log('有错误')
                }
                else{
                    console.log('成功保存')
                    //var conT = fs.readFileSync('data/infos.text')
                    //res.send(conT)
                }
            })
        //}
    })
})
//处理get请求及响应
app.get('/login',function(req,res){
    //读取文件前提 -- 读取文件是否存在
    fs.exists('data',function(exists){
        if(exists){
            //读取文件夹中某个文件的内容
            fs.readFile('data/infos.text',function(err,data){
                if(data){
                    res.send(data)
                }
                else{
                    res.send('获取数据失败')
                }
            })
        }

    })
})
app.listen(3000,function(){
    console.log('创建成功')
})