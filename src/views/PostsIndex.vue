<template>
  <div class="posts-index">

    <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div v-if="user.username" class="inner">
              <h1 class="major">Post Management</h1>
              <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
              <ul class="actions">
                <li><a href="/admin" class="button">Return to Admin Portal</a></li>
                <li><a href="/admin/posts/new" class="button">Create a Post</a></li>
              </ul>
              <p>Search posts by story name:<input type="text" v-model="searchTerm" list="titles"></p>
              <datalist id="titles">
                <option v-for="story in stories">{{ story.title }}</option>
              </datalist>
              <div v-for="post in filterBy(posts, searchTerm, 'story_title')">
                <h2>{{post.title}}</h2>
                <ul class="alt">
                  <li>Chapter Number: {{post.chapter_number}}</li>
                  <li>Release Date: {{post.friendly_release_date}}</li>
                  <li>Story: {{post.story_title}}</li>
                </ul>
                <button v-on:click="toggleBody(post)">View Post Text</button>
                <div v-if="currentPostBody === post">
                  <p v-html="post.body"></p>
                </div>
                <br>
                <button v-on:click="toggleEdit(post)">Open Edit Menu</button>
                <div v-if="currentPost === post">
                  <p>Title: <input type="text" v-model="post.title"></p>
                  <p>Chapter Number: <input type="text" v-model="post.chapter_number"></p>
                  <p>Story: <select v-model="storyId">
                    <option v-for="story in stories" v-bind:value="story.id">{{story.title}}</option>
                  </select></p>
                  <p>Release Date: <input type="date" v-model="post.release_date"></p>
                  <div class="col-12">
                    <p>Post Text:</p>
                    <div class="editor">
                    <ckeditor :editor="editor" v-model="post.body" :config="editorConfig"></ckeditor>
                    </div>
                  </div>
                  <button v-on:click="editPost(post)">Edit Post</button>
                </div>
                <p><button v-on:click="destroyPost(post)">Delete Post</button></p>
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
      posts: [],
      currentPost: {},
      currentPostBody: {},
      storyId: "",
      stories: [],
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
    toggleBody: function(post) {
      if (this.currentPostBody === post) {
        this.currentPostBody = {};
      } else {
        this.currentPostBody = post;
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