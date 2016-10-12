/**
 * Created by Administrator on 2016/9/19.
 */
var express = require('express'),
    bodyPrser = require('body-parser'),
    multer = require('multer'),
    fs = require('fs'),
    cookieParser = require('cookie-parser')

var storage = multer.diskStorage({
    destination:'uploads',
    filename:function(req,file,cb){
    var uname = req.cookies.uname
        console.log(req.cookies)
        cb(null,uname + '.jpg')
    }
})
var uploads = multer({storage:storage})

var app = express()
var form = multer()

app.use(express.static('www'))
app.use(bodyPrser.urlencoded({extended:false}))
app.use( cookieParser() )

app.post('/user/reg',function(req,res){
    req.body.ip = req.ip
    req.body.date = new Date()
    console.log(req.body)
    function send(code,message){
        res.status(200).json({code,message})
    }
    var fileN = 'user/' + req.body.uname + '.txt'
    //console.log(fileN)
    var info = JSON.stringify(req.body)
    function saveFile(){
        fs.exists(fileN,function(ex){
            if(ex){
                send('register','用户已注册')
            }
            else{
                fs.appendFile(fileN,info,function(err){
                    if(err){
                        send('file error','系统有错')
                    }
                    else{
                        send('success','注册成功')
                    }
                })
            }
        })

    }
    fs.exists('user',function(ex){
        if(!ex){
            fs.mkdirSync('user')
            saveFile()
        }
        else{
            saveFile()
        }

    })
})
app.post('/user/login',function(req,res){

    function send(code,message){
        res.status(200).json({code,message})
    }
    var fileN = 'user/' + req.body.uname +'.txt'
    fs.exists(fileN,function(ex){
        if(!ex){
            send('none','用户未注册')
        }
        else{
            fs.readFile(fileN,function(err,data){
                if(err){
                    send('file err','系统有错')
                }
                else{
                    var inf = JSON.parse(data)
                    if( inf.pwd == req.body.pwd){
                        res.cookie('uname',req.body.uname)
                        send('success','登录成功')

                        //模态框显示
                        //$('.modal-body').text(res.message)
                        //$('.modal').modal('show').on('hidden.bs.modal',function(){
                        //    if(res.code == 'success'){
                        //        location.href = '/'
                        //    }
                        //})

                    }
                    else{
                        send('fail','密码有误')
                    }
                }
            })

        }
    })
})
//清除cookie
app.get('/user/ask',function(req,res){
    res.clearCookie('uname')
    res.status(200).json({'code':'success'})
})

app.post('/user/up',uploads.single('photo'),function(req,res){
    res.send('上传成功')
    console.log(req.body)
})

app.post('/user/ask',function(req,res){
    fs.exists('data',function(exist){
        if(!exist){
            fs.mkdirSync('data')
        }
        var info = req.body

        var infs = {
            body:info,
            data:new Date()
        }
        var inf = JSON.stringify(infs)
        fs.appendFile('data/info.text',inf + ',',function(err){
            if(err){
                res.send('读取失败')
            }
            else{
                res.send('读取成功')
            }
        })
    })
})

app.get('/user',function(req,res){
    fs.exists('data/info.text',function(ex){
        if(ex){
            fs.readFile('data/info.text',function(err,data){
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
    console.log('register is running ')
})
