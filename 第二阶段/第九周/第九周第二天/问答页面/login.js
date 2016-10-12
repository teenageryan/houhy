var express = require('express'),
bodyParser = require('art-template'),
    fs = require('fs'),
template = require('art-template')
var router = express.Router()

router.post('/user/login',function(req,res){

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



                    }
                    else{
                        send('fail','密码有误')
                    }
                }
            })

        }
    })
})
router.get('/login.html',function(req,res){
    res.render('login',{title:'登录页面',name:'login'})
})
module.exports = router