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
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <router-link to="/shipping-pending">
            <el-menu-item index="2">
              Shipping Status
            </el-menu-item>
          </router-link>
          <router-link to="/status">
            <el-menu-item index="3">Client Inventory</el-menu-item>
          </router-link>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="7">
          <el-menu-item index="4" style="margin-top: 11px;" align="center">
            <el-form :inline="true" :model="loggin_form">
              <el-form-item>
                <el-input size="large" v-model="loggin_form.username" placeholder="Username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input size="large" v-model="loggin_form.password" placeholder="Password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large">Login</el-button>
              </el-form-item>
            </el-form>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <router-view></router-view>
  </div>

</template>


<script>
  export default {
    data () {
      return {
        msg: 'Use Vue 2.0 Today!',
        loggin_form: {
          username: '',
          password: ''
        }
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


