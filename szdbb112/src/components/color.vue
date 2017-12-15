<template>
    <div class="wrap">
        <div class="btn" @click="initList">重新随机</div>
        <div class="body">
            <div class="item" v-for="(item) in colorList">
                <div  class="blk" v-bind:style="{background:item.color}">

                </div>
                <input type="text" v-model="item.color">
                <!-- <span>{{item.color}}</span> -->
            </div>
        </div>
        
    </div>
  
</template>

<script>
// import answers from '../mock/mockData'
export default {
  name: 'color',
  data () {
    return {
        arr1 : [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'],
        colorList:[]
    }
  },
  methods:{
    initList(){
        var a = this.arr1,b= this.arr2,result = [];
        for(let i= 0;i<=100;i++){
            let c = [a[this.xxUtil.getRandom(0,15)],a[this.xxUtil.getRandom(0,15)],a[this.xxUtil.getRandom(0,15)],a[this.xxUtil.getRandom(0,15)],a[this.xxUtil.getRandom(0,15)],a[this.xxUtil.getRandom(0,15)]].join('');
            let str = '#' + c;
            result.push({color:str})
        }
        this.colorList = result;
        
    }
  },
  created(){
      this.initList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .body{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        max-width: 1000px;
        height: 600px;
        overflow-y: auto;
        padding: 10px;
        margin: 100px auto 0;
    }
    .btn{
        position: fixed;
        top: 20px;
        left:50% ;
        width: 80px;
        height: 30px;
        font-size: 14px;
        color: #fff;
        background: #3c6;
        text-align: center;
        line-height: 30px;
        border-radius:4px;
        cursor: pointer;  
        
    }
    .item{
        width: 70px;
        height: 80px;
    }
    .item .blk{
        width: 50px;
        height: 50px;
    }
    .item input{
        font-size: 14px;
        width: 50px;
    }
    @media screen and (max-width:450px){
        .body{
            max-width: 400px;
        }
        .item{
        width: 60px;
        height: 80px;
        }
    }

</style>
