<template>
  <div id="app" @touchmove.prevent>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less"> 
 @import "./assets/css/common.less";
</style> 
