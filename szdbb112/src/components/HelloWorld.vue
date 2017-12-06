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
    <div class="xx_msg_wrap">
      <div class="xx_msg_box" :class='{xx_left:item.ifLeft}' v-for="item in msgList">
        {{item.msg}}
      </div>
    </div>
    <footer class="dialogue-footer xx_animate_toggle" @click="push()"> 
      <div class="component-dialogue-bar">
        <div class="dialogue-item">
          <div class="left-slide-type iconfont icon-dialogue-bar-jianpan"  @click="toggleInput()"></div>
          <ul class="component-dialogue-bar-public" >
            <li v-for="(item, index) in tabs" @click="toggelTab(index)">
              <section v-show='item.show'>
                <div v-for="itemm in tabContent[index].list">
                  {{itemm.txt}}
                </div>
              </section>
              <div class="_ellipsis">{{item.txt}}</div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <div id="prompt-body">
        <div class="xx_bg" v-show='!ifShowSelectBar' @click="toggleInput()">

        </div>
        <div class="next-topic">
            <ul class="topics">
                <li>
                    <a href="javascript:;">爱好</a>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      animateFlg:false,
      ifShowSelectBar:true,
      msg: 'test',
      msgList:[{ifLeft:true,msg:'你好'},{ifLeft:false,msg:'好你妈'}],
      tabs:[{id:1,txt:'测试1',show:false},{id:2,txt:'测试2',show:false},{id:3,txt:'测试3',show:false}],//底部tab
      tabContent:[
        {id:1,list:[
          {
            id:1,
            txt:'测试'
          },
          {
            id:2,
            txt:'测试'
          },
          {
            id:3,
            txt:'测试'
          },
        ]},
        {id:2,list:[
          {
            id:4,
            txt:'测试'
          },
          {
            id:5,
            txt:'测试'
          },
          {
            id:6,
            txt:'测试'
          },
        ]},
        {id:3,list:[
          {
            id:7,
            txt:'测试'
          },
          {
            id:8,
            txt:'测试'
          },
          {
            id:9,
            txt:'测试'
          },
        ]},
      ]
      
    }
  },
  methods:{
    push(){
      this.msgList.push({ifLeft:true,msg:'测试时所所所所所所测试时所所所所所所测试时所所所所所所'})
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
      this.tabs.map((e,index)=>{//切换时去掉tab列表
          this.tabs[index].show = false;
      })
      this.ifShowSelectBar = !this.ifShowSelectBar;
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
    transform: translate3d(0, 100%, 0);
    -webkit-transition: -webkit-transform 0.15s ease-in;
    transition: -webkit-transform 0.15s ease-in;
    transition: transform 0.15s ease-in;
    transition: transform 1s ease-in, -webkit-transform 2s ease-in;

}

</style>
