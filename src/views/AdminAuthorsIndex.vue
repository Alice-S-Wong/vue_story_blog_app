<template>
  <div class="admin-authors-index">
    <div v-if="user.username">

      <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">Author Management</h1>
              <ul class="actions">
                <li><a href="/admin" class="button">Return to Admin Portal</a></li>
              </ul>
              <div v-for="author in authors">
                <h2>{{author.pen_name}}</h2>
                <p v-html="author.bio"></p>
                <button v-on:click="toggleEdit(author)">Open Edit Menu</button>
                <div v-if="currentAuthor === author">
                  <p>Pen Name: <input type="text" v-model="author.pen_name"></p>
                  <div class="editor">
                    <ckeditor :editor="editor" v-model="author.bio" :config="editorConfig"></ckeditor>
                  </div>
                  <button v-on:click="editAuthor(author)">Edit Author</button>
                </div>
              </div>
            </div>
          </section>

      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  data: function() {
    return {
      user: {},
      authors: [],
      currentAuthor: {},
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      }
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