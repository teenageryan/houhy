/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express')
var app = express()

//var index = require('./routes/index')
//路径叠加
//app.use('/web',index)

app.use(require('./routes/index'))
app.use(require('./routes/login'))
app.use(require('./routes/register'))

app.listen(2000,function(){
    console.log('router is running')
})