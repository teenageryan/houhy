var nowTime = new Date();
// alert(nowTime)
var year = nowTime.getFullYear();
var month = nowTime.getMonth() + 1;
var date = nowTime.getDate();
var hour = nowTime.getHours() % 12;
var minute = nowTime.getMinutes();
var second = nowTime.getSeconds();
document.getElementById('y').innerHTML = year + '年';
document.getElementById('mo').innerHTML = month + '月';
document.getElementById('d').innerHTML = date + '日';
var week = nowTime.getDay();
switch(week){
    case 0:week = '星期日';
    break;
    case 1:week = '星期一';
    break;
    case 2:week = '星期二';
    break;
    case 3:week = '星期三';
    break;
    case 4:week = '星期四';
    break;
    case 5:week = '星期五';
    break;
    case 6:week = '星期六';
    break;
}
document.getElementById('w').innerHTML = week;
var s = -15 - second;
var m = -15 * 60 - minute * 60 - second;
var h = -3 * 60 * 60 - hour * 60 * 60 - minute * 60 - second;
// alert(h)
sw.style.animationDelay = s + 's';
mw.style.animationDelay = m + 's';
hw.style.animationDelay = h + 's';
function shouTime(){
    var nowTime = new Date();
    var hour = nowTime.getHours() % 12;
    var minute = nowTime.getMinutes();
    var second = nowTime.getSeconds();
    var show = document.getElementById('show');
    // var minutes = document.getElementById('mw');
    // var seconds = document.getElementById('sw');
    // show.innerHTML =  hour + ':' + minute + ':' + second;
    if( second < 10 ){
        second = '0' + second;
    }
    if( minute < 10 ){
        minute = '0' + minute;
    }
    if( hour < 10 ){
        hour = '0' + hour; 
    }
    show.innerHTML =  hour + ':' + minute + ':' + second;
}
setInterval(shouTime,1000)