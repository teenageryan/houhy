/**
 * Created by Administrator on 2016/9/28.
 */
$.fn.maria = function(ops){
    this.each(function(i,ele){
        mfon(ele,ops)
    })
    return this
}
var mfon = function(ele,ops){
    var defs = {
        current:'cur',
        move:'img',
        moveBox:'box',
        cir:'num',
        delay:'1000'
    }
    var $ele = $(ele)
    var sets = $.extend(defs,ops)
    var $cur = $('.' + defs.current,$ele)
    var $mov = $('.' + defs.move,$ele)
    var $movB = $('.' + defs.moveBox,$ele)
    var $cir = $('.' + defs.cir,$ele)
    var $del = defs.delay
    var heig = $($mov).children().height()
    var len = $($mov).children().length
    var ti
    //var n = 0
    $cir.children().eq(0).addClass(defs.current)
    function move(){
        $cir.children().each(function(){
            $(this).hover(function(){
                $(this).addClass(defs.current).siblings().removeClass(defs.current)
                $mov.stop(true,true).animate({
                    top:-heig * $(this).index()
                })
                //console.log(top)
                clearInterval(ti)
                i = $(this).index() + 1
            },function(){
                ti = setInterval(auto,$del)
            })
        })
    }
    move()
    //setInterval(move,1000)
    var i = 0
    function auto(){
        if(i>len -1){
            i = 0
        }
        $cir.children().eq(i).addClass(defs.current).siblings().removeClass(defs.current)
        $mov.stop(true,true).animate({
            top:-heig * i
        })
        i++

    }
    ti = setInterval(auto,$del)
}