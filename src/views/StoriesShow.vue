<template>
  <div class="home">

    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">{{story.title}}</h1>
              <ul class="alt">
                <li>Release Date: {{story.friendly_release_date}}</li>
              </ul>
              <p v-html="story.description"></p>
              <ul class="actions">
                <li><a href="/stories" class="button">Return to Stories Page</a></li>
              </ul>
              <h1 class="major">Chapters</h1>
              <div v-for="post in story.posts">
                <h2>{{post.title}}</h2>
                <ul class="alt">
                <li>Chapter Number: {{post.chapter_number}}</li>
                <li>Release Date: {{post.friendly_release_date}}</li>
                </ul>
                <ul class="actions">
                  <li><a v-bind:href="`/posts/${post.post_id}`" class="button">Read Chapter</a></li>
                </ul>
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
      story: {}
    };
  },
  created: function() {
    axios.get(`/api/stories/${this.$route.params.id}`).then(response => {
      this.story = response.data;
    });
  },
  methods: {}
};
</script>