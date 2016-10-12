$.fn.nnn = function(option){
    this.each(function(i,ele){
        select(ele,option)
    })
    return this
}

var select = function(ele,option){
    var defs = {
        hover:'hover',
        block:'block-box',
        styleClass:'current'
    }
    var settings = $.extend(defs,option)
    var $ele = $(ele)
    var $lis = $('.' + defs.hover,$ele).children()
    var $section = $('.' + defs.block,$ele).children()
    $lis.first().addClass(defs.styleClass)
    $section.first().css('display','block')
    $lis.hover(function(){
        $(this).addClass(defs.styleClass).siblings().removeClass(defs.styleClass)
        $section.eq($(this).index()).css('display','block').siblings().removeAttr('style')
    })
}