<template>
  <div class="admin-portal">

    <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div v-if="user.username" class="inner">
              <h1 class="major">Comment Management</h1>
              <ul class="actions">
                <li><a href="/admin" class="button">Return to Admin Portal</a></li>
              </ul>
              <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
              <p>Search comments by title:<input type="text" v-model="searchTerm"></p>
              <div v-for="comment in filterBy(comments, searchTerm, 'title')">
                <h2>{{comment.title}}</h2>
                <ul class="alt">
                  <li>Commenter: {{comment.name}}</li>
                  <li>Date: {{comment.friendly_date}}</li>
                  <li v-html="comment.body"></li>
                  <li><h3>Associated Post</h3></li>
                  <li>Post: {{comment.post}}</li>
                  <li>Chapter Number: {{comment.chapter_number}}</li>
                  <li>Story: {{comment.story}}</li>
                </ul>
                <button v-on:click="destroyComment(comment)">Delete Comment</button>
              </div>
            </div>
          </section>

      </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from 'vue2-filters';
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: {},
      comments: {},
      searchTerm: "",
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