/**
 * Created by Administrator on 2016/10/11.
 */
//引入模块
var mongoose = require('mongoose')
//建立与本地数据库的连接
//mongodb: ---协议
//localhost --本地IP
//test ---连接数据库名
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
//绑定error事件
db.on('error',function(){
    console.log('数据库连接失败')
})
db.once('open',function(){
    console.log('数据库连接成功，打开数据库')

//Schema,model,实例
//    Schema -- 模式：设置相关数据的类型，以及该数据库中集合的结构
var teacSchema = mongoose.Schema({
    name:String,
    age:Number,
    isMale:Boolean,
    birth:Date
})

    //para1:---集合名称
    //para2:---该集合数据类型遵循teacSchema
var Teacher = mongoose.model('teachers',teacSchema)
//    var Teacher = mongoose.model('tas',mongoose.Schema()) 数据保存不成功，集合设置中为空
    //定义具体实例 -- 数据
var tea1 = new Teacher({
    name:'lucy',
    age:15,
    isMale:false,  //o返回值为false，其他值包括字符串返回值都为true
    birth:new Date(1910,10,23)

})
    //保存数据
    //para1 -- 错误处理
    //para2 -- 参数，随意写
tea1.save(function(err,data){
    if(!err){
        console.log('数据保存成功')
    }
    else{
        console.log('数据保存失败')
    }
})
})