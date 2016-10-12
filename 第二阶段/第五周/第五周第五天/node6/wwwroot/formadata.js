/**
 * Created by Administrator on 2016/9/11.
 */
function formadata(){
    //创建xhr对象
    var xhr = new XMLHttpRequest()
    //当请求状态发生改变的时候触发onreadystatechange事件
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            //返回响应信息
            console.log( xhr.responseText )
        }
    }
    //创建一个formdata对象
    var data = new FormData()
    //添加表单数据信息
    data.append('username','lu')
    data.append('age','10')
    //open()设置当前请求数据的类型以及url
    xhr.open('post','/login')
    //send()发送的请求信息
    xhr.send(data)
}