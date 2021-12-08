import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import UserPage from '../views/UserPage.vue'
import FollowedUsersPage from '../views/FollowedUsersPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:username',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/followed-users',
    name: 'FollowedUsersPage',
    component: FollowedUsersPage
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
