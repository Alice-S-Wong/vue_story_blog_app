<template>
  <div class="home">
    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">All Stories</h1>
              <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
              <div v-for="story in stories">
                <h2>{{story.title}}</h2>
                <ul class="alt">
                  <li>Author: {{story.author}}</li>
                  <li>Description: {{story.description}}</li>
                  <li>Release Date: {{story.friendly_release_date}}</li>
                  <li><ul class="actions">
                  <li><a v-bind:href="`/stories/${story.id}`" class="button">More Info</a></li>
                </ul></li>
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
      stories: []
    };
  },
  created: function() {
    axios.get("/api/stories").then(response => {
      this.stories = response.data;
    });
  },
  methods: {}
};
</script>