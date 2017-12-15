
let util = {
    getRandom(min,max){
        // parseInt(Math.random()*(max-min+1)+min,10);
        let num = Math.floor(Math.random()*(max-min+1)+min);
        return num;
    },
    getRandomColor(){
        
    }
}
export default util;