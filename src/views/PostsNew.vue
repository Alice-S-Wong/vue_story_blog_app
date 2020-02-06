<template>
  <div class="posts-new">
    <div v-if="user.username">
      <h1>Create a Post</h1>
      <p>Title: <input v-model="newTitle"></p>
      <p>Chapter Number: <input v-model="newChapterNumber"></p>
      <p>Story: <select v-model="newStory">
        <option v-for="story in stories" v-bind:value="story.id">{{story.title}}</option>
      </select></p>
      <p>Chapter Text: <textarea v-model="newBody"></textarea></p>
      <p>Release Date: <input type="date" v-model="newDate"></p>
      <button v-on:click="createPost()">Create Post</button>
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
      newStory: "",
      newBody: "",
      newDate: "",
      newChapterNumber: "",
      stories: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
    axios.get("/api/stories/admin").then(response => {
      this.stories = response.data;
    });
  },
  methods: {
    createPost: function() {
      var params = {
        title: this.newTitle,
        story_id: this.newStory,
        body: this.newBody,
        release_date: this.newDate,
        chapter_number: this.newChapterNumber
      };
      axios.post("/api/posts", params).then(response => {
        this.$router.push("/admin/posts");
      });
    }
  }
};
</script>