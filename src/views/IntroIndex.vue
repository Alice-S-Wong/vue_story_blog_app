<template>
  <div class="intro-new">
    <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div v-if="user.username" class="inner">
              <h1 class="major">Introduction Page Management</h1>
              <ul class="actions">
                <li><a href="/admin" class="button">Return to Admin Portal</a></li>
              </ul>
              <h2>Introduction Text</h2>
              <div v-for="intro in intros">
                <p v-html="intro.introduction"></p>
                <button v-on:click="toggleEdit(intro)">Open Edit Menu</button>
                <div v-if="currentIntro === intro">
                  <div class="editor">
                    <ckeditor :editor="editor" v-model="intro.introduction" :config="editorConfig"></ckeditor>
                  </div>
                  <br>
                  <button v-on:click="editAuthor(intro)">Edit Intro</button>
                </div>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  data: function() {
    return {
      user: {},
      intros: [],
      currentIntro: {},
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
    axios.get("/api/intros").then(response => {
      this.intros = response.data;
    });
  },
  methods: {
    toggleEdit: function(intro) {
      if (this.currentIntro === intro) {
        this.currentIntro = {};
      } else {
        this.currentIntro = intro;
      }
    },
    editAuthor: function(intro) {
      var params = {
        introduction: intro.introduction
      };
      axios.patch(`/api/intros/${intro.id}`, params).then(response => {
        this.currentIntro = {};
        var index = this.intros.indexOf(intro);
        this.intros.splice(index, 1, response.data);    
      });
    },
  }
};
</script>