/**
 * Created by Administrator on 2016/10/10.
 */
    //   ./mod或../mod，相对路径的文件模块。
//    /pathtomodule/mod，绝对路径的文件模块。
var result = require('./app')
var set = new result('hy',20)
console.log(set)
set.run()
//set.sing = function(){
//    console.log('会唱歌')
//}
//set.sing()
//console.log(set)
//console.log(result)
result.prototype.sing = function(){
    console.log('会唱歌')
}
var set2 = new result('hh',3)
console.log(set2)
set2.sing()
module.exports = result
