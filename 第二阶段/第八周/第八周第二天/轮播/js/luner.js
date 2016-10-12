/**
 * Created by Administrator on 2016/9/28.
 */
$(function(){
    $.fn.lunbo = function(ops){
        this.each(function(ins,ele){
            slides(ele,ops)
        })
        return this
    }
    var slides = function(ele,ops){
        //插件默认设置，即默认滚动方向，以及相关标签
        var defs = {
            //默认方向是left，可选left和top
            direction:'left',
            speed:'1000',
            preClass:'sld-pre',
            nextClass:'sld-next',
            moveClass:'sld-move',
            listClass:'sld-lis'
        }
        //合并默认设置及用户设置参数
        var settings = $.extend(defs,ops)
        //使用过程
        var $ele = $(ele),
            $sldPre = $('.' + defs.preClass,$ele),
            $sldNext = $('.' + defs.nextClass,$ele),
            $sldMove = $('.' + defs.moveClass,$ele),
            $sldList = $('.' + defs.listClass,$ele),
            $li = $sldMove.children()

//设置初始化样式，left/top
        var dir = defs.direction
        if(dir == 'left'){
            var $len = $li.width()
            $sldMove.css('width', $len * $li.length)
        }

        if(dir == 'top'){
            var $len = $li.height()
            $sldMove.css('height', $len * $li.length)
        }

        //设置动画过程
        var data1 = {},data2 = {}
        data1[dir] = -$len
        data2[dir] = 0

        //下一张
        function next(){
            $sldMove.stop(true,true).animate(data1,defs.speed,function(){
                $sldMove.css(data2).children().first().appendTo( $sldMove )
            })
        }

        function pre(){
            $sldMove.css(data1).children().last().prependTo( $sldMove )
            $sldMove.stop(true,true).animate(data2,defs.speed)
        }
        $sldNext.click(function(){
            console.log('9899')
            next()
        })
        $sldPre.click(function(){
            pre()
        })
    }
})

