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
    cookieParser = require('cookie-parser'),
    template = require('art-template')

var storage = multer.diskStorage({
    destination:'www/uploads',
    filename:function(req,file,cb){
        var uname = req.cookies.uname
        console.log(req.cookies)
        cb(null, uname + '.jpg')
    }
})
var uploads = multer({storage:storage})

var app = express()
var form = multer()

app.use(express.static('www'))
app.use(bodyPrser.urlencoded({extended:false}))
app.use( cookieParser() )
app.engine('.html',template.__express)
//设置视图引擎，使用html渲染页面
app.set('view engine','html')
template.config('cache',false)
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
app.post('/user/photo',uploads.single('photo'),function(req,res){
    res.status(200).json({code:'success',message:'上传成功'})
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

//首页处理
app.get('/',function(req,res){
    fs.exists('datas',function(ex){
        if(!ex){
            res.send('')
        }
        else{
            fs.readdir('datas',function(err,files){
                if(err){
                    res.send('')
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

//处理answer页面
app.get('/answer.html',function(req,res){
    res.render('answer',{title:'回答页面',name:'answer'})
})
app.get('/ask.html',function(req,res){
    res.render('ask',{title:'提问页面',name:'ask'})
})
app.get('/login.html',function(req,res){
    res.render('login',{title:'登录页面',name:'login'})
})
app.get('/register.html',function(req,res){
    res.render('register',{title:'注册页面',name:'register'})
})
app.get('/user.html',function(req,res){
    res.render('user',{title:'用户页面',name:'user'})
})
template.helper('dateFormate',function(data){
    var time = new Date(data)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hour = time.getHours()
    var minute = time.getMinutes()
    var second = time.getSeconds()
    hour = hour < 10?'0' + hour:hour
    minute = minute < 10?'0' + minute:minute
    second = second < 10?'0' + second:second
    var str = year + '/' + month + '/'+ date + ' ' + hour + ':' + minute + ':' + second
    return str
})
template.helper('tims',function(data){
    var dates = new Date(data)
    var str = dates.getTime()
    return str
})
app.listen(3000,function(){
    console.log('register is running ')
})
