<template>
  <div class="home">
    <h1>About the Author</h1>
    <div v-for="author in authors">
      <h2>{{author.pen_name}}</h2>
      <p>{{author.bio}}</p>
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
      authors: []
    };
  },
  created: function() {
    axios.get("/api/authors").then(response => {
      this.authors = response.data;
    });
  },
  methods: {}
};
</script>