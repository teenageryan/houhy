var body = document.getElementsByTagName('body')[0]
var main = document.createElement('main')
var div = document.createElement('div')
var div1 = document.createElement('div')
var div2 = document.createElement('div')
var divT = document.createTextNode('第一个标签内容')
var div2T = document.createTextNode('第三个标签内容')
var div1T = document.createTextNode('第二个标签内容')
body.appendChild(main)
main.appendChild(div)
main.appendChild(div1)
main.appendChild(div2)
div.appendChild(divT)
div1.appendChild(div1T)
div2.appendChild(div2T)
// div.setAttribute('onclick','active()')
body.style.margin = '0'
main.style.width = '90%'
main.style.margin = '0 auto'
main.style.overflow = 'hidden'
main.style.textAlign = 'center'
div.style.background = 'red'
div.style.height = '150px'
div.style.width = '30%'
div.style.float = 'left'
div.style.margin = '10px'
div.style.lineHeight = '150px'
div.onclick = function (){
    div.style.background = 'green'
    div.innerHTML = '改变了'
}
div1.style.background = 'red'
div1.style.height = '150px'
div1.style.width = '30%'
div1.style.float = 'left'
div1.style.margin = '10px'
div1.style.lineHeight = '150px'
// div1.setAttribute('onclick','active()')
div1.onclick = function (){
    div1.style.background = 'green'
}
div2.style.background = 'red'
div2.style.animation = 'rotate 3s linear'
div2.style.height = '150px'
div2.style.width = '30%'
div2.style.float = 'left'
div2.style.margin = '10px'
div2.style.lineHeight = '150px'
// div2.setAttribute('onclick','active()')
div2.onclick = function (){
    div2.style.background = 'green'
}
// function active(){
//     // div.style.background = 'green'
// }