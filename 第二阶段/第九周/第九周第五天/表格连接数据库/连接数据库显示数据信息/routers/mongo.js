var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router()
mongoose.connect('mongodb://localhost/Tstudents')
var db = mongoose.connection
db.on('error',function(){
    console.log('数据库连接失败')
})
db.once('open',function() {
    console.log('数据库已连接')
})
var studentS = mongoose.Schema({
    name: String,
    age: Number,
    phone: String
})
var stud = mongoose.model('students', studentS)
module.exports = stud