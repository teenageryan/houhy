/**
 * Created by Administrator on 2016/9/12.
 */
$('form').submit(function (ev) {
    ev.preventDefault()
    //serialize()把表单数据转化成字符串
    var data = $('form').serialize()
    //$.post(请求路径，待发送的数据键值对，回调函数请求成功时并且服务器有响应数据时执行的代码)
    //res.send('读取成功')不写不执行函数，但数据能读取成功
    $.post('/login',data,function(res){
        console.log( res )
        $('div').each(function(){
            $(this).css('display','block')
        })
        $('#content p').eq(1).click(function () {
            location.href = '/'
        })

    })

})





