<template>
  <v-card
    v-if="show"
    class="flex d-flex flex-column blue pointer"
    @click="loadMore()"
    height="160"
    width="180"
    elevation="1"
    outlined>

    <!-- General Info -->
    <v-card-text class="margin-auto">
      <v-row class="justify-center text-center">
        <div>
          <div>
            <v-icon large
              color="white">
              mdi-arrow-right-circle
            </v-icon>
          </div>
          <div class="white--text">
            Load More
          </div>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'LoadMore',
    props: {
      show: Boolean
    },
    methods: {
      loadMore() {
        this.$emit("load-more");
      }
    }
  }
</script>