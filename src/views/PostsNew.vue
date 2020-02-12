<template>
  <div class="posts-new">
    <div v-if="user.username">

      <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">Create a Post</h1>
              <ul class="actions">
                <li><a href="/admin/posts" class="button">Return to Post Management</a></li>
              </ul>
              <p>Title: <input type="text" v-model="newTitle"></p>
              <p>Chapter Number: <input type="text" v-model="newChapterNumber"></p>
              <p>Story: <select v-model="newStory">
                <option v-for="story in stories" v-bind:value="story.id">{{story.title}}</option>
              </select></p>
              <div class="editor">
                <ckeditor :editor="editor" v-model="newBody" :config="editorConfig"></ckeditor>
              </div>
              <p>Release Date: <input type="date" v-model="newDate"></p>
              <button v-on:click="createPost()">Create Post</button>
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
      newStory: "",
      newBody: "Story text goes here",
      newDate: "",
      newChapterNumber: "",
      stories: [],
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