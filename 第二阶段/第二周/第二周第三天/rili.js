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
var msg = document.getElementById('msg')
var oStrong = msg.getElementsByTagName('strong')[0]
var oP = msg.getElementsByTagName('p')[0]
var oLi = document.getElementsByTagName('li')
//获取数组中所有的元素内容以及索引值
        for(var i = 0;i < oArray.length;i++)
        {
            // console.log( i + 1);
            oLi[i].index = i     //[index],元素的索引值
            oLi[i].onclick = function(){      //给li添加点击事件
                oP.innerHTML = oArray[this.index]
                oStrong.innerHTML = this.index + 1
                for(var a = 0;a < oArray.length;a++)
                {
                    oLi[a].className = '';
                   this.className = 'current'
                }
            }
            
        }