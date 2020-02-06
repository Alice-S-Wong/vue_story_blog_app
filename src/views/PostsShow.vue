<template>
  <div class="home">
    <h1>{{post.title}}</h1>
    <p>Chapter Number: {{post.chapter_number}}</p>
    <p>Release Date: {{post.friendly_release_date}}</p>
    <p>{{post.body}}</p>
    <h2>Leave a Comment</h2>
    <div>
      <p>Name: <input v-model="newName"></p>
      <p>Title: <input v-model="newTitle"></p>
      <p>Comment: <input v-model="newBody"></p>
      <button v-on:click="createComment()">Leave Comment</button>
    </div>
    <div v-for="comment in comments">
      <h2>{{comment.title}}</h2>
      <p>{{comment.name}}</p>
      <p>Date: {{comment.friendly_date}}</p>
      <p>{{comment.body}}</p>
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
      post: {},
      comments: [],
      newName: "",
      newTitle: "",
      newBody: ""
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then(response => {
      this.post = response.data;
      this.comments = this.post.comments;
    });
  },
  methods: {
    createComment: function() {
      var params = {
        name: this.newName,
        title: this.newTitle,
        body: this.newBody,
        post_id: this.$route.params.id
      };
      axios.post("/api/comments", params).then(response => {
        this.comments.push(params);
        this.newName = "";
        this.newTitle = "";
        this.newBody = "";
      });
    }
  }
};
</script>