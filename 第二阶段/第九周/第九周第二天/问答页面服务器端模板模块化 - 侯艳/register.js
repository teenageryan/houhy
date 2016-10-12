var express = require('express'),
bodyParser = require('body-parser'),
fs = require('fs'),
template = require('art-template')
var router = express.Router()

router.post('/user/reg',function(req,res){
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
router.get('/register.html',function(req,res){
    res.render('register',{title:'注册页面',name:'register'})
})
module.exports = router