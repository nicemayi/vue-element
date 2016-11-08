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
          <router-link to="/">
            <el-menu-item index="1">
              Home
            </el-menu-item>
          </router-link>
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
        <el-col :span="7" v-if="current_loggin_user == ''">
          <el-menu-item index="4" style="margin-top: 11px;" align="center">
            <el-form :inline="true" v-model="login_form">
              <el-form-item>
                <el-input size="large" placeholder="Username" v-model="login_form.input_username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input size="large" placeholder="Password" type="password" v-model="login_form.input_password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" @click="auth_user">Login</el-button>
              </el-form-item>
            </el-form>
          </el-menu-item>
        </el-col>
        <el-col :span="3" v-else>
          <el-menu-item index="4" style="margin-top: 11px;" align="center">
            <el-form :inline="true">
              <el-form-item>
                Hi {{current_loggin_user}}!
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" @click="current_loggin_user=''">Logout</el-button>
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
        current_loggin_user: '',

        login_form: {
          input_username: '',
          input_password: ''
        },
      }
    },
    beforeMount: function() {
      var self = this;
      self.$http.get('/who/').then(function(res){
        console.log(res.data);
        let res_data = res.data;
        if (res_data != '') {
          self.current_loggin_user = res_data;
          console.log(self.current_loggin_user);
        }
      }, function(err){
        console.log(err)
      });
    },
    methods: {
      auth_user() {
        var self = this;
        self.$http.post('/validate-user/', {login_form}).then(function(res){
          let res_data = res.data;
          if (res_data == 'success') {
            self.current_loggin_user = login_form.input_username;
          }
        }, function(err){
          console.log(err)
        });
      }
    }
  }
</script>


