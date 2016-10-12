$('form').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serialize()
    $.post('/insert',data,function(res){
        console.log(res)
    })
})