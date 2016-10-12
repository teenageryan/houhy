/**
 * Created by Administrator on 2016/9/27.
 */
$(function(){
    (function($){
        $.fn.myswim = function(){
//    选中li标签，添加点击事件   -- li?
            console.log(this)     //所有nav标签
            this.each(function(i,ele){
                yslide(ele)

            })
            return this
        }
        var yslide = function(ele){
            var $ele = $(ele)
            $ele.children().find('li').each(function(){
                var count = 0
                $(this).click(function(){
                    count ++
                    if(count % 2 != 0){
                        $(this).children('ul').css('display','block')
                    }else{
                        $(this).children('ul').css('display','none')
                    }
                })
            })
        }
    })(jQuery)
})

