    function DragProgress(progress,percent,bar){
        this.progress = getdom(progress);
        this.percent = getdom(percent);
        this.bar = getdom(bar);
        this.init();
    }
    DragProgress.prototype = {
        init:function(){
            var self = this;
            self.bar.onmousedown=function(e){
                var x = getXY(e).x;
                var left = this.offsetLeft;
                var max = self.progress.offsetWidth - this.offsetWidth;
                document.onmousemove=function (e){
                    var nx = getXY(e).x;
                    var nleft = Math.min(max,Math.max(-2,left + (nx-x)));
                    self.bar.style.left=nleft+'px';
                    self.ondrag(nleft);
                    window.getSelection ? window.getSelection().removeAllRanges() : window.selection.empty();
                };
                document.onmouseup = function(){
                    this.onmousemove = null;
                    this.onmousedown = null;
                };
            };
            self.progress.onclick = function (e){
                var left = this.offsetLeft;
                var barw = self.bar.offsetWidth/2;
                var nl = getXY(e).x-left-barw;
                self.bar.style.left = nl+"px";
                self.ondrag(nl);
                var max = self.progress.offsetWidth - this.offsetWidth;
            }
        },
        ondrag:function(x){
            this.percent.style.width = Math.max(0,x)+'px';
        }
    }

    function getdom(id){
        return document.getElementById(id);
    };

    function getXY(e){
        var ev = e || window.event;
        var sleft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var stop = document.body.scrollTop || document.documentElement.scrollTop;
        var x = ev.pageX || (ev.clientX + sleft);
        var y = ev.pageY || (ev.clientY + stop);
        return {x:x,y:y};
    }