<template>
  <div class="home">

    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
          <section id="main" class="wrapper">
            <div class="inner">
              <h1 class="major">Welcome to Mischief Writings</h1>
              <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
              <p>This is a place where text goes.</p>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="QEFCTRPZCTWCL" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
          </section>

      </div>

  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {}
};
</script>