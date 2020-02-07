<template>
  <div class="home">

    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">About the Author</h1>
              <div v-for="author in authors">
                <h2>{{author.pen_name}}</h2>
                <p>{{author.bio}}</p>
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
      authors: []
    };
  },
  created: function() {
    axios.get("/api/authors").then(response => {
      this.authors = response.data;
    });
  },
  methods: {}
};
</script>