<template>
  <div class="art-piece">
    <template v-if="!!artDetails.id">
      ID: {{ artDetails.id }} <br />
      Path: {{ artDetails.path }} <br />
      Thumbnail Src: {{ artDetails.thumbnail_image_urls.src }} <br />
      Genre: {{ artDetails.genre }} <br />
      Is NSFW: {{ artDetails.nsfw }} <br />
      Is Hardcore: {{ artDetails.hardcore }} <br />
      Censored Thumbnail Src: {{ artDetails.consored_thumbnail_image_urls.src }} <br />
      <template v-if="!!artDetails.client">
        Client Name: {{ artDetails.client.name }} <br />
        Client Screen Name: {{ artDetails.client.screen_name }} <br />
        Client Avatar URL: {{ artDetails.client.avatar_url }}
      </template>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'ArtPiece',
    props: {
      artDetails: Object
    }
  }
</script>

<style scoped>
  .art-piece {
    border: 1px solid black
  }
</style>