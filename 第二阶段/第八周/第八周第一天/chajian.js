/**
 * Created by Administrator on 2016/9/26.
 */
//一个页面可以写多个轮播，可以多次调用JS文件
//$.fn.mslide = function(ele){
//    var lisCss = [
//        {width:150,height:250,top:50,left:0,zIndex:1,$opacity:0.5},
//        {width:200,height:300,top:25,left:150,zIndex:2,$opacity:0.7},
//        {width:250,height:350,top:0,left:350,zIndex:4,$opacity:1},
//        {width:200,height:300,top:25,left:600,zIndex:2,$opacity:0.7},
//        {width:150,height:250,top:50,left:800,zIndex:1,$opacity:0.5},
//        {width:150,height:250,top:50,left:950,zIndex:1,$opacity:0.5},
//        {width:150,height:250,top:50,left:1100,zIndex:-1,$opacity:0.5}]
//console.log($(this))   //指代html页面中的$()中内容  .wai ul
//
//}

//each(i,ele) i指代当前索引，ele指代当前元素

//$.fn.mslide = function(options){
//    this.each(function(i,ele){
//        yslide(ele,options)
//    })
//    var yslide = function(ele,options){
//ele是dom对象 $(ele)转化为jQuery对象
//        var $ele = $(ele)
//    }
//}


//$('div').each(function(){
//    console.log(this)
//    console.log($(this))
//    console.log(i)
//})


$.fn.mslide = function(options){
    //console.log(this)
    //console.log($(this))
    this.each(function(i,ele){
        //console.log(i)
        //console.log(ele)
        yslide(ele,options)
    })
    return this
}
var yslide = function(ele,options){
    var moren = $.extend({
        delay:2000,
        speed:1000
    },options)
    var $ele = $(ele)
    var lisCss = [
        {width:150,height:250,top:50,left:0,zIndex:1,$opacity:0.5},
        {width:200,height:300,top:25,left:150,zIndex:2,$opacity:0.7},
        {width:250,height:350,top:0,left:350,zIndex:4,$opacity:1},
        {width:200,height:300,top:25,left:600,zIndex:2,$opacity:0.7},
        {width:150,height:250,top:50,left:800,zIndex:1,$opacity:0.5},
        {width:150,height:250,top:50,left:950,zIndex:1,$opacity:0.5},
        {width:150,height:250,top:50,left:1100,zIndex:-1,$opacity:0.5}]
    console.log($ele)
    console.log($ele.children().children().find('li'))
    function move(){
        $ele.children().children().find('li').each(function(ins){
            $(this).stop(true,true).animate(lisCss[ins]).children().css('opacity',lisCss[ins].$opacity)
        })
    }
    move()

    function next(){
        lisCss.unshift( lisCss.pop())
        move()
    }
    function show(){
       ti = setInterval(next,moren.delay)
    }
show()
function st(){
    clearInterval(ti)
}
    function prev(){
        lisCss.push( lisCss.shift() )
        move()
    }

    $ele.children().first().click(function(){
        //console.log($('.wai'))
        next()
        st()
        show()
    })
    $ele.children().last().click(function(){
        prev()
        st()
        show()
    })
}