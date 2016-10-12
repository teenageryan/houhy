/**
 * Created by Administrator on 2016/10/8.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    var datas = $(this).serialize()
    $.post('/user/login',datas,function(res){
        if(res.code == 'success'){
            location.href = '/'
        }
        else{
            alert(res.message)
        }
    })
})