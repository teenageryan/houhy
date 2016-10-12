/**
 * Created by Administrator on 2016/10/10.
 */
//nodejs环境中，一个js文件称之为模块，多个js文件放置在文件夹称之为模块包
//当前模块A如果想调动另一个模块B，需要引入模块（关键字require）
//构造函数主要用来创建对象
//    A导入（require）模块B
//B通过module.exports导出模块A所需要的东西

//function show(name){
//    return console.log(name)
//}
//show('hy')
//module.exports = show

var show  = function(name,age){
    this.name = name
    this.age = age
    this.run = function(){
        console.log( name + '已经' + age + '岁了，会跑了')
    }
}
module.exports = show
//var set = new show('hy',20)
//set.run()