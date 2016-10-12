var express = require('express')
var fs = require('fs'),
    template = require('art-template')
var router = express.Router()

router.get('/',function(req,res){
    fs.exists('datas',function(ex){
        if(!ex){
            res.render('template',{
                title:'问答网站首页'
            })
        }
        else{
            fs.readdir('datas',function(err,files){
                if(err){
                    res.send('文件错误')
                }
                else{
                    //console.log(files)
                    var files = files.reverse()
                    var que = []
                    for( var i =0;i <files.length;i++ ){
                        //fs.readFile('datas/' + files[i],function(err,data){
                        //    var data = JSON.parse(data)
                        //    console.log(data)
                        //    que.push(data)
                        //})
                        var filePath = 'datas/' + files[i]
                        //同步读文件  fs.readfileSyne()
                        var data = fs.readFileSync(filePath)
                        data = JSON.parse(data)
                        //console.log(data)
                        que.push(data)
                    }
                    console.log(que)
                    res.render('template',{
                        title:'问答网站首页',
                        datas:que
                    })
                }
            })
        }
    })
})
router.get('/user',function(req,res){
    function send(code,message,questions){
        //code:读取是否成功
        //message:是否成功相对应信息
        //questions:读到的文件内容数据
        res.status(200).json({code,message,questions})
    }

    function reads(i,files,questions,cb){
        var filePath = 'datas/' + files[i]
        if(i < files.length){
            fs.readFile(filePath,function(err,data){
                if(err){
                    send('error','获取数据失败')
                }
                else{
                    questions.push(JSON.parse(data))
                }
                reads(++i,files,questions,cb)
            })
        }
        else{
            cb()
        }
    }

    //判断文件夹是否存在
    fs.exists('datas',function(ex){
        if(!ex){
            send('error','文件系统错误')
        }
        else{
            //读取文件夹内部所有文件内容
            fs.readdir('datas',function(err,files){
                if(err){
                    send('error','文件系统错误')
                }
                else{
                    //var files = files
                    console.log(files)
                    //console.log('iii')
                    var questions = []
                    var files = files
                    reads(0,files,questions,function(){
                        send('success','获取数据成功',questions)
                    })
                }

            })
        }
    })

})
module.exports = router