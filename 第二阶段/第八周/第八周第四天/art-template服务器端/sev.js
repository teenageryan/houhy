var express = require('express'),
    template = require('art-template'),
    fs = require('fs')
//禁止缓存：本地测试使用的时候可以设置；要上线的话，得删除
template.config('cache',false)
var app = express()
//app.engine(para1,para2) --- 设置arttemplate为视图引擎
//设置模板数据--设置固定的代码写法，在进行模板解析(template_ _express)
app.engine('.html',template.__express)
//设置视图引擎
app.set('view engine','html')
app.get('/',function(req,res){
    //路径当前文件夹(./)
    fs.readFile('./book.json',function(err,data){
        if(err){
            res.json({error:'读文件失败'})
        }else{
            var datas = JSON.parse(data)
            var books = datas.books//books数组名
            //res.render(渲染当前页面)
            //index：为当前要渲染的页面名称
            //boo:渲染页面所需数据（与index中数组名一致）
            res.render('index',{boo:books})//第一个boo是数组名
        }
    })
})
app.listen(3000,function(){
    console.log('art-template is running')
})