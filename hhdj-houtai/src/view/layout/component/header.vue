<template>
  <div id="headerbar">
    <h1>信工党建e家</h1>
    <img src="../../../../static/images/05.jpg" alt="">
  </div>
</template>

<script>
  export default {
    name: "headerbar"
  }
</script>

<style scoped>
  #headerbar{
    position: fixed;
    height: 60px;
    width: 100%;
    z-index: 998;
    background: #20a1ff;
  }
  #headerbar h1{
    line-height: 60px;
    padding-left: 20px;
    float: left;
    font-size: 18px;
    color: #fff;
  }
  #headerbar img {
    display: block;
    float: right;
    padding: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
