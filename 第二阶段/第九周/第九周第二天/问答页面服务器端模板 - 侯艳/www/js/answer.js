/**
 * Created by Administrator on 2016/9/20.
 */
$('form').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serialize()
    console.log(data)
    $.post('/answer',data,function(res){
        console.log(res)
        //模态框显示
        $('.modal-body').text(res.message)
        $('.modal').modal('show').on('hidden.bs.modal',function(){
            if(res.code == 'success'){
                location.href = '/'
            }
        })
        //location.href = '/'
    })
})

var uname = $.cookie('uname')
console.log( $.cookie() )
if(uname){
    $('<strong>' + uname + '</strong>').appendTo('#log')
}