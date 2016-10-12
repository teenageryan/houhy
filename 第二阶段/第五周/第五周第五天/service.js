var express = require('express')
var app = express()
app.use(express.static('wwwroot'))
app.get('/login',function(req,res){
    var name = req.query.name
    var pwd = req.query.pwd
    if( name == 'l' && pwd == '1234'){
        res.status(200).send(name + ','+ pwd)

    }
})
app.listen(3000, function () {
    console.log('djdjjdjdj')
})