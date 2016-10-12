// var timer;
// var count = 0;
// // alert(timer)
// function active(){
//     count++;
//     // 获取两个span标签：通过标签名称获取，也可以通过id获取
//     var span1 = document.getElementsByTagName('span')[0];
//     // var span1 = document.getElementById('id名');
//     var span2 = document.getElementsByTagName('span')[1];
//     // 获取标签内部的内容
//     var num1 = span1.innerHTML;
//     var num2 = span2.innerHTML;
//     // console.log(num1);
//     // console.log(num2);     输出当前获取的内容


//     // setInterval(function,time)      每隔time时间（毫秒），执行一次function函数（方法）；
//     // 每个1秒，span2标签内部的数字减一
//     function calc(){
//         num2--;
//         if(num2 < 0){
//             num1--;
//             if(num1<0){
//                 return;
//             }
//             num1 = num1 < 10 ? '0' + num1 : num1;
//             span1.innerHTML = num1;
//             num2 = 8;
//         }
//         num2 = num2 < 10 ? '0' + num2 : num2  //三元运算
//         span2.innerHTML = num2;
//     }
    
//     if( count % 2 !=0 ){
//        timer = setInterval(calc,1000);
//     }
//     else{
//         clearInterval(timer);
//     }


//     // 自动倒计时：
//     // 先让秒--；
//     // 当秒小于0时，分--，秒重新赋值，再--；
//     // 当分小于0时，停止计时；
//     // 点击时倒计时
// }
var count = 0
var t 
function active(){
    count ++
        function ji(){
        var minute = document.querySelectorAll('span')[0]
        var second = document.querySelectorAll('span')[1]
        var se = second.innerHTML
        var min = minute.innerHTML
        // console.log(min)
        se --
        if(se < 0){
            min --;
            if(min < 0){
                return;
                // 跳出函数不再执行函数
            }
            min = min < 10?'0' + min : min
            minute.innerHTML = min
            se = 1;
            
        }
        se = se < 10?'0' + se : se
        second.innerHTML = se
        // console.log(se)
        
    }

    if(count % 2 == 0){
        clearInterval(t)
    }
    else{
        t = setInterval(ji,1000)
    }
}
