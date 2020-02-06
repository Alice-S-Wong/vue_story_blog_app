<template>
  <div class="home">
    <h1>{{story.title}}</h1>
    <p>Author: {{story.author}}</p>
    <p>Description: {{story.description}}</p>
    <p>Release Date: {{story.friendly_release_date}}</p>
    <h2>Chapters</h2>
    <div v-for="post in story.posts">
      <h3>{{post.title}}</h3>
      <p>Chapter Number: {{post.chapter_number}}</p>
      <p>Release Date: {{post.friendly_release_date}}</p>
      <router-link v-bind:to="`/posts/${post.post_id}`">Read Chapter</router-link>
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
      story: {}
    };
  },
  created: function() {
    axios.get(`/api/stories/${this.$route.params.id}`).then(response => {
      this.story = response.data;
    });
  },
  methods: {}
};
</script>