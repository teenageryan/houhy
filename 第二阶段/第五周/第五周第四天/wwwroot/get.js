/**
 * Created by Administrator on 2016/9/8.
 */
//var btnget = document.querySelector('#get')
////setTimeout( fn, time )
//function gets(){
//    var xmlhttp
//    if(window.XMLHttpRequest ){
//        xmlhttp = new XMLHttpRequest()
//    }
//    else{
//        xmlhttp = new ActiveXObject()
//    }
//    //get请求信息写在url路径上
//    //设置请求信息    用户发起的请求信息，其中包含请求参数值
//    xmlhttp.open('GET','/login?name=lucy&pwd=123456')
//    xmlhttp.send()
//    xmlhttp.onreadystatechange = function(){
//        if( xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
//            console.log('success')
//        }
//    }
//}
//btnget.addListener('click',gets)

$('#get').click(function(){
  //$.get(url,参数，callback（data,status,xhr))
  //  url:发送请求的url地址
  //参数：{name：value} 发送的参数信息，连同url一块发送到服务器
    //http://localhost:3000/url?name=value&name=value
  //callback:请求成功之后要执行的函数，成功时才会调用
       //data：响应成功是返回的数据信息
       //  status：响应的状态信息
  //xhr：XMLHttpRequest 对象
    $.get('/login',
        { name:'lucy',pwd:'123456'},
        function(data,status){
            console.log('请求成功')
            console.log(data)
            console.log(status)
        }
    )
})

$('#post').click(function () {
    $.post('/login',
        {name:'lucy',pwd:'123456'},
        function (data,status) {
            console.log('post请求成功')
            console.log(data)
            console.log(status)
        }
    )
})
