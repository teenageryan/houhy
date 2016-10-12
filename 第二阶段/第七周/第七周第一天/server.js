//引入所需模块
var express = require('express'),
    multer  = require('multer'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    cookieParser = require('cookie-parser')

//存储上传文件
var storage = multer.diskStorage({
    //设置存储文件路径
    destination:'uploads',
    //文件名称
    filename:function(req,file,cb){
        var uname = req.cookies.uname
        cb(null, uname + '.jpg')
    }
})
var uploads = multer({storage: storage})

//实例化对象
var app = express()
var form = multer()
//设置中间件
 app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:false}))
app.use( cookieParser() )

//注册页面（与注册页面url一样）
app.post('/user/zhuce',function(req,res){
    //在req.body中添加Ip和注册日期
    console.log( req.body )
    req.body.ip = req.ip;
    req.body.date = new Date();
    //保存注册信息到某个文件夹，用户名作为文件名存在，先判断文件夹是否存在，如果存在保存文件；如果不存在创建文件夹
    //方便判断，只有注册成功时才能跳转到登录页面
    function send(code,message){
        res.status(200).json({code,message})
    }
    var fileN = 'user/' + req.body.uname + '.txt'
    function saveFile(){
        fs.exists(fileN,function(ex){
            if(ex){
                //res.send('用户已注册')
                send('register','用户已注册')
            }
            else{
                fs.appendFile(fileN,JSON.stringify(req.body),function(err){
                    if(err){
                        //res.send('系统错误')
                        send('file error','系统错误')
                    }
                    else{
                        //res.send('恭喜，注册成功，请登录')
                        send('success','恭喜，注册成功，请登录')
                    }
                })
            }
        })
    }
    fs.exists('user', function (ex) {
        if(!ex){
            fs.mkdirSync('user')
            saveFile()
        }
        else{
            saveFile()
        }
    })
})

//登录页面（与登录页面url一样）
app.post('/user/login',function(req,res){
    function send(code,message){
        res.status(200).json({code,message})
    }
    //验证当前用户是否存在，如果不存在，提示未注册；如果存在，密码错误
    var fileN = 'user/' + req.body.uname + '.txt'
    console.log(fileN)
    fs.exists(fileN,function(ex){
        if(!ex){
            send('none','该用户未注册')
        }
        else{
            fs.readFile(fileN,function(err,data){
                if(err){
                    send('file error','系统有错')
                }
                else{
                    var user = JSON.parse(data)
                    if(user.pwd == req.body.pwd){
                        res.cookie( 'uname', req.body.uname )
                        send('success','登录成功')
                    }
                    else{
                        send('fail','密码错误')
                    }
                }
            })
        }
    })
})
//退出请求处理 -- 清除cookie
app.get('/user/signout',function(req,res){
    res.clearCookie('uname')
    res.status(200).json({'code':'success'})
})
//文件上传请求
app.post('/user/photo',uploads.single('photo'),function(req,res){
res.send('上传成功')

})



app.listen(4000,function(){
    console.log('zhuce is running')
})