<template>
  <div class="home">

    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">{{post.title}}</h1>
              <ul class="alt">
                <li>Chapter Number: {{post.chapter_number}}</li>
                <li>Release Date: {{post.friendly_release_date}}</li>
              </ul>
              <p v-html="post.body"></p>
              <ul class="actions">
                <li><a v-bind:href="`/stories/${post.story_id}`" class="button">Return to Story Page</a></li>
              </ul>
              <h1 class="major">Leave a Comment</h1>
              <div v-for="error in errors">
                {{error}}
              </div>
              <form v-on:submit.prevent="createComment()">
                    <div class="row gtr-uniform">
                      <div class="col-12">
                        <input type="text" v-model="newName" placeholder="Name" />
                      </div>
                      <div class="col-12">
                        <input type="text" v-model="newTitle" placeholder="Title" />
                      </div>
                      <div class="col-12">
                        <div class="editor">
                        <ckeditor :editor="editor" v-model="newBody" :config="editorConfig"></ckeditor>
                        </div>
                      </div>
                      <div class="col-12">
                        <ul class="actions">
                          <li><input type="submit" value="Leave Comment" class="button" /></li>
                        </ul>
                      </div>
                    </div>
                  </form>
              <h1 class="major">Comments</h1>
              <div v-for="comment in comments">
                <h2>{{comment.title}}</h2>
                <ul class="alt">
                  <li>{{comment.name}}</li>
                  <li>Date: {{comment.friendly_date}}</li>
                </ul>
                <p v-html="comment.body"></p>
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
      post: {},
      comments: [],
      newName: "",
      newTitle: "",
      errors: [],
      editor: ClassicEditor,
      newBody: '<p>Enter Comment Here.</p>',
      editorConfig: {
         toolbar: []
      }
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
        this.comments.push(response.data);
        this.newName = "";
        this.newTitle = "";
        this.newBody = "";
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>