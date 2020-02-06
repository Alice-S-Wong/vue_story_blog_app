import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import StoriesIndex from "../views/StoriesIndex.vue";
import StoriesShow from "../views/StoriesShow.vue";
import PostsShow from "../views/PostsShow.vue";
import AdminPortal from "../views/AdminPortal.vue";
import AuthorIndex from "../views/AuthorIndex.vue";
import AdminStoriesIndex from "../views/AdminStoriesIndex.vue";
import StoriesNew from "../views/StoriesNew.vue";
import PostsIndex from "../views/PostsIndex.vue";
import PostsNew from "../views/PostsNew.vue";
import CommentsIndex from "../views/CommentsIndex.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { 
    path: "/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/logout", 
    name: "logout", 
    component: Logout 
  },
  { 
    path: "/stories", 
    name: "stories-index", 
    component: StoriesIndex 
  },
  { 
    path: "/stories/:id", 
    name: "stories-show", 
    component: StoriesShow
  },
  { 
    path: "/posts/:id", 
    name: "posts-show", 
    component: PostsShow
  },
  { 
    path: "/admin", 
    name: "admin-portal", 
    component: AdminPortal
  },
  { 
    path: "/authors", 
    name: "author-index", 
    component: AuthorIndex
  },
  { 
    path: "/admin/stories", 
    name: "admin-stories-index", 
    component: AdminStoriesIndex
  },
  { 
    path: "/admin/stories/new", 
    name: "stories-new", 
    component: StoriesNew
  },
  { 
    path: "/admin/posts", 
    name: "posts-index", 
    component: PostsIndex
  },
  { 
    path: "/admin/posts/new", 
    name: "posts-new", 
    component: PostsNew
  },
  { 
    path: "/admin/comments", 
    name: "comments-index", 
    component: CommentsIndex
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
