/**
 * Created by Administrator on 2016/9/28.
 */
$.fn.ulfon = function(ops){
    this.each(function(i,ele){
        sets(ele,ops)
    })
    return this
}
var sets = function(ele,ops){
    var defs = {
        addlClass:'curli',
        adduClass:'curr',
        proD:'prog',
        seD:'row'
    }
    var setss = $.extend(defs,ops)
    var $ele = $(ele)
    //console.log($ele)
var $addlClass = '.' + defs.addlClass,
    $adduClass = '.' + defs.adduClass,
    $proD = $('.' + defs.proD,$ele),
    $seD = $('.' + defs.seD,$ele)
    $seD.children().each(function(){
    //console.log($seD)
    $seD.children().hover(function(){
            $(this).addClass(defs.addlClass).siblings().removeClass(defs.addlClass)
//console.log($ele.children($proD).children().eq($(this).index()))
//            $ele.children($proD).children().each(function(){
                //console.log($(this))
            $proD.children().eq($(this).index()).addClass(defs.adduClass).siblings().removeClass(defs.adduClass)
            })

        })

    //})
}
