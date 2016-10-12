/**
 * Created by Administrator on 2016/10/8.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    //判断两次密码是否一致
    //选中type名称为password的所有标签
    var pass = $(':password').map(function(){
        return $(this).val()
    })
    if(pass[0]==pass[1]){
        console.log('两次密码一致可以提交')
        location.href = 'login.html'
        var datas = $(this).serialize()
        $.post('/user/reg',datas,function(res){
            console.log(res)
        })
    }
    else{
        alert('两次密码不一致')
    }
})