/**
 * Created by Administrator on 2016/9/19.
 */
$(function(){
    $('form').submit(function(ev){
        ev.preventDefault()
        var data = $('form').serialize()
        $.post('/user/login',data,function(res){
            console.log(res)
            $('.modal-body').text(res.message)
            $('.modal').modal('show').on('hidden.bs.modal',function(){
                console.log('999')
                if(res.code == 'success'){
                    location.href = '/'
                }
            })

        })
    })
    $('.navbar-header span').hover(function(){
        $(this).css('cursor','pointer')
        $('.navbar-header span').click(function(){
            location.href = '/'
        })
    })

})
