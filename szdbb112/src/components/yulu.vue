<template>
    <div class="wrap" v-bind:style="{background:bg}">
        <div class="btn" @click="initList">随便看看</div>
        <div class="body">
            <div class="item" v-for="(item) in yuluList">
                <div>薛少说：{{item.txt}}</div>
                <!-- <span>{{item.color}}</span> -->
            </div>
        </div>
        
    </div>
  
</template>

<script>
import yuluData from '../mock/yuluData'
export default {
  name: 'yulu',
  data () {
    return {
        colorList:['#FBDDF4','#F3CD6B','#666','#FEBDEC','#9EEDF4','#AFEF90','#20B090'],
        yuluList:[],
        bg:'#ececec'
    }
  },
  methods:{
    initList(){
        let total = yuluData,idx = this.xxUtil.getRandom(0,total.length-1);
        this.bg = this.colorList[this.xxUtil.getRandom(0,this.colorList.length-1)];
        console.log(this.bg)
        this.yuluList = [yuluData[idx]]
    }
  },
  created(){
      this.initList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrap{
        width: 100%;
        height: 100%;
    }
    .body{
        position: fixed;
        top: 50%;
        left: 20%;
        transform: translate(-50%,-50%);
        color: #fff;
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
        margin-left: -40px;
        
    }
    @media screen and (max-width:450px){
        .body{
            max-width: 400px;
        }
        .item{
            
        }
    }

</style>
