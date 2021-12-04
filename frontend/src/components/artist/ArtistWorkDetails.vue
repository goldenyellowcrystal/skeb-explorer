<template>
  <div class="artist-work-details">
    <UsersList
      @load-more="loadMore()"
      :show-load-more="showLoadMore"
      :unique-users="uniqueCommissioners"
      :is-artist="true" />
    <hr />
    <ArtList
      @load-more="loadMore()"
      :show-load-more="showLoadMore"
      :image-list="imageList"
      :commissioners="commissioners"
      :is-artist="true" />
  </div>
</template>

<script>
  import axios from "axios";
  import { BACKEND_URL, USERS_LINK, WORKS_SUBPATH } from "@/constants.js";

  import UsersList from "../common/UsersList.vue";
  import ArtList from "../common/ArtList.vue";

  function initState() {
    return {
      commissioners: [],
      processedWorks: 0,
      triggerClearData: true
    }
  }

  export default {
    name: 'ArtistWorkDetails',
    components: {
      UsersList,
      ArtList
    },
    props: {
      imageList: Array,
      totalWorks: Number,
      artistName: String,
      loadNewPageCtr: Number
    },
    data() {
      return initState();
    },
    methods: {
      findCommissionerWork(path) {
        var result = this.commissioners.filter(
          function (commWork) {
            return commWork.path == path;
          }
        )
        return result.length > 0
      },
      parseImageList(works) {
        works.forEach(work => {
          work.id = work.path.split("/")[3];
          this.processedWorks += 1;
          if (work.genre == 'art' && !work.private) {
            var url = work.path.substr(2);
            axios.get(BACKEND_URL + USERS_LINK + url).then(resp => {
              let data = resp.data;
              if (!data.anonymous && !this.findCommissionerWork(data.path)) {
                this.commissioners.push({
                  path: data.path,
                  client: data.client
                });
              }
            });
          }
        });
      },
      loadMore() {
        this.$emit("load-more");
      }
    },
    computed: {
      uniqueCommissioners: function() {
        let parsedCommissioners = {};
        this.commissioners.forEach(commissioner => {
          let data = parsedCommissioners[commissioner.client.screen_name];
          parsedCommissioners[commissioner.client.screen_name] = {
            is_creator: false,
            id: commissioner.client.id,
            creator: commissioner.client.creator,
            name: commissioner.client.name,
            screen_name: commissioner.client.screen_name,
            avatar: commissioner.client.avatar_url,
            header: commissioner.client.header_url,
            art_count: (!!data ? data.art_count+1 : 1)
          }
        })
        return parsedCommissioners;
      },
      showLoadMore() {
        return this.processedWorks > 0 && this.processedWorks < this.totalWorks
      }
    },
    watch: {
      loadNewPageCtr: {
        immediate: true,
        handler: function(newVal, oldVal) {
          if (oldVal != undefined && newVal == oldVal + 1) {
            this.triggerClearData = false;
          }
        }
      },
      imageList: {
        deep: true,
        immediate: true,
        handler: function(newVal, oldVal) {
          if (oldVal && !newVal) {
            Object.assign(this.$data, initState());
            this.parseImageList(oldVal);
          } else if (newVal) {
            if (this.triggerClearData) {
              Object.assign(this.$data, initState());
            } else {
              this.processedWorks = 0;              
            }
            this.parseImageList(newVal);
            this.triggerClearData = true;
          }
        }
      }
    }
  }
</script>