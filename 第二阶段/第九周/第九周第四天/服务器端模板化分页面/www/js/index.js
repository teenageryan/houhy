/**
 * Created by Administrator on 2016/10/8.
 */
console.log( $.cookie() )
console.log( $.cookie('uname') )
var uname = $.cookie('uname')
if( uname ){
    $('header').empty()
    $('header').html(
        '<strong>' + uname + '</strong> </br>' + '<a> 退出 </a>'
    )
    $('a').click(function(){
        //console.log('ii')
        //没有数据传输，第二个参数位置写null
        $.get('/signout',null,function(){
            location.href = '/'
        })
    })
    $('#liu').click(function(){
        location.href = 'liu.html'
    })
}
else{
    $('#liu').click(function(){
        location.href = 'login.html'
    })
}
$.get('/message',null,function(res){
    console.log(res)
    console.log(typeof (res))
    var arr = '[' + res.substr(0,res.length -1) + ']'
    console.log(arr)
    console.log(typeof (arr))
    var arrs = JSON.parse(arr)
    console.log(arrs)
    console.log(typeof (arrs))
    var message = {
        title:'留言板信息',
        datas:arrs
    }
    //var html = template('template',message)
    //$('article').html(html)
})

