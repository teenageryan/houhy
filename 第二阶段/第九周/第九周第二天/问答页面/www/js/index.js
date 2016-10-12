/**
 * Created by Administrator on 2016/9/20.
 */
var uname = $.cookie('uname')
//console.log( $.cookie('uname') )
console.log($.cookie())
if(uname){
    $('#log').empty()
    $('<strong>' + uname + '</strong>').appendTo('#log')
    $('#exit').click(function(){
        $.get('/user/ask',null,function(res){
            console.log(res.code)
            $('.modal-body').text(res.message)
            $('.modal').modal('show').on('hidden.bs.modal',function(){
                if(res.code == 'success'){
                    location.href = '/'
                }
            })
        })

    })
    $('.active').click(function(){
        location.href = 'ask.html'
    })

    $('#user').click(function(){
        location.href = 'user.html'
    })

    //获取提问问题
    $.get('/user', function(res){
        console.log(res)
        $('.click').click(function(){
            //设置某个cookie值，获取到当前点击文件的文件名称
            $.cookie('question',$(this).attr('questions'))
            location.href = 'answer.html'
        })
    })

}
else{
    $('.active,#log').click(function(){
        location.href = 'login.html'
    })

}


