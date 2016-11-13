<style>
/*  body {
    font-family: Helvetica, sans-serif;
    position: fixed;
    overflow: hidden;
    width: 100%;
  }*/
  body {
      margin: 40px 10px;
      padding: 0;
      font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
      font-size: 14px;
  }
</style>

<template>
  <div id="app" class="container-fluid">
    
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <ul class="nav navbar-nav" style="margin-left:50px;">
        <li><a href="/">Home</a></li>
        <li><router-link to="/shipping-pending">Shipping Status</router-link></li>
        <li><router-link to="/place-order">Place Order</router-link></li>
      </ul>
      <form class="navbar-form navbar-right" v-if="current_loggin_user != ''" style="margin-right:50px;">
        <div class="form-group active"><a style="color: white;">Hi {{current_loggin_user}}!&nbsp&nbsp&nbsp</a></div>
        <button type="submit" class="btn btn-success" @click="current_loggin_user=''">Sign Out</button>
      </form>
      <form v-else class="navbar-form navbar-right" style="margin-right:50px;">
        <div class="form-group">
          <input type="text" placeholder="User Name" name="user" class="form-control" v-model="login_form.input_username" required>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Password" name="password" class="form-control" v-model="login_form.input_password" required>
        </div>
        <button type="submit" class="btn btn-success" @click.prevent.default="auth_user">Sign in</button>
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
      self.$http.get('/who/').then(function(res){
        self.current_loggin_user = res.data;
      }, function(err){
        console.log(err)
      });
    },
    methods: {
      auth_user() {
        var self = this;
        let login_form = self.login_form;
        self.$http.post('/validate-user/', {login_form: login_form}).then(function(res){
          let res_data = res.data;
          if (res_data == 'success') {
            self.current_loggin_user = login_form.input_username;
            console.log("self.current_loggin_user: ", self.current_loggin_user)
            return login_form.input_username;
          } else {
            this.$message.error('Wrong username or password.');
            this.login_form.input_username = '';
            this.login_form.input_password = '';
            return '';
          }
        }, function(err){
            console.log(err);
            this.$message.error('Wrong username or password.');
            this.login_form.input_username = '';
            this.login_form.input_password = '';
            return '';
        });
      }
    }
  }
</script>


