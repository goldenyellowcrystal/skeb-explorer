<template>
  <div class="user-comm-details">
    <UsersList
      @load-more="loadMore()"
      :show-load-more="showLoadMore"
      :unique-users="uniqueArtists"
      :is-artist="false" />
    <v-divider></v-divider>
    <ArtList
      @load-more="loadMore()"
      :show-load-more="showLoadMore"
      :image-list="imageList"
      :commissioners="artists"
      :is-artist="false" />
  </div>
</template>

<script>
  import axios from "axios";
  import { BACKEND_URL, USERS_LINK, REQ_SUBPATH } from "@/constants.js";

  import UsersList from "../common/UsersList.vue";
  import ArtList from "../common/ArtList.vue";

  function initState() {
    return {
      artists: [],
      processedWorks: 0,
      triggerClearData: true
    }
  }

  export default {
    name: 'UserCommDetails',
    props: {
      imageList: Array,
      totalReqs: Number,
      userName: String,
      loadNewPageCtr: Number
    },
    components: {
      UsersList,
      ArtList
    },
    data() {
      return initState();
    },
    methods: {
      findArtistWork(path) {
        var result = this.artists.filter(
          function (work) {
            return work.path == path;
          }
        )
        return result.length > 0
      },
      parseImageList(works) {
        works.forEach(work => {
          var url = work.path.substr(2);
          this.processedWorks += 1;
          axios.get(BACKEND_URL + USERS_LINK + url).then(resp => {
            let data = resp.data;
            work.id = new Date(data.completed_at).getTime();
            this.artists.push({
              path: work.path,
              creator: data.creator
            })
          });
        });
      },
      loadMore() {
        this.$emit("load-more");
      }
    },
    computed: {
      uniqueArtists: function() {
        let parsedArtists = {};
        this.artists.forEach(artist => {
          let data = parsedArtists[artist.creator.screen_name];
          parsedArtists[artist.creator.screen_name] = {
            is_creator: true,
            id: artist.creator.id,
            name: artist.creator.name,
            screen_name: artist.creator.screen_name,
            avatar: artist.creator.avatar_url,
            header: artist.creator.header_url,
            art_count: (!!data ? data.art_count+1 : 1)
          }
        });
        return parsedArtists;
      },
      showLoadMore() {
        return this.processedWorks > 0 && this.processedWorks < this.totalReqs
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