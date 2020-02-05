<template>
  <div class="stories-new">
    <div v-if="user.username">
      <h1>Create a Story</h1>
      <p>Title: <input v-model="newTitle"></p>
      <p>Author: <select v-model="newAuthor">
        <option v-for="author in authors" v-bind:value="author.id">{{author.pen_name}}</option>
      </select></p>
      <p>Description: <textarea v-model="newDescription"></textarea></p>
      <p>Release Date: <input type="date" v-model="newDate"></p>
      <button v-on:click="createStory()">Create Story</button>
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
      newTitle: "",
      newAuthor: "",
      newDescription: "",
      newDate: "",
      authors: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
    axios.get("/api/authors").then(response => {
      this.authors = response.data;
    });
  },
  methods: {
    createStory: function() {
      var params = {
        title: this.newTitle,
        author_id: this.newAuthor,
        description: this.newDescription,
        release_date: this.newDate,
      };
      axios.post("/api/stories", params).then(response => {
        this.$router.push("/admin/stories");
      });
    }
  }
};
</script>