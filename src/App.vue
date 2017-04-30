<style>
  body {
      margin: 40px 10px;
      padding: 0;
      font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
      font-size: 14px;
  }
  .router-link-active {
    color: white !important;
  }
</style>

<template>
  <div id="app" class="container-fluid">

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <ul class="nav navbar-nav" style="margin-left:50px;">
        <li><a href="/">Home</a></li>
        <li><router-link to="/receive-box">Receive Box</router-link></li>
        <li><router-link to="/shipping-pending">Shipping Status</router-link></li>
        <li><router-link to="/place-order">Place Order</router-link></li>
        <!-- <li><router-link to="/check-client-inventory">Transactions Records</router-link></li> -->
      </ul>
      <form class="navbar-form navbar-right" v-if="current_loggin_user != ''" style="margin-right:50px;">
        <div class="form-group active"><a href="/profile/" style="color: white; cursor: pointer;">Hi {{current_loggin_user}}!&nbsp&nbsp&nbsp</a></div>
        <button type="submit" class="btn btn-success" @click.prevent.default="onLogout">Sign Out</button>
      </form>
      <form v-else class="navbar-form navbar-right" style="margin-right:50px;">
        <div class="form-group">
          <input type="text" placeholder="User Name" name="user" class="form-control" v-model="login_form.input_username" required>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Password" name="password" class="form-control" v-model="login_form.input_password" required>
        </div>
        <button type="submit" class="btn btn-success" @click.prevent.default="onLogin">Sign in</button>
      </form>
    </nav>
    <br/>
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
      self.$http.get('/who-accessioning/').then(function(res){
        const { username, msg } = JSON.parse(res.data);
        if (msg === 'success') {
          self.current_loggin_user = username;
        }
      }, function(err){
        console.log(err)
      });
    },
    methods: {
      onLogin() {
        const self = this;
        const login_form = self.login_form;
        self.$http.post('/validate-user/', {login_form: login_form}).then(function(res){
          const { username, msg } = JSON.parse(res.data);
          console.log(username, msg, res.data)
          if (msg === 'success') {
            self.current_loggin_user = username;
          } else {
            self.$message.error('Wrong username or password.');
            self.login_form.input_username = '';
            self.login_form.input_password = '';
            return '';
          }
        }, function(err){
            console.log(err);
            self.$message.error('Wrong username or password.');
            self.login_form.input_username = '';
            self.login_form.input_password = '';
            return '';
        });
      },
      onLogout() {
        const self = this;
        self.$http.get('/logout-from-issue/').then(function(res) {
          if (res.data === 'success') {
            self.current_loggin_user = '';
          }
        })
      }
    }
  }
</script>
