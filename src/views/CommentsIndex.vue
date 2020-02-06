<template>
  <div class="admin-portal">
    <div v-if="user.username">
      <h1>Comment Management</h1>
      <div v-for="comment in comments">
        <h2>Title: {{comment.title}}</h2>
        <p>Commenter: {{comment.name}}</p>
        <p>Date: {{comment.friendly_date}}</p>
        <p>Comment Text: {{comment.body}}</p>
        <p>Associated Post</p>
        <p>Post: {{comment.post}}</p>
        <p>Chapter Number: {{comment.chapter_number}}</p>
        <p>Story: {{comment.story}}</p>
        <button v-on:click="destroyComment(comment)">Delete Comment</button>
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
      comments: {}
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
    axios.get("/api/comments").then(response => {
      if (response.data) {
        this.comments = response.data;
      }
    });
  },
  methods: {
    destroyComment: function(comment) {
      axios.delete(`/api/comments/${comment.id}`).then(response => {
        var index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
      });
    }
  }
};
</script>