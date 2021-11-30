<template>
  <div class="commissioner-page">
    <UserSummary :user-info="summary" />
    <hr />
    <UserCommDetails 
      :image-list="commissionedWorks"
      :total-reqs="summary.commissionedCnt"
      :user-name="summary.userName"
      :load-new-page-ctr="loadNewPageCtr"
      @load-more="loadMore()" />
  </div>
</template>

<script>
  import axios from "axios";
  import { BACKEND_URL, USERS_LINK, REQ_SUBPATH } from "../constants.js";

  import UserSummary from "./commissioner/UserSummary.vue";
  import UserCommDetails from "./commissioner/UserCommDetails.vue";

  function initState() {
    return {
      summary: {
        userIcon: "",
        userHeader: "",
        userName: "",
        screenName: "",
        lang: "",
        commissionedCnt: 0
      },
      commissionedWorks: [],
      loadNewPageCtr: 1,
      fromLoadMore: false
    }
  }

  export default {
    name: 'CommissionerPage',
    props: {
      userInfo: Object
    },
    components: {
      UserSummary,
      UserCommDetails
    },
    data: function() {
      return initState();
    },
    methods: {
      parseUserDetails(userInfo) {
        this.summary.userIcon = userInfo.avatar_url;
        this.summary.userHeader = userInfo.avatar_url;
        this.summary.userName = userInfo.name;
        this.summary.screenName = userInfo.screen_name;
        this.summary.lang = userInfo.language;
        this.summary.commissionedCnt = userInfo.sent_public_works_count;

        this.commissionedWorks = userInfo.sent_works;
      },
      loadMore() {
        let worksUrl = BACKEND_URL + USERS_LINK + this.summary.screenName + REQ_SUBPATH + this.loadNewPageCtr;
        axios.get(worksUrl).then(resp => {
          this.fromLoadMore = true;
          this.commissionedWorks.push.apply(this.commissionedWorks, resp.data);
          this.loadNewPageCtr += 1;
        });
      }
    },
    watch: {
      userInfo: {
        deep: true,
        immediate: true,
        handler: function(newVal, oldVal) {
          if (oldVal && !newVal) {
            Object.assign(this.$data, initState());
            this.parseUserDetails(oldVal);
          } else if (newVal) {
            if (!this.fromLoadMore) {
              Object.assign(this.$data, initState());
              this.parseUserDetails(newVal);
            }
            this.fromLoadMore = false;
          }
        }
      }
    }
  }
</script>