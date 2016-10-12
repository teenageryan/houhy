var express = require('express'),
fs = require('fs'),
bodyParser = require('body-parser'),
    template = require('art-template')
var router = express.Router()
router.post('/answer',function(req,res){
    //回答的内容保存在哪 -- 问题的文件内，如何与回答的那个问题练习起来
    //获取文件名称 -- 通过浏览器端设定的cookie
    //console.log(res)
    var aname = req.cookies.uname
    var fileN = 'datas/' + req.cookies.question + '.txt'
    req.body.ip = req.ip
    req.body.time = new Date()
    req.body.pname = aname
    //fs.appendFile(fileN,',' + JSON.stringify(req.body),function(err){
    //    if(err){
    //        res.send('保存失败')
    //    }
    //    else{
    //        res.send('保存成功')
    //    }
    //})
    function send(code,message){
        res.status(200).json({code,message})
    }
    fs.readFile(fileN,function(err,data){
        if(err){
            send('none','保存失败')
        }
        else{
            var datas = JSON.parse(data)
            console.log(datas)
            if(!datas.answers){
                datas.answers = []
            }
            datas.answers.push(req.body)
            fs.writeFile(fileN,JSON.stringify(datas),function(err){
                if(err){
                    send('fail','保存数据失败')
                }
                else{
                    console.log('保存数据成功')
                    send('success','保存数据成功')
                }
            })
        }
    })

})
router.get('/answer.html',function(req,res){
    res.render('answer',{title:'回答页面',name:'answer'})
})
module.exports = router