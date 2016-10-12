var second = document.getElementById('second')
var minute = document.getElementById('minute')
var me = minute.innerHTML;
var time;
var i = 12;
function calc(){
    if(i > 0){
        i--;
        second.innerHTML = i;
        if(i<10){
            second.innerHTML = '0'+i;
        }
        else{
            second.innerHTML = i;
        }
    }
    else if(me!=0 && i==0){
        me = '00'
        minute.innerHTML = me;
        i=60;
    }
}
function action(){
   time = setInterval(calc,1000)
}
function stop(){
    clearInterval(time);
}