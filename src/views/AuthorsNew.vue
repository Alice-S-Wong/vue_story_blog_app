<template>
  <div class="posts-new">
    <div v-if="user.username">
      <h1>Create an Author</h1>
      <p>Pen Name: <input v-model="newPenName"></p>
      <p>Bio: <textarea v-model="newBio"></textarea></p>
      <button v-on:click="createAuthor()">Create Author</button>
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
      newPenName: "",
      newBio: "",
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
    createAuthor: function() {
      var params = {
        pen_name: this.newPenName,
        bio: this.newBio
      };
      axios.post("/api/authors", params).then(response => {
        this.$router.push("/admin/authors");
      });
    }
  }
};
</script>