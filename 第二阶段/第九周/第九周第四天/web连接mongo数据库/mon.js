/**
 * Created by Administrator on 2016/10/11.
 */
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
db.on('error',function(){
    console.log('数据库连接失败')
})
db.once('open',function(){
    console.log('数据库连接成功')

var teacSchema = mongoose.Schema({
    name:String,
    age:Number
})
var tea = mongoose.model('teachs',teacSchema)
var tea1 = new tea({
    name:'张三',
    age:10
})
tea1.save(function(err,data){
    if(!err){
        console.log('成功')
    }
    else{
        console.log('失败')
    }
})
})