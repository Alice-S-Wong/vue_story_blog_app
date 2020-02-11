<template>
  <div class="stories-new">
    <div v-if="user.username">
      <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">Create a Story</h1>
              <p>Title: <input type="text" v-model="newTitle"></p>
              <div class="editor">
                <ckeditor :editor="editor" v-model="newDescription" :config="editorConfig"></ckeditor>
              </div>
              <p>Release Date: <input type="date" v-model="newDate"></p>
              <button v-on:click="createStory()">Create Story</button>
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
      newTitle: "",
      newDescription: "Write description here",
      newDate: "",
      authors: [],
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
  },
  methods: {
    createStory: function() {
      var params = {
        title: this.newTitle,
        description: this.newDescription,
        release_date: this.newDate,
      };
      axios.post("/api/stories", params).then(response => {
        this.$router.push("/admin/stories");
      });
    }
  }
};
</script>