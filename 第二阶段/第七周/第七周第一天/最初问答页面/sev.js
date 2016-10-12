/**
 * Created by Administrator on 2016/9/21.
 */
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

//注册
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

//登录
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
    res.status(200).json({'code':'success','message':'您已经退出了'})
})

//上传
app.post('/user/up',uploads.single('photo'),function(req,res){
    res.send('上传成功')
    console.log(req.body)
})

//提问问题
app.post('/user/ask',function(req,res){
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

//获取提问  首页获取的内容信息
app.get('/user',function(req,res){
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


//回答页面 保存回答问题
app.post('/answer',function(req,res){
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


app.listen(3000,function(){
    console.log('register is running ')
})
