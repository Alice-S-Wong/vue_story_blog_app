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
              <p>{{post.body}}</p>
              <h1 class="major">Comments</h1>
              <form v-on:submit.prevent="createComment()">
                    <div class="row gtr-uniform">
                      <div class="col-12">
                        <input type="text" v-model="newName" placeholder="Name" />
                      </div>
                      <div class="col-12">
                        <input type="text" v-model="newTitle" placeholder="Title" />
                      </div>
                      <div class="col-12">
                        <textarea v-model="newBody" placeholder="Enter your comment" rows="6"></textarea>
                      </div>
                      <div class="col-12">
                        <ul class="actions">
                          <li><input type="submit" value="Leave Comment" class="button" /></li>
                        </ul>
                      </div>
                    </div>
                  </form>
              <div v-for="comment in comments">
                <h2>{{comment.title}}</h2>
                <ul class="alt">
                  <li>{{comment.name}}</li>
                  <li>Date: {{comment.friendly_date}}</li>
                </ul>
                <p>{{comment.body}}</p>
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
export default {
  data: function() {
    return {
      post: {},
      comments: [],
      newName: "",
      newTitle: "",
      newBody: ""
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
      });
    }
  }
};
</script>