<template>
  <div class="artist-page">
    <ArtistSummary :artist-summary-info="summary" />
    <hr/>
    <ArtistWorkDetails
      :image-list="receivedWorks"
      :total-works="summary.receivedWorksCount"
      :artist-name="summary.screenName"
      :load-new-page-ctr="loadNewPageCtr"
      @load-more="loadMore()" />
    <hr/>
  </div>
</template>

<script>
  import axios from "axios";
  import { BACKEND_URL, USERS_LINK, WORKS_SUBPATH } from "../constants.js";

  import ArtistSummary from "./artist/ArtistSummary.vue";
  import ArtistWorkDetails from "./artist/ArtistWorkDetails.vue";

  function initState() {
    return {
      summary: {
        artistIcon: "",
        artistHeader: "",
        artistName: "",
        screenName: "",
        lang: "",
        commsOpen: false,
        suggestedPrice: 0,
        completeRate: 0,
        allowPrivate: false,
        allowNsfw: false,
        receivedWorksCount: 0
      },
      receivedWorks: [],
      loadNewPageCtr: 1,
      fromLoadMore: false
    }
  }

  export default {
    name: 'ArtistPage',
    props: {
      userInfo: Object
    },
    components: {
      ArtistSummary,
      ArtistWorkDetails
    },
    data: function() {
      return initState();
    },
    methods: {
      parseArtistDetails(data) {
        this.summary.artistIcon = data.avatar_url;
        this.summary.artistHeader = data.header_url;
        this.summary.artistName = data.name;
        this.summary.screenName = data.screen_name;
        this.summary.lang = data.language;
        this.summary.commsOpen = data.acceptable;
        this.summary.suggestedPrice = 0;
        this.summary.completeRate = (data.complete_rate * 100) + "%";
        this.summary.allowPrivate = data.private_acceptable;
        this.summary.allowNsfw = data.nsfw_acceptable;
        this.summary.receivedWorksCount = data.received_works_count;
        this.parseCommissionRate(data.skills);
        
        this.receivedWorks = data.received_works;
      },
      parseCommissionRate(skills) {
        let artSkill = skills.find(el => el.genre == "art");
        this.summary.suggestedPrice = artSkill.default_amount;
      },
      loadMore() {
        let worksUrl = BACKEND_URL + USERS_LINK + this.summary.screenName + WORKS_SUBPATH + this.loadNewPageCtr;
        axios.get(worksUrl).then(resp => {
          this.fromLoadMore = true;
          this.receivedWorks.push.apply(this.receivedWorks, resp.data);
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
            this.parseArtistDetails(oldVal);
          } else if (newVal) {
            if (!this.fromLoadMore) {
              Object.assign(this.$data, initState());
              this.parseArtistDetails(newVal);
            }
            this.fromLoadMore = false;
          }
        }
      }
    }
  }
</script>