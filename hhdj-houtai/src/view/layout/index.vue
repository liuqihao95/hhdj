<template>
  <div class="index">
    <topHeader></topHeader>
    <sideBar></sideBar>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  import topHeader from './component/header'
  import sideBar from './component/sideBar'

  export default {
    name: "index",
    components: {
      sideBar,
      topHeader
    }
  }
</script>

<style scoped>
  .content{
    padding-top: 80px;
    padding-left: 300px;
  }

</style>
