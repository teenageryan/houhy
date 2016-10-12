/**
 * Created by Administrator on 2016/9/29.
 */
$.fn.ulfon = function(ops){
    this.each(function(i,ele){
        var selec = new selecc(ele,ops)
        selec.sets()
    })
}
class selecc{
    constructor(ele,ops){
        this.ele = ele
        this.ops = ops
        console.log(this)
    }
    sets(){
        var defs = {
            addlClass:'curli',
            adduClass:'curr',
            proD:'prog',
            seD:'row'
        }
        var sets = $.extend(defs,this.ops)
        var $ele = $(this.ele)
        var $addlClass = '.' + defs.addlClass,
            $adduClass = '.' + defs.adduClass,
            $proD = $('.' + defs.proD,$ele),
            $seD = $('.' + defs.seD,$ele)
        $seD.children().each(function(){
            $seD.children().hover(function(){
                $(this).addClass(defs.addlClass).siblings().removeClass(defs.addlClass)
                $proD.children().eq($(this).index()).addClass(defs.adduClass).siblings().removeClass(defs.adduClass)
            })

        })
    }
}

