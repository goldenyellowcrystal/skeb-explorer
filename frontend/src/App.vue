<template>
  <v-app>
    <v-app-bar
      app
      color="teal darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center pointer" @click="goto('Home')">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://skeb.imgix.net/static/icon.svg?s=beb60eadb916f3d0f103f44578a6bf33"
          transition="scale-transition"
          width="40"
        />

        <h2 class="shrink mt-1 hidden-sm-and-down grey--text text--lighten-2"
          contain
          min-width="100"
          width="100"
        >
          Skeb Explorer
        </h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="teal--text text--darken-3"
        >
          <v-list-item>
            <v-list-item-title>
              Popular Art
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="goto('FollowedUsersPage')">
            <v-list-item-title>
              Followed Artists
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="goto('SettingsPage')">
            <v-list-item-title>
              Settings
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Roadmap
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      group: null
    }
  },
  methods: {
    goto(page) {
      this.$router.push({
        name: page
      });
    }
  },
  watch: {
    group() {
      this.drawer = false
    }
  }
};
</script>

<style>  
  .pointer {
    cursor: pointer;
  }
</style>