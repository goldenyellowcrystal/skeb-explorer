<template>
  <v-btn v-if="!isWatched"
    small
    color="primary"
    elevation="2"
    class="ms-2"
    @click="watchClicked"
  >
    <v-icon left>
      mdi-eye-plus
    </v-icon>
    Watch
  </v-btn>

  <v-btn v-else
    small
    color="negative"
    elevation="2"
    class="ms-2"
    @click="unwatchClicked"
  >
    <v-icon left>
      mdi-eye-minus
    </v-icon>
    Unwatch
  </v-btn>
</template>

<script>
  export default {
    name: 'WatchButton',
    methods: {
      watchClicked() {
        this.$emit('watch-clicked');
      },
      unwatchClicked() {
        this.$emit('unwatch-clicked');
      }
    },
    props: {
      isWatched: Boolean
    }
  }
</script>