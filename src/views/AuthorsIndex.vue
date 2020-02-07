<template>
  <div class="authors-index">
    <div v-if="user.username">
      <h1>Author Management</h1>
      <router-link to="/admin/authors/new">Create an Author</router-link> 
      <div v-for="author in authors">
        <h2>{{author.pen_name}}</h2>
        <p>{{author.bio}}</p>
        <button v-on:click="toggleEdit(author)">Open Edit Menu</button>
        <div v-if="currentAuthor === author">
          <p>Pen Name: <input v-model="author.pen_name"></p>
          <p>Bio: <textarea v-model="author.bio"></textarea></p>
          <button v-on:click="editAuthor(author)">Edit Author</button>
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
      authors: [],
      currentAuthor: {}
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
    toggleEdit: function(author) {
      if (this.currentAuthor === author) {
        this.currentAuthor = {};
      } else {
        this.currentAuthor = author;
      }
    },
    editAuthor: function(author) {
      var params = {
        pen_name: author.pen_name,
        bio: author.bio
      };
      axios.patch(`/api/authors/${author.id}`, params).then(response => {
        this.currentAuthor = {};
        var index = this.authors.indexOf(author);
        this.authors.splice(index, 1, response.data);    
      });
    },
  }
};
</script>