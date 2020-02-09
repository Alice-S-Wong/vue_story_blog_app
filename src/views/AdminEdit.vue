<template>
  <div class="admin-edit">
    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div v-if="user.username" class="inner">
              <h1 class="major">Edit Admin Name, Email, Password</h1>
              <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
              <p>All fields may be left blank if you do not wish to change them except password and password confirmation. You must either enter your existing password to keep the same password or enter a new password.</p>
              <form v-on:submit.prevent="editAdmin()">
                    <div class="row gtr-uniform">
                      <div class="col-12">
                        <input type="text" v-model="user.username">
                      </div>
                      <div class="col-12">
                        <input type="email" v-model="user.email">
                      </div>
                      <div class="col-12">
                        <p>Password</p>
                        <input type="password" class="form-control" v-model="password">
                      </div>
                      <div class="col-12">
                        <p>Password Confirmation</p>
                        <input type="password" class="form-control" v-model="passwordConfirmation">
                      </div>
                      <div class="col-12">
                        <ul class="actions">
                          <li><input type="submit" value="Update Admin" class="button" /></li>
                        </ul>
                      </div>
                    </div>
              </form>
            </div>
          </section>

      </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      password: "",
      passwordConfirmation: ""
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
  },
  methods: {
    editAdmin: function() {
      var params = {
        name: this.user.username,
        email: this.user.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      };
      axios.patch(`/api/users/${this.user.id}`, params).then(response => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>