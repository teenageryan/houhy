/**
 * Created by Administrator on 2016/9/20.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serialize()
    console.log(data)
    $.post('/user/ask',data,function(res){
        console.log(res)
        $('.modal-body').text(res.message)
        $('.modal').modal('show').on('hidden.bs.modal',function(){
            if(res.code == 'success'){
                location.href = '/'
            }
        })
    })
})

var uname = $.cookie('uname')
//console.log( $.cookie('uname') )
if(uname){
    $('<strong>' + uname + '</strong>').appendTo('#log')
}
