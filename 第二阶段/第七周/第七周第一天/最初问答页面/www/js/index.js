/**
 * Created by Administrator on 2016/9/20.
 */
var uname = $.cookie('uname')
//console.log( $.cookie('uname') )
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
        $('.cont').css('cursor','pointer')
        var datas = res.questions
        var divs = ''
        //遍历取出所有提问问题
        for(var i=0;i<datas.length;i++){
            var tim = datas[i].time
            var datr = datas[i].answers
                //datas[i]  --- 每个文件的内容
                //文件的名称 ：按时间取名  new Date().getTime()
                var fileN = new Date(tim).getTime()
                divs += "<div class='main' questions='"+ fileN +"'>"
                divs += "<div class='main-left'>"
                divs += "<img src='../uploads/" + datas[i].pname + ".jpg' />"
                divs += "</div>"
                divs += "<div class='main-right'>"
                divs += "<h4>" + datas[i].pname + "</h4>"
                divs += "<p>" + datas[i].text + "</p>"
                divs += "<p>" + datas[i].time + "</p>"
                divs += "</div>"
                divs += "</div>"


            if (datr != undefined) {
                for (var n = 0; n < datr.length; n++) {

                    divs += "<div class='ans'>"
                    divs += "<div class='ans-left'>"
                    divs += "<img src='../uploads/" + datr[n].pname + ".jpg' />"
                    divs += "</div>"
                    divs += "<div class='ans-right'>"
                    divs += "<h4>" + datr[n].pname + "</h4>"
                    divs += "<p>" + datr[n].text + "</p>"
                    divs += "<p>" + datr[n].time + "</p>"
                    divs += "</div>"
                    divs += "</div>"

                }
            }
        }
        console.log(datr)
        $('.questions').html(divs)
        $('.main').click(function(){
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


