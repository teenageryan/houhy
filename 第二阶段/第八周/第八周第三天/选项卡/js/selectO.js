/**
 * Created by Administrator on 2016/9/29.
 */
window.onload = function(){
    var t2 = new Tab("box");
    t2.init();
    t2.autoPlay();
}

function Tab(className){
    this.oParent = document.getElementsByClassName(className);
    this.aInput = this.oParent.getElementsByTagName(".row li");
    console.log(this.aInput)
    this.aDiv = this.oParent.getElementsByTagName(".prog ul");
    this.iNow = 0;
}

Tab.prototype.init = function(){
    var This = this;
    for(var i=0; i<this.aInput.length;i++){
        this.aInput[i].index = i;
        this.aInput[i].hover=function(){
            This.change(this);
        }
    }
}

Tab.prototype.change = function(obj){
    for(var i=0; i<this.aInput.length;i++){
        this.aInput[i].className="";
        this.aDiv[i].style.display="none";
    }
    obj.className="curli";
    this.aDiv[obj.index].style.display="block";
}

Tab.prototype.autoPlay = function(){
    var This = this;

    setInterval(function(){

        if(This.iNow == This.aInput.length-1){
            This.iNow = 0;
        }
        else{
            This.iNow++;
        }

        for(var i=0;i<This.aInput.length;i++){
            This.aInput[i].className = '';
            This.aDiv[i].style.display = 'none';
        }
        This.aInput[This.iNow].className = 'cruli';
        This.aDiv[This.iNow].style.display = 'block';


    },2000);
}