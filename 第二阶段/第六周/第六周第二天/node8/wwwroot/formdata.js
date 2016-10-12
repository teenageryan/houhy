/**
 * Created by Administrator on 2016/9/12.
 */
var form = document.querySelector('form')

var xhr = new XMLHttpRequest()

form.onsubmit = function(ev){
    //当表单提交时阻止它的默认事件发生
    ev.preventDefault()
    //var xhr = new XMLHttpRequest()
    //当请求状态发生改变时要触发的事件
    xhr.onreadystatechange = function(){
        //0：请求未初始化（还没有调用 open()）。
        //1：请求已经建立，但是还没有发送（还没有调用 send()）。
        //2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
        //3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
        //4：响应已完成；您可以获取并使用服务器的响应了。

        if(xhr.readyState == 4){
           console.log( xhr.responseText )
        }
    }
    //设置请求发起的类型和路径
    xhr.open('post','/login')
    //将表单数据form传入FormData对象
    var data = new FormData(form)
    xhr.send(data)
}
//获取提交信息
function result(){

    xhr.onreadystatechange = function(){
        //console.log('444')
        if( xhr.readyState == 4){
            console.log( xhr.responseText )


            //console.log(typeof xhr.responseText)
            var tt = xhr.responseText
            var ress = '[' + tt.substr(0,tt.length - 1) + ']'
console.log(ress)
            //把json数据转化成为js对象
            var mess = JSON.parse( ress )
            console.log(mess)
//document.querySelector('div').innerHTML = '<section>' + mess[1].name
//            把标签内容显示到页面当中
//            if(){
//
//            }
            for(var i = 0 ;i < mess.length;i++){
                //document.querySelector('div').innerHTML += '<section>' + '姓名：' + '<strong>' +  mess[i].name +'</strong>'+ ',' + '年龄：' + '<strong>' + mess[i].age

                document.querySelector('div').innerHTML += '<section> 姓名：<strong>' +  mess[i].ifm.name +'</strong> 年龄：<strong>' + mess[i].ifm.age + '</strong> <p>'+ mess[i].date + '</p> </section>'
            }
        }
    }
    xhr.open('get','/login')
    xhr.send()

}