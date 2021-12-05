<template>
  <div class="art-list">
    <div class="text-h4 text-center py-6">
     {{ isArtist ? 'Created Works' : 'Commissioned Art' }}
    </div>
    <v-container fluid>
      <v-row>
        <v-col class="d-flex flex-column" v-for="image in imageListWithCommissioners" :key="image.id">
          <ArtPiece :art-details="image" />
        </v-col>
        <v-col class="d-flex flex-column">
          <LoadMore @load-more="loadMore()" :show="showLoadMore"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  var _ = require('lodash');

  import ArtPiece from "./ArtPiece.vue";
  import LoadMore from "./LoadMore.vue";

  export default {
    name: 'ArtList',
    components: {
      ArtPiece,
      LoadMore
    },
    props: {
      imageList: Array,
      commissioners: Array,
      isArtist: Boolean,
      showLoadMore: Boolean
    },
    methods: {
      findImage(path) {
        return this.imageList.filter(
          function (image) {
            return image.path == path;
          }
        )
      },
      loadMore() {
        this.$emit("load-more");
      }
    },
    computed: {
      imageListWithCommissioners: function() {
        let imgListComm = [];
        this.commissioners.forEach(comm => {
          let img = this.findImage(comm.path)[0];
          imgListComm.push(_.merge(comm, img));
        });

        imgListComm.sort((a, b) => {
          var keyA = Number(a.id);
          var keyB = Number(b.id);
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });

        return imgListComm;
      }
    }
  }
</script>