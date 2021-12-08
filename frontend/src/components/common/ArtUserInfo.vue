<template>
  <v-container>
    <v-row class="pointer"
      @click="linkToPage(user.screen_name)">
      <v-col class="pa-0" :cols="3">
        <v-avatar size="36">
          <img :src="user.avatar_url" :alt="user.screen_name + ' icon'" />
        </v-avatar>
      </v-col>
      <v-col class="pa-0 d-block" :cols="9">
        <div class="font-weight-bold text-no-wrap text-truncate">
          {{ user.name }}
        </div>
        <div class="text-caption text-no-wrap text-truncate">
          {{ !!user.creator ? 'Artist' : 'Commissioner' }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ArtUserInfo',
    props: {
      user: Object
    },
    methods: {
      linkToPage: function(screenName) {
        if (window.localStorage.getItem('show-in-new-tab') == 'false') {
          this.$router.push({
            name: 'UserPage',
            params: {
              username: screenName
          }});
        } else {
          let routeData = this.$router.resolve({
            name: 'UserPage',
            params: {
              username: screenName
          }});
          window.open(routeData.href, '_blank');
        }
      }
    }
  }
</script>

<style>
  .commissioner-name {
    /* https://stackoverflow.com/a/30337865 */
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
  }
</style>