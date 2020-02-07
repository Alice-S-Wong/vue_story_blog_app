<template>
  <div class="admin-portal">
    <div v-if="user.username">
      <h1>Welcome to the Admin Portal</h1>
      <p><router-link to="/admin/stories">Manage Stories</router-link></p>
      <p><router-link to="/admin/posts">Manage Posts</router-link></p>
      <p><router-link to="/admin/comments">Manage Comments</router-link></p>
      <p><router-link to="/admin/authors">Manage Author</router-link></p>
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