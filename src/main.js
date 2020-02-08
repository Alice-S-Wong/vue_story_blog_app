import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import CKEditor from '@ckeditor/ckeditor5-vue';

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.use( CKEditor );

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
