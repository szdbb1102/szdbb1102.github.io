var arr  = "4.57 s326 ms1.24 s10.69 s10.85 s1.64 s10.67 s608 ms3.30 s 2.86 s353 ms373 ms2.09 s467 ms1.06 s749 ms352 ms373 ms";
arr=arr.replace(' ','');



var a =[1,2,3,4,5,6,7];
var b = [1,8,9,2];
_.each(b, function (num) {
    var flg = _.every(a, function (num2) {
        num2!=num;
    });
    if(flg){
        a.push(num)
    }
});