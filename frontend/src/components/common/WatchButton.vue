<template>
  <v-btn
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
</template>

<script>
  export default {
    name: 'WatchButton',
    methods: {
      watchClicked() {
        this.$emit('watch-clicked');
      }
    }
  }
</script>