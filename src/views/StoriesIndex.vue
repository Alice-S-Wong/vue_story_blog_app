<template>
  <div class="home">
    <h1>All Stories</h1>
    <div v-for="story in stories">
      <h2>{{story.title}}</h2>
      <p>Author: {{story.author}}</p>
      <p>Description: {{story.description}}</p>
      <p>Release Date: {{story.friendly_release_date}}</p>
      <router-link v-bind:to="`/stories/${story.id}`">More details</router-link>
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
      stories: []
    };
  },
  created: function() {
    axios.get("/api/stories").then(response => {
      this.stories = response.data;
    });
  },
  methods: {}
};
</script>