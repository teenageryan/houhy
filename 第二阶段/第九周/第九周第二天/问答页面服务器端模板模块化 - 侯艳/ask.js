var express = require('express'),
fs = require('fs'),
bodyParser = require('body-parser'),
    template = require('art-template')
var router = express.Router()
router.post('/user/ask',function(req,res){
    var pname = req.cookies.uname
    console.log(req.body)
    //把当前提问的内容保存到某个文件中，文件名以当前事件取名，便于查询及后期的回答
    //设置时间 + IP
    var time = new Date()
    req.body.pname = pname
    req.body.ip = req.ip
    req.body.time = time
    //console.log(time.getTime())
    //封装返回信息的方法
    function send(code,message){
        res.status(200).json({code,message})
    }
    //封装要用多次的方法，保存文件的方法
    function saveFile(){
        //设置文件名 -- 以当前时间命名
        var fileN = 'datas/' + time.getTime() + '.txt'
        fs.appendFile(fileN,JSON.stringify(req.body),function(err){
            if(err){
                send('error','保存文件失败')
            }
            else{
                send('success','保存文件成功')
            }
        })
    }

    //判断文件夹是否存在
    fs.exists('datas',function(ex){
        if(!ex){
            fs.mkdirSync('datas')
            saveFile()
        }
        else{
            saveFile()
        }
    })

})
router.get('/ask.html',function(req,res){
    res.render('ask',{title:'提问页面',name:'ask'})
})
module.exports = router