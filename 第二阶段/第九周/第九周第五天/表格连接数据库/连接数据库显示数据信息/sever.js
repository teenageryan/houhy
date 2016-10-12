var express = require('express'),
    app = express()
app.use(express.static('www'))
app.use(require('./routers/insert'))

app.listen(3000,function(){
    console.log('数据库已yunxing')
})
