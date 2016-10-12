//引入模块
var mongoose = require('mongoose')
//链接到本地数据库
mongoose.connect('mongodb://localhost/students')
//找到要连接的数据库
var db = mongoose.connection
//设置事件 -- 错误正确
db.on('error',function(){
    console.log('数据库连接失败')
})
db.once('open',function(){
    console.log('数据库链接成功')
    save()
})

//数据库的各种操作   增删改查
//数据库 -- 集合 -- 文档
function save(){
    var stuSchema = mongoose.Schema({
        name:String,
        age:Number,
        isMale:Boolean,
        birth:Date,
        email:String
    })
    //console.log(stuSchema)
    //创建一个模型（类似生成一个集合，该集合的数据类型遵循stuSchema）
    var student = mongoose.model('students',stuSchema)
    //console.log(student)
    //由模型创建实例化对象（类似生成一个文档）
    var stu1 = new student({
        name:'refcy',
        age:44,
        isMale:false,
        email:'723@qq.com',
        birth:new Date(2000,08,54)

    })
    //保存数据
    stu1.save(function(err,data){
        if(!err){
            console.log('保存成功')
        }
        else{
            console.log('保存失败')
        }
    })

}
