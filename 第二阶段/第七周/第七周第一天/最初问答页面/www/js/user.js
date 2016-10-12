/**
 * Created by Administrator on 2016/9/20.
 */
$('.navbar-header span').hover(function(){
    $(this).css('cursor','pointer')
})
$('.navbar-header span').click(function(){
    location.href = '/'
})
$('form').submit(function(ev){
    ev.preventDefault()
    var data = new FormData(this)
    $.post({
        url:'/user/photo',
        data:data,
        contentType:false,  //默认的格式是 application/x-www-form-urlencoded
        processData:false, // 默认发送到服务器的数据，会发生数据转换，防止自动转换数据格式
        success:function(res){
            if(res.code == 'success'){
                location.href = '/'
            }

        }
    })
})