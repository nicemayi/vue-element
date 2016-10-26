<style>
  body {
    font-family: Helvetica, sans-serif;
    position: fixed;
    overflow: hidden;
    width: 100%;
  }
</style>


<template>

  <div id="app">
    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">
      <router-link to="/receive">
        <el-menu-item index="1">Receive Return Box</el-menu-item>
      </router-link>
      <router-link to="/order">
        <el-menu-item index="2">Order</el-menu-item>
      </router-link>
      <router-link to="/shipping-pending">
        <el-menu-item index="3">Shipping Status</el-menu-item>
      </router-link>
      <router-link to="/status">
        <el-menu-item index="4">Client Inventory</el-menu-item>
      </router-link>
    </el-menu>
    <router-view></router-view>
  </div>

</template>


<script>
  export default {
    data () {
      return {
        msg: 'Use Vue 2.0 Today!'
      }
    },

    methods: {
      startHacking () {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 6000
        })
      },
      handleselect () {
        console.log("haha");
      }
    }
  }
</script>


