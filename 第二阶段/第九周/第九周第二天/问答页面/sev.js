/**
 * Created by Administrator on 2016/9/21.
 */
/**
 * Created by Administrator on 2016/9/19.
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    template = require('art-template'),
    bodyParser = require('body-parser')

var app = express()
//var form = multer()

app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:false}))
app.use( cookieParser() )
app.engine('.html',template.__express)
//设置视图引擎，使用html渲染页面
app.set('view engine','html')
template.config('cache',false)

app.use(require('./index'))
app.use(require('./user'))
app.use(require('./ask'))
app.use(require('./answer'))
app.use(require('./login'))
app.use(require('./register'))
//注册

//登录

//清除cookie
app.get('/user/ask',function(req,res){
    res.clearCookie('uname')
    res.status(200).json({'code':'success','message':'您已经退出了'})
})

//上传

//提问问题

//获取提问  首页获取的内容信息

//回答页面 保存回答问题

//首页处理

//处理answer页面

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
