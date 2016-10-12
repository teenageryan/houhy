$('#get').click(function () {
     var xhr = new XMLHttpRequest()
    //当请求的状态readyState发生变化的时候，触发onreadysatechange事件
    xhr.onreadystatechange = function(){
        switch (xhr.readyState){
            case 0:
                console.log('xhr对象已创建，open方法未调用')
                break;
            case 1:
                console.log('open方法已调用')
                break;
            case 2:
                console.log('请求已接收，等待处理')
                break;
            case 3:
                console.log('请求处理中')
                break;
            case 4:
                console.log('求情已处理，响应已就绪')
                //获取服务器返回响应信息
                console.log( xhr.responseText )
                //获取所有返回头信息。
                console.log(xhr.getAllResponseHeaders())
                console.log('数据类型：' + xhr.getResponseHeader('Content-Type'))
                break;
            default :
                break;
        }
    }
    xhr.open('GET', '/login')
    xhr.send()

})