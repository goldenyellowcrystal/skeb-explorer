<template>
  <div class="userpage">
    <ArtistPage v-if="isCreator" :user-info="userInfo" />
    <div v-else>
      <CommissionerPage :user-info="userInfo" />
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { BACKEND_URL, USERS_LINK } from "../constants.js";

  import ArtistPage from '@/components/ArtistPage.vue';
  import CommissionerPage from '@/components/CommissionerPage.vue';

  function initState() {
    return {
      userInfo: {},
      isCreator: false
    }
  }

  export default {
    name: 'UserPage',
    beforeRouteUpdate(to, from, next) {
      this.loadPageData(to.params.username);
      next();
    },
    components: {
      ArtistPage,
      CommissionerPage
    },
    created() {
      this.loadPageData(this.$route.params.username);
    },
    data() {
      return initState();
    },
    methods: {
      loadPageData(username) {
        axios.get(BACKEND_URL + USERS_LINK + username).then(resp => {
          this.userInfo = resp.data;
          this.isCreator = !!resp.data.creator;
        });
      }
    }
  }
</script>

<style>
  .icon {
    height: 64px;
    width: 64px;
  }
  
  .pointer {
    cursor: pointer;
  }
</style>