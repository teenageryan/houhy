var express = require('express'),
    bodyparser = require('body-parser'),
    fs = require('fs'),
    cookieparser = require('cookie-parser')

var app = express()
app.use(express.static('www'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieparser())
//注册页面
app.post('/user/reg',function(req,res){

    function send(code,message){
        res.status(200).json({code,message})
    }

    function saveFile(){
        var fileN = 'user/' + req.body.uname + '.txt'
        fs.exists(fileN,function(ex){
            if(ex){
                send('registed','用户已注册')

            }
            else{
                fs.appendFile(fileN,JSON.stringify(req.body),function(err){
                    if(err){
                        send('faile','注册失败')
                    }
                    else{
                        send('success','已成功，请登录')
                    }
                })
            }
        })
    }
    console.log(req.body)
    fs.exists('user',function(ex){
        if(!ex){
            fs.mkdirSync('user')
            //保存用户信息
            saveFile()
        }
        else{
            //直接保存
            saveFile()
        }
    })
})

//登录页面
app.post('/user/login',function(req,res){

    function send(code,message){
        res.status(200).json({code,message})
    }

    var fileN = 'user/' + req.body.uname + '.txt'
fs.exists(fileN,function(ex){
    if(ex){
        fs.readFile(fileN,function(err,data){
            if(err){
                send('fail','文件错误')
            }
            else{
                var datas = JSON.parse(data)
                var pw = req.body.pwd
                if( datas.pwd == pw ){
                    res.cookie('uname',req.body.uname)
                    send('success','登陆成功')
                }
                else{
                    send('error','用户错误')
                }
            }
        })
    }
    else{
        send('eror','用户名不存在')
    }
})
})

//设置清除cookie
app.get('/user/ind',function(req,res){
    res.clearCookie('uname')
    res.status(200).send('success')
})

app.listen(2000,function(){
    console.log('sever is running')
})