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
    //save()
})

//数据库的各种操作   增删改查
//数据库 -- 集合 -- 文档
function save(){
    var student = data()
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

function data(){
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
    return student
}

//查找
function find(){
    //查找数据（文档）--- 集合中的文档
    var student = data()

    //无条件查询 -- 方法一
    //student.find(function(err,data){
    //    console.log(data)
    //})

    //find() -- 查找方法
    //exec() [execute] -- 执行方法

    //无条件查询 -- 方法二
    //student.find().exec(function(err,data){
    //    console.log(data)
    //    console.log(typeof data)
    //})

    ////条件查找 --查找符合条件的数据
    //student.find({age:17},function(err,data){
    //    console.log(data)
    //    console.log(typeof data[0]._id)
    //})

//查找条件：age大于等于15小于等于17的数据
//    student.find({age:{$lte:17,$gte:13}},function(err,data){
//        console.log(data)
//    })

    //显示部分数据,先按照条件查找，再选择可显示的数据
    //student.find({age:{$lte:18,$gte:13}}).select('name age').exec(function(err,data){
    //    console.log(data)
    //})

//显示一条数据
//    student.findOne({age:{$lte:18,$gte:13}}).exec(function(err,data){
//        console.log(data)
//    })

//显示数据数量
//    student.find().count(function(err,data){
//        console.log(data)
//    })

    //根据id值查找数据
    //student.findById('57fd9aa18b97e205149af669').exec(function(err,data){
    //    console.log(data)
    //})

//升序/降序排序以属性名的正负值决定，正值升序，负值降序
    student.find().sort('-age').exec(function(err,data){
        console.log(data)
    })
}

//find()
function update(){
    var student = data()
    //student.update({age:17},{age:23,isMale:false},function(err,data){
    //    console.log(data)
    //})

//根据id值找到指定值，并更新
//    student.findByIdAndUpdate('57fd9a7d587dfa08dc7f613b',{age:24},function(err,data){
//        console.log(data)
//    })

    //更新所有符合条件的数据
    //student.update({isMale:false},{isMale:true},{multi:true},function(err,data){
    //    console.log(data)
    //})


//删除数据
    student.remove({age:22},function(err){
        console.log('删除成功')
    })
}
update()
