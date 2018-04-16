<template>
  <div id="sideBar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#eff1f7"
      text-color="#687080"
      active-text-color="#20a1ff"
      :router="true"
      :unique-opened="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>新闻</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news" class="item">新闻列表</el-menu-item>
          <el-menu-item index="/news/add" class="item">新闻添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user" class="item">用户列表</el-menu-item>
          <el-menu-item index="/user/add" class="item">用户添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>新闻分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/newsType" class="item">分类列表</el-menu-item>
          <el-menu-item index="/newsType/add" class="item">添加分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>党支部管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/blong" class="item">分类列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5" :router="true">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>轮播图管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/lunbo" class="item">分类列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/card">
          <i class="el-icon-document"></i>
          <span>发帖管理</span>
      </el-menu-item>
      <el-menu-item index="/summarizes">
        <i class="el-icon-document"></i>
        <span>心得总结列表</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "sideBar"
  }
</script>

<style scoped>
  #sideBar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 300px;
    background-color: #eff1f7;
  }

  #sideBar .item {
    box-sizing: border-box;
    width: 300px;
  }

</style>
