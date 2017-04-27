var TimeNow = new Date().getTime().toString();
function a() {
    function b(time,TimeNow) {
        var t1 = time;
        var t2 = TimeNow;
        console.log(TimeNow,time,'xx')
        if(TimeNow==time){
            var st=setInterval(function () {
                clearInterval(st);
                console.log(t1,t2,'yy')
                console.log(index++)
                b(t1,window.TimeNow);
            },500)
        }
    }
    var time = new Date().getTime().toString();
        window.TimeNow = time;
    var index = 0;
    b(time,window.TimeNow)
}
a();