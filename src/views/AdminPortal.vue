<template>
  <div class="admin-portal">
    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div v-if="user.username" class="inner">
              <h1 class="major">Welcome to the Admin Portal</h1>
              <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
              <ul class="actions">
                <li><a href="/admin/stories" class="button">Manage Stories</a></li>
                <li><a href="/admin/posts" class="button">Manage Posts</a></li>
                <li><a href="/admin/comments" class="button">Manage Comments</a></li>
                <li><a href="/admin/authors" class="button">Manage Author</a></li>
              </ul>
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
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      if (response.data) {
        this.user = response.data;
      }
    });
  },
  methods: {}
};
</script>