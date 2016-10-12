/**
 * Created by Administrator on 2016/10/8.
 */
console.log( $.cookie('uname') )
var uname = $.cookie('uname')
if(uname){
    $('form').empty()
    $('form').html(
        '<strong>' + uname + '</strong> </br>' + '<a>退出</a>'
    )

    $('a').click(function(){
        $.get('/user/ind',null,function(){
            location.href = '/'
            console.log('ii')
        })
    })
}
