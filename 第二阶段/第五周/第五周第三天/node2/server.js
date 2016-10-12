var express = require('express')
var app = express()
app.use(express.static('wwwroot'))
app.get('/user',function(req,res){
    var age = req.query.age
    var xim = req.query.xm
    res.status(200).send(age)
    res.status(200).send(xim)
})
app.listen(3000,function(){
    console.log('running')
})
//var express = require('express')
//var app = express()
//app.use(express.static('wwwroot'))
//app.get('/user', function (req,res) {
//    var age = req.query.age
//    res.status(200).send(age)
//})
//app.listen(3000,function(){
//    console.log('ddd')
//})