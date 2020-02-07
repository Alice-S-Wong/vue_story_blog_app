<template>
  <div id="app">
      <header id="header">
        <a href="index.html" class="title">Mischief Writings</a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/stories">Stories</a></li>
            <li><a href="/authors">About the Author</a></li>
            <li><a href="/login">Admin Login</a></li>
            <li><a href="/logout">Admin Logout</a></li>
            <li><a href="/admin">Admin Portal</a></li>
          </ul>
        </nav>
      </header>

      <router-view/>

    <!-- Footer -->
      <footer id="footer" class="wrapper alt">
        <div class="inner">
          <ul class="menu">
            <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </footer>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
  },
  methods: {}
};
</script>