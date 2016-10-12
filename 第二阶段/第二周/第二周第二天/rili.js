var oArray = [
    '元旦：1月1日至三日放假三天',
    '春节：2月2日至8日放假七天',
    '妇女节：3月8日妇女节，与我无关',
    '清明节：4月3日至5日放假三天',
    '劳动节：4月30日至5月2日放假3天',
    '端午节：6月4日至6日放假三天',
    '小暑：7月7日小暑，不放假',
    '七夕节：8月6日七夕节，不放假',
    '中秋节：9月10日至12日放假三天',
    '国庆节：10月1日至7日，放假7天',
    '立冬：11月8日立冬，不放假',
    '艾滋病日：12月1日，不放假'
]
function Show(){
     var aLi= document.getElementsByTagName('li'); 
    //  console.log(typeof(aLi))
     var yue = document.getElementById('yue');
     var ri = document.getElementById('ri')
     
     //获取数组中所有的元素内容以及索引值
      var i=0; 
       for(i=0;i<aLi.length;i++) //for循环遍历li元素 
          { 
            aLi[i].index=i; 
            aLi[i].onmouseover =function() //添加鼠标指向事件 
         { 

       for(i=0;i<aLi.length;i++) //for循环历遍li元素去掉li样式 
         { 
            aLi[i].className =''; 
         } 
            this.className ='active'; //给当前标签添加active 样式 
            yue.innerHTML  = this.index+1
            ri.innerHTML = oArray[this.index]
          } 

       } 

}
Show();
