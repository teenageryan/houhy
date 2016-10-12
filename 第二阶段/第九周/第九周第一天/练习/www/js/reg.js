/**
 * Created by Administrator on 2016/10/8.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    var pw = $(':password').map(function(){
        return $(this).val()
    })
    if( pw[0]==pw[1] ){
        var datas = $(this).serialize()
        console.log('两次密码相同')
        location.href = '/'
        $.post('/user/reg',datas,function(res){
            console.log(res)
        })
    }
else{
        alert('密码不一致')
    }
})