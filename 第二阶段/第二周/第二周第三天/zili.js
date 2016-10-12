function dui(name,sex,age,tall){
    this.name = name
    this.sex = sex
    this.age = age
    this.tall = tall
}
var inf = new dui('ss','女',34,145)
var inf1 = new dui('aa','男',23,167)
var inf2 = new dui('dd','男',12,234)
var inf3 = new dui('yt','女',5,155)
var inf4 = new dui('ju','女',6,166)
var inf5 = new dui('ki','男',7,134)
var inf6 = new dui('lo','女',8,175)
var inf7 = new dui('pp','男',9,187)
var tp = document.getElementsByTagName('p')[0]

var arr = new Array()
arr[0] = inf
arr[1] = inf1
arr[2] = inf2
arr[3] = inf3
arr[4] = inf4
arr[5] = inf5
arr[6] = inf6
arr[7] = inf7
// console.log(arr)
function active(){
    var suiji = Math.random()*8;
        var mor =  arr[Math.floor(suiji)].name
        // console.log(mor)
        tp.innerHTML = mor
    
}



