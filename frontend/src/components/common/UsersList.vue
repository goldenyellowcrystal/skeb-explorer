<template>
  <div class="users-list pb-12">
    <div class="text-h4 text-center pb-6">
      Commission{{ isArtist ? 'ers' : 'ed Artists' }} List
    </div>

    <v-container fluid>
      <v-row>
        <v-col class="d-flex flex-column" v-for="user in uniqueUsers" :key="user.id">
          <UserCard :user="user" />
        </v-col>
        <v-col class="d-flex flex-column">
          <LoadMore @load-more="loadMore()" :show="showLoadMore"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import UserCard from "./UserCard.vue";
  import LoadMore from "./LoadMore.vue";

  export default {
    name: 'UsersList',
    components: {
      UserCard,
      LoadMore
    },
    props: {
      uniqueUsers: Object,
      isArtist: Boolean,
      showLoadMore: Boolean
    },
    methods: {
      loadMore() {
        this.$emit("load-more");
      }
    }
  }
</script>

<style>
  .margin-auto {
    margin: auto;
  }
</style>