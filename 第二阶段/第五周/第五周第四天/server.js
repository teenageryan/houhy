var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('wwwroot'))
app.post('/login', function (req,res) {
    var sex = req.body.sex
    var name = req.body.name
    res.send('<strong>您提交的信息是 </strong> <br>name:' + sex + '<br>sex:' + name)
    //if(sex == 'lucy'&&name == '123456'){
    //    res.status(200).send('登录成功' + sex + name)
    //    //res.status(200).send(sex)
    //}
    //else{
    //    res.status(200).send('失败了')
    //}
})
app.listen(3000,function(){
    console.log('s')
})