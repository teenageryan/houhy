/**
 * Created by Administrator on 2016/10/8.
 */
//node js 是运行在服务器端的js
//express.static 是 Express 内置的唯一一个中间件.负责托管 Express 应用内的静态资源。
//multer()用来上传文件的模块

    //引入外部模块
var express = require('express'),
    //解析POST请求
    bodyparser = require('body-parser'),
    //登录注册时可以记住当前登录用户
    cookieparser = require('cookie-parser'),
    //对文件进行管理
    fs = require('fs')
//实例化模块
var app = express()
//设置中间件
app.use( express.static('www') )
//extended为false时只支持数组和字符串类型，为true时支持所有类型
app.use( bodyparser.urlencoded( {extended:false} ) )
app.use( cookieparser() )


//处理注册页面
app.post('/user/reg',function(req,res){


    function send(code,message){
        res.status(200).json({code,message})
    }
    function saveF(){
        var fileName = 'user/' + req.body.uname + '.txt'
        fs.exists(fileName,function(ex){
            if(ex){
                send('registered','该用户已注册')
            }
            else{
                fs.appendFile(fileName,JSON.stringify( req.body ),function(err){
                    if(err){
                        send('file err','文件系统错误')
                    }
                    else{
                        send('success','注册成功，请登录……')
                    }
                })
            }
        })
    }

    console.log( req.body ) //输出请求内容
    req.body.ip = req.ip
    req.body.date = new Date()
    //判断存储用户名信息的文件夹是否存在
    fs.exists('user',function(ex){
        if(!ex){
            fs.mkdirSync('user')
            //保存用户信息
            saveF()
        }
        else{
            //直接保存用户信息
            saveF()
        }
    })
})


//处理登录页面
app.post('/user/login',function(req,res){
    console.log( req.body )

    function send(code,message){
        res.status(200).json({code,message})
    }
    //判断用户名是否存在
    var fileName = 'user/' + req.body.uname + '.txt'
    fs.exists(fileName,function(ex){
        if(!ex){
            send('error','用户名不存在')
        }
        else{
            //判断用户密码是否正确 -- 读当前密码
            fs.readFile(fileName,function(err,data){
                if(err){
                    send('file error','文件系统错误')
                }
                else{
                    var datas = JSON.parse(data)
                    var password = datas.pwd
                    if( password == req.body.pwd ){
                        res.cookie('uname',req.body.uname)
                        send('success','用户登录成功')
                    }
                    else{
                        send('pwd error','用户名或密码错误')
                    }
                }
            })
        }
    })
})

//清除cookie，退出用户登录
app.get('/signout',function(req,res){
    res.clearCookie('uname')
    res.status(200).send('success')
})


//留言页面，保存留言信息
app.post('/message',function(req,res){
    console.log(req.body) //输出请求体
    req.body.username = req.cookies.uname
    req.body.time = new Date()
    req.body.ip = req.ip
    fs.exists('message',function(ex){
        if(!ex){
            fs.mkdirSync('message')
            fs.appendFile('message/text.txt',JSON.stringify( req.body ) + ',' ,function(err){
                if(err){
                    res.status(200).json({code:'error',message:'数据保存失败'})
                }
                else{
                    res.status(200).json({code:'success',message:'留言提交成功'})
                }
            })
        }
        else{
            fs.appendFile('message/text.txt',JSON.stringify( req.body ) + ',' ,function(err){
                if(err){
                    res.status(200).json({code:'error',message:'数据保存失败'})
                }
                else{
                    res.status(200).json({code:'success',message:'留言提交成功'})
                }
            })
        }
    })
})


//读取留言信息
app.get('/message',function(req,res){
    fs.exists('message/text.txt',function(ex){
        if(!ex){
            res.send('当前没有留言')
        }
        else{
            fs.readFile('message/text.txt',function(err,data){
                if(err){
                    res.send('文件错误')
                }
                else{
                    res.send( data )
                }
            })
        }

    })

})


//监听窗口
app.listen(2000,function(){
    console.log( 'nodejs is running' )
})