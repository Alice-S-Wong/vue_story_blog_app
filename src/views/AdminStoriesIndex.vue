<template>
  <div class="admin-stories-index">
    <div v-if="user.username">
      <h1>Story Management</h1>
      <router-link to="/admin/stories/new">Create a Story</router-link> 
      <div v-for="story in stories">
        <p>{{story.id}}<p>
        <h2>{{story.title}}</h2>
        <p>Author: {{story.author}}</p>
        <p>Description: {{story.description}}</p>
        <p>Release Date: {{story.friendly_release_date}}</p>
        <button v-on:click="toggleEdit(story)">Open Edit Menu</button>
        <div v-if="currentStory === story">
          <p>Title: <input v-model="story.title"></p>
          <p>Author: <select v-model="authorId">
            <option v-for="author in authors" v-bind:value="author.id">{{author.pen_name}}</option>
          </select></p>
          <p>Description: <textarea v-model="story.description"></textarea></p>
          <p>Release Date: <input type="date" v-model="story.release_date"></p>
          <button v-on:click="editStory(story)">Edit Story</button>
        </div>
      </div>
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
      stories: [],
      currentStory: {},
      authors: [],
      authorId: ""
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
    axios.get("/api/authors").then(response => {
      this.authors = response.data;
    });
  },
  methods: {
    toggleEdit: function(story) {
      if (this.currentStory === story) {
        this.currentStory = {};
      } else {
        this.currentStory = story;
      }
    },
    editStory: function(story) {
      var params = {
        title: story.title,
        author_id: this.authorId,
        description: story.description,
        release_date: story.release_date
      };
      axios.patch(`/api/stories/${story.id}`, params).then(response => {
        this.currentStory = {};
        var index = this.stories.indexOf(story);
        this.stories.splice(index, 1, response.data);    
      });
    }
  }
};
</script>