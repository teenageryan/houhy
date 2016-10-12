var express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router()
var app = express()
var stud = require('./mongo')
app.use(bodyParser.urlencoded({extended:false}))
router.post('/insert',function(req,res){
//数据添加功能
    var stud1 = new stud(req.body)
    console.log(stud1)
    stud1.save(function(err,data){
        if(!err){
            console.log('保存成功')
        }
        else{
            console.log('保存失败')
        }
    })
})
module.exports = router