/**
 * Created by Administrator on 2016/9/27.
 */
$.fn.myswim = function(options){
this.each(function(i,ele){
 //console.log($(this))
    ys(ele,options)
})
    return this
}
var ys = function(ele,options){
    var defaults = $.extend({
        pre:'',
        next:'',
        uls:'',
        directions:'left',
        delay:6000
    },options)
    //console.log(ele)
    var $ele = $(ele)
    //console.log($ele)
    var uls = $ele.children('div').find('ul')
    //console.log(lis)

        $ele.children().first().click(function(){
            uls.each(function(){
                //console.log( $('.box>span'))
                var wid = $(this).children().width()
                var heig = $(this).children().height()
                //console.log(wid)
                $(this).stop(true,true).animate({
                    //var pos = defaults.directions == left?-wid:-heig;
                    //defaults.directions:pos
                },defaults.delay,function(){
                    $(this).css('left','0').find('li').eq(0).appendTo($(this))
                })

            })
        })

    $ele.children().last().click(function(){
        uls.each(function(){
            var wid = $(this).children().width()
            var heig = $(this).children().height()
            //console.log(wid)
            $(this).css('left','-200px').find('li').last().prependTo($(this))
            $(this).stop(true,true).animate({
                left:0
            },defaults.delay)

        })
    })
}