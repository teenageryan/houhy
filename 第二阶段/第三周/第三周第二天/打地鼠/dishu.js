var imgL = document.querySelectorAll('img')
// console.log(tdL)
var scores = 0
function show(){
var m = Math.floor(Math.random()*16)
// console.log(m)
var score = document.getElementById('score')
    // imgL[m].style.height = '80px'
    imgL[m].className = 'ani'
    // console.log(m)
    // 出现的动画暂停时间后消失
  setTimeout(function(){
      imgL[m].className = 'ma'
  },3000)
    imgL[m].onclick = function(){
        // imgL[m].style.height = '0px'
        imgL[m].className = 'ma'
        scores +=10
        score.innerHTML = '得分：'+ scores 
        
    }
}
// 同时出现一批地鼠
function shows(){
    for(var i=0;i<7;i++){
        show()
    }
}
setInterval(shows,2000)