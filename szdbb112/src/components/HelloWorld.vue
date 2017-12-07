<template>
  <div class="hello" :class="{active:!ifShowSelectBar,showTab:ifShowSelectBar}">
    <!-- <div class="_cover-top" >
      <div class="top-back">
          <div class="_ellipsis iconfont icon-return-arrow v-link-active">微信</div>
      </div>
      <div class="top-other">
          <div class="_align-right">
              <span class="iconfont icon-chat-service" ></span>
          </div>
      </div>
      <div class="top-title _effect">
          <p class="_effect" slot="center">
              <span class="top-title__text _ellipsis" >饿了么</span>
              <span class="top-title__num parentheses" style="display: none;">0</span>
              <span class="iconfont icon-mute" style="display: none;"></span>
          </p>
      </div>
    </div> -->
    <div class="xx_msg_wrap" ref='wrap' @click="hideTabList()">
      <div class="xx_msg_item" :class='{xx_left_txt:item.ifLeft}' v-for="item in msgList">
        <div class="xx_msg_box" :class='{xx_left:item.ifLeft}' v-html="item.msg">
        </div>
      </div>
    </div>
    <footer class="dialogue-footer"> 
      <div class="component-dialogue-bar xx_animate_toggle">
        <div class="dialogue-item">
          <div class="left-slide-type iconfont icon-dialogue-bar-jianpan"  @click="toggleInput()"></div>
          <ul class="component-dialogue-bar-public" >
            <li v-for="(item, index) in tabs" @click="toggelTab(index)">
              <section v-show='item.show'>
                <div v-for="itemm in tabContent[index].list" @click="pushMsg(itemm.txt,2);findAnswers(itemm.id)">
                  {{itemm.txt}}
                </div>
              </section>
              <div class="_ellipsis">{{item.txt}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div id="prompt-body">
        <div class="next-topic">
            <ul class="topics">
                <li v-for="itemm in biaoqianContent.list" @click="pushMsg(itemm.txt,2);findAnswers(itemm.id);toggleInput()">
                  <a>
                  {{itemm.txt}}
                  </a>
                </li>
            </ul>
        </div>
      </div>
    </footer>
    <div class="xx_bg" v-show='!ifShowSelectBar' @click="toggleInput()">

    </div>
    
  </div>
</template>

<script>
import answers from '../mock/mockData'
export default {
  name: 'HelloWorld',
  data () {
    return {
      animateFlg:false,
      ifShowSelectBar:true,
      msg: 'test',
      msgList:[{ifLeft:true,msg:'我是Nicholas Boy Xue,希望和你交朋友！'}],
      tabs:[{id:1,txt:'基本信息',show:false},{id:2,txt:'个人作品',show:false},{id:3,txt:'特长喜好',show:false}],//底部tab
      tabContent:[
        {id:1,list:[
          {
            id:1,
            txt:'别号由来'
          },
          {
            id:2,
            txt:'出身背景'
          },
          {
            id:3,
            txt:'天赋符文'
          },
        ]},
        {id:2,list:[
          {
            id:4,
            txt:'学生时代'
          },
          {
            id:5,
            txt:'工作项目'
          },
          {
            id:6,
            txt:'闲暇练手'
          },
        ]},
        {id:3,list:[
          {
            id:7,
            txt:'琴棋书画'
          },
          {
            id:8,
            txt:'文韬武略'
          },
          {
            id:9,
            txt:'奇门遁甲'
          },
        ]},
      ],
      biaoqianContent:
        {id:1,list:[
          {
            id:10,
            txt:'书读百遍'
          },
          {
            id:11,
            txt:'游戏人生'
          },
          {
            id:12,
            txt:'工作意愿'
          },
        ]},
    }
  },
  methods:{
    push(){
      // this.msgList.push({ifLeft:true,msg:'测试时所所所所所所测试时所所所所所所测试时所所所所所所'})
    },
    toggelTab(idx){
      this.tabs.map((e,index)=>{
        if(index!==idx){
          this.tabs[index].show = false;
        }
      })
      this.tabs[idx].show = !this.tabs[idx].show;
    },
    toggleInput(){
      this.hideTabList()
      this.ifShowSelectBar = !this.ifShowSelectBar;
    },
    hideTabList(){
      this.tabs.map((e,index)=>{//切换时去掉tab列表
          this.tabs[index].show = false;
      })
    },
    pushMsg(txt,flg){//flg：1左边，2右边
      this.msgList.push({ifLeft:flg==1,msg:txt})
      setTimeout(()=>{
        this.$refs['wrap'].scrollTop = this.$refs['wrap'].scrollHeight;
      },100)
    },
    findAnswers(id){
      let list = answers;
      list.map((e,idx)=>{
        console.log(1,idx,id)
        if(id===e.id){
          setTimeout(()=>{
            this.pushMsg(e.answer,1);
          },800)
        }
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.xx_msg_wrap{
    position: absolute;
    top: 0px;
    bottom: 50px;
    width: 100%;
    background: #E8F9F6;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
}
.xx_msg_box{
    display: inline-block;
    padding: 9px 14px;
    max-width: 65%;
    overflow: hidden;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 24px;
    -webkit-border-radius: 20px;
    border-radius: 20px;
    -webkit-box-shadow: 5px 5px 15px 0 rgba(102,102,102,0.1);
    box-shadow: 5px 5px 15px 0 rgba(102,102,102,0.1);
    -webkit-transition: width .12s ease-out, height .12s ease-out;
    transition: width .12s ease-out, height .12s ease-out;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-border-radius: 20px 20px  0px 20px;
    border-radius: 20px 20px 0px 20px;
    background: #3c6;
    color: #fff;
}
.xx_left{
    background: #fff;
    color: #333;
    -webkit-border-radius: 0 20px 20px 20px;
    border-radius: 0 20px 20px 20px;
}
.xx_msg_item{
  overflow: hidden;
  text-align: right;
}
.xx_left_txt{
  text-align: left;
}

</style>
