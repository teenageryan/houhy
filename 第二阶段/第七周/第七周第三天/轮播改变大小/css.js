/**
 * Created by Administrator on 2016/9/26.
 */
$(function(){
    var lisCss = [
        {width:150,height:250,top:50,left:0,zIndex:1,$opacity:0.5},
        {width:200,height:300,top:25,left:150,zIndex:2,$opacity:0.7},
        {width:250,height:350,top:0,left:350,zIndex:4,$opacity:1},
        {width:200,height:300,top:25,left:600,zIndex:2,$opacity:0.7},
        {width:150,height:250,top:50,left:800,zIndex:1,$opacity:0.5},
        {width:150,height:250,top:50,left:950,zIndex:1,$opacity:0.5},
        //{width:200,height:300,top:25,left:1100,zIndex:2,$opacity:0.7},
        //{width:250,height:350,top:0,left:1300,zIndex:4,$opacity:1},
        //{width:200,height:300,top:25,left:1550,zIndex:2,$opacity:0.7},
        //{width:150,height:250,top:50,left:1750,zIndex:1,$opacity:0.5},
        //{width:200,height:300,top:25,left:1900,zIndex:2,$opacity:0.7},
        {width:150,height:250,top:50,left:1100,zIndex:-1,$opacity:0.5}]


    var lis = $('.chajian ul').find('img')

    function move(){
    lis.each(function(ins){
        //stop(true,true),表示所有动画快速执行完成
            $(this).css('zIndex',lisCss[ins].zIndex).stop(true,true).animate(lisCss[ins]).find('img').css('opacity',lisCss[ins].$opacity)
    })
    }
    move()

    //从左往右轮播
    function next(){
        //pop()删除并返回最后一个数组元素
        //shift（）删除并返回数组第一个元素
        //unshift（）在数组开始位置添加一个或多个元素
        //push（）在数组最后添加一个或多个元素
        lisCss.unshift( lisCss.pop() )
        move()
    }
    function stop(){
        clearInterval(ti)
    }
    function show(){
        ti = setInterval(next,2000)
    }
    show()

    //从右往左轮播
    function prev(){
        lisCss.push( lisCss.shift() )
        move()
    }
    //setInterval(prev,2000)
    $('span').eq(0).click(function(){
        stop()
        prev()
        show()
    })
    $('span').eq(1).click(function(){
        stop()
        next()
        show()
    })
})