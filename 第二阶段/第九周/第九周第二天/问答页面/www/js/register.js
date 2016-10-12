/**
 * Created by Administrator on 2016/9/19.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    var data = $('form').serialize()
    var pass = $(':password').map(function(){
       return $(this).val()
        //console.log($(this))
    })
    if(pass[0] == pass[1]){
        console.log('密码一致，可以提交')
        $.post('/user/reg',data,function(res){
            console.log(res)
            $('.modal-body').text(res.message)
            $('.modal').modal('show').on('hidden.bs.modal',function(){
                if(res.code == 'success'){
                    location.href = '/'
                }
            })
        })
    }
   else{
        $('.modal-body').text('两次密码不同，请重新输入')
        $('.modal').modal('show')
    }
})
$('.navbar-header span').hover(function(){
    $(this).css('cursor','pointer')
    $(this).click(function(){
        location.href = '/'
    })
})
