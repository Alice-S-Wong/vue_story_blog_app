<template>
  <div class="admin-stories-index">

    <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div v-if="user.username" class="inner">
              <h1 class="major">Story Management</h1>
              <ul class="actions">
                <li><a href="/admin" class="button">Return to Admin Portal</a></li>
                <li><a href="/admin/stories/new" class="button">Create a Story</a></li>
              </ul>
              <p>Search for story:<input type="text" v-model="searchTerm" list="titles"></p>
              <datalist id="titles">
                <option v-for="story in stories">{{ story.title }}</option>
              </datalist>
              <div v-for="story in filterBy(stories, searchTerm, 'title')">
                <h2>{{story.title}}</h2>
                <ul class="alt">
                  <li>Release Date: {{story.friendly_release_date}}</li>
                </ul>
                <p v-html="story.description"></p>
                <button v-on:click="toggleEdit(story)">Open Edit Menu</button>
                <div v-if="currentStory === story">
                  <p>Title: <input type="text" v-model="story.title"></p>
                  <p>Release Date: <input type="date" v-model="story.release_date"></p>
                  <div class="col-12">
                    <p>Description:</p>
                    <div class="editor">
                    <ckeditor :editor="editor" v-model="story.description" :config="editorConfig"></ckeditor>
                    </div>
                  </div>
                  <br>
                  <button v-on:click="editStory(story)">Edit Story</button>
                </div>
                <p><button v-on:click="destroyStory(story)">Delete Story</button></p>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: {},
      stories: [],
      currentStory: {},
      searchTerm: "",
      editor: ClassicEditor,
      newBody: '<p>Enter Comment Here.</p>',
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
        description: story.description,
        release_date: story.release_date
      };
      axios.patch(`/api/stories/${story.id}`, params).then(response => {
        this.currentStory = {};
        var index = this.stories.indexOf(story);
        this.stories.splice(index, 1, response.data);    
      });
    },
    destroyStory: function(story) {
      if (confirm("Do you really want to delete this story? This will delete all associated posts and comments.")) {
        console.log("destroying story");
      }
    }
  }
};
</script>