<template>
  <div class="posts-index">
    <div v-if="user.username">
      <h1>Post Management</h1>
      <router-link to="/admin/posts/new">Create a Post</router-link> 
      <div v-for="post in posts">
        <h2>{{post.title}}</h2>
        <p>Chapter Number: {{post.chapter_number}}</p>
        <p>Release Date: {{post.friendly_release_date}}</p>
        <p>Story: {{post.story_title}}</p>
        <button v-on:click="toggleEdit(post)">Open Edit Menu</button>
        <div v-if="currentPost === post">
          <p>Title: <input v-model="post.title"></p>
          <p>Chapter Number: <input v-model="post.chapter_number"></p>
          <p>Story: <select v-model="storyId">
            <option v-for="story in stories" v-bind:value="story.id">{{story.title}}</option>
          </select></p>
          <p>Chapter Text: <textarea v-model="post.body"></textarea></p>
          <p>Release Date: <input type="date" v-model="post.release_date"></p>
          <button v-on:click="editPost(post)">Edit Post</button>
        </div>
        <p><button v-on:click="destroyPost(post)">Delete Post</button></p>
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
      posts: [],
      currentPost: {},
      storyId: "",
      stories: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
    axios.get("/api/posts").then(response => {
      if (response.data) {
        this.posts = response.data;
      }
    });
    axios.get("/api/stories/admin").then(response => {
      if (response.data) {
        this.stories = response.data;
      }
    });
  },
  methods: {
    toggleEdit: function(post) {
      if (this.currentPost === post) {
        this.currentPost = {};
      } else {
        this.currentPost = post;
      }
    },
    editPost: function(post) {
      var params = {
        title: post.title,
        chapter_number: post.chapter_number,
        story_id: this.storyId,
        body: post.body,
        release_date: post.release_date
      };
      axios.patch(`/api/posts/${post.id}`, params).then(response => {
        this.currentPost = {};
        var index = this.posts.indexOf(post);
        console.log(response.data);
        this.posts.splice(index, 1, response.data);    
      });
    },
    destroyPost: function(post) {
      if (confirm("Do you really want to delete this post? This will delete all associated comments.")) {
        console.log("destroying post");
      }
    }
  }
};
</script>