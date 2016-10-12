/**
 * Created by Administrator on 2016/9/26.
 */
$(function(){
    var lis = $('ul').find('li')
    lis.each(function (index) {
        //lis[index].position()//混用
        //console.log(lis.eq(index).position())
        if( index == 0){
            lefts = lis.last().position().left
        }
        else{
            lefts = lis.eq(index - 1).position().left
        }
        //lefts = $(this).position().left
        console.log(lefts)
        //当前元素的left与上一个元素的一致
        $(this).stop().animate({
            left:lefts
        })
    })
})