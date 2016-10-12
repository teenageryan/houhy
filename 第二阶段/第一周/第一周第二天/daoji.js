var second = document.getElementById('second')
var minute = document.getElementById('minute')
var me = minute.innerHTML;
var i = 1;
function calc(){
    if(i>=0){
        i--;
        second.innerHTML = i;
        if(i<10){
            second.innerHTML = '0' + i;
        }
    }
    if(me!=0&&i<0){
        me='00';
        minute.innerHTML = me;
        i = 10
    }
    
}
setInterval(calc,1000)  