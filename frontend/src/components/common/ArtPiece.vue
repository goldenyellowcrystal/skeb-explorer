<template>
  <div class="art-piece">
    <v-card class="flex d-flex flex-column"
      v-if="!!artDetails.id"
      height="100%"
      width="200"
      elevation="1"
      outlined>

      <v-img :src="artDetails.thumbnail_image_urls.src"
        class="pointer"
        @click="gotoWorkPage()" />

      <v-card-text class="pa-3">
        <ArtUserInfo :user="!!artDetails.creator ? artDetails.creator : artDetails.client" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import ArtUserInfo from "./ArtUserInfo.vue";

  export default {
    name: 'ArtPiece',
    props: {
      artDetails: Object
    },
    components: {
      ArtUserInfo
    },
    methods: {
      gotoWorkPage: function() {
        console.log(this.artDetails.path)
        window.open('https://skeb.jp' + this.artDetails.path, '_blank');
      }
    }
  }
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>

<!--
  ART DETAILS PROPERTIES:
  ID: {{ artDetails.id }}
  Path: {{ artDetails.path }}
  Thumbnail Src: {{ artDetails.thumbnail_image_urls.src }}
  Genre: {{ artDetails.genre }}
  Is NSFW: {{ artDetails.nsfw }}
  Is Hardcore: {{ artDetails.hardcore }}
  Censored Thumbnail Src: {{ artDetails.consored_thumbnail_image_urls.src }}
  Client Name: {{ artDetails.client.name }}
  Client Screen Name: {{ artDetails.client.screen_name }}
  Client Avatar URL: {{ artDetails.client.avatar_url }}
-->