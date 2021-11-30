<template>
  <v-card
    class="flex d-flex flex-column"
    height="100%"
    width="180"
    elevation="1"
    outlined
    @click="linkToPage(user.screen_name)">

    <!-- Profile Image -->
    <v-card-title class="justify-center">
      <v-avatar size="72">
        <img :src="user.avatar" :alt="user.screen_name + ' icon'" />
      </v-avatar>
    </v-card-title>

    <!-- General Info -->
    <v-card-text>
      <v-row class="justify-center text-center">
        <div class="font-weight-bold ms-1">
          {{ user.name }}
        </div>
      </v-row>
      <v-row class="justify-center text-center">
        <div class="text-caption">
          {{ user.art_count }} commission{{ user.is_creator ? 's' : 'ed' }}
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'UserCard',
    props: {
      user: Object
    },
    methods: {
      linkToPage: function(screenName) {
        this.$router.push({
          name: 'UserPage',
          params: {
            username: screenName
        }});
      }
    }
  }
</script>