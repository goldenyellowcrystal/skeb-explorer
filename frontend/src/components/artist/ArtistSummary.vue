<template>
  <div class="artist-summary">
    <v-img
      max-height="175px"
      :src="artistSummaryInfo.artistHeader">
      <v-overlay
        :absolute="true"
        :opacity="0.3"
      >
      </v-overlay>
    </v-img>
    <v-container class="offset-65">
      <v-row>
        <v-col>
          <v-row class="pa-0 flex-nowrap">
            <v-col class="pt-0 pl-6 avatar-col" :cols="4">
              <v-avatar size="124">
                <img
                  :src="artistSummaryInfo.artistIcon"
                  :alt="artistSummaryInfo.artistName + ' icon'" />
              </v-avatar>
            </v-col>
            <v-col class="pt-0" :cols="8">
              <v-row class="d-block pb-5">
                <div class="text-h4 text-no-wrap text-truncate header-text">
                  {{ artistSummaryInfo.artistName }}
                </div>
                <div class="d-block text-no-wrap text-truncate header-text">
                  @{{ artistSummaryInfo.screenName }}

                  <WatchButton
                    :is-watched="isWatched"
                    @watch-clicked="addToWatch()"
                    @unwatch-clicked="removeFromWatch()"
                  />
                </div>
              </v-row>
              <v-row>
                <div>
                  <v-chip small outlined
                    class="mr-1"
                    :color="artistSummaryInfo.commsOpen ? 'green' : 'red'">
                      Commissions {{ artistSummaryInfo.commsOpen ? 'OPEN' : 'CLOSED' }}
                  </v-chip>

                  <v-chip small outlined
                    class="ms-1"
                    :color="artistSummaryInfo.allowNsfw ? 'green' : 'red'">
                      NSFW {{ artistSummaryInfo.allowNsfw ? '✔' : '❌' }}
                  </v-chip>

                  <v-chip small outlined
                    class="ms-1"
                    :color="artistSummaryInfo.allowPrivate ? 'green' : 'red'">
                      Hidden {{ artistSummaryInfo.allowPrivate ? '✔' : '❌' }}
                  </v-chip>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col :cols="12">
              <v-row class="text-center flex-nowrap justify-center">
                <v-card class="ms-3" elevation="2" outlined>
                  <v-card-text>
                    <div class="font-weight-bold text-h5">
                      ¥{{ artistSummaryInfo.suggestedPrice }}
                    </div>
                    <div class="font-weight-light">
                      Recommended Price
                    </div>
                  </v-card-text>
                </v-card>

                <v-card class="ms-3" elevation="2" outlined>
                  <v-card-text>
                    <div class="font-weight-bold text-h5">
                      {{ artistSummaryInfo.completeRate }}
                    </div>
                    <div class="font-weight-light">
                      Completion Rate
                    </div>
                  </v-card-text>
                </v-card>

                <v-card class="ms-3" elevation="2" outlined>
                  <v-card-text>
                    <div class="font-weight-bold text-h5">
                      {{ artistSummaryInfo.receivedWorksCount }}
                    </div>
                    <div class="font-weight-light">
                      Total Works
                    </div>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import WatchButton from "../common/WatchButton.vue";
  import { db } from '../../db';
  import { convertBooleanToNum } from '../../helper';

  export default {
    name: 'ArtistSummary',
    components: {
      WatchButton
    },
    data() {
      return {
        isWatched: false
      }
    },
    props: {
      artistSummaryInfo: Object
    },
    methods: {
      async addToWatch() {
        try {
          const id = await db.users.add({
            icon: this.artistSummaryInfo.artistIcon,
            header: this.artistSummaryInfo.artistHeader,
            name: this.artistSummaryInfo.artistName,
            screen_name: this.artistSummaryInfo.screenName,
            lang: this.artistSummaryInfo.lang,
            is_artist: convertBooleanToNum(true),
            comms_open: convertBooleanToNum(this.artistSummaryInfo.commsOpen),
            suggested_price: this.artistSummaryInfo.suggestedPrice,
            complete_rate: this.artistSummaryInfo.completeRate,
            allow_hidden: convertBooleanToNum(this.artistSummaryInfo.allowPrivate),
            allow_nsfw: convertBooleanToNum(this.artistSummaryInfo.allowNsfw),
            total_works: this.artistSummaryInfo.receivedWorksCount
          });

          this.isWatched = true;
        } catch (error) {
          console.log(`Failed to add ${this.artistSummaryInfo.screenName}: ${error}`)
        }
      },
      async queryWatched() {
        try {
          const followedUser = await db.users.where('screen_name').equalsIgnoreCase(this.artistSummaryInfo.screenName).toArray();
          this.isWatched = followedUser.length > 0
        } catch (error) {
          if (error != 'TypeError: String expected.')
            console.log(`Error during query: ${error}`)
        }
      },
      async removeFromWatch() {
        try {
          const deleted = await db.users.where('screen_name').equalsIgnoreCase(this.artistSummaryInfo.screenName).delete();
          this.isWatched = false;
        } catch (error) {
          console.log(`Error during deletion of ${this.artistSummaryInfo.screen_name}: ${error}`)
        }
      }
    },
    watch: {
      artistSummaryInfo: {
        deep: true,
        immediate: true,
        handler: function(newVal, oldVal) {
          if (oldVal && !newVal) {
            this.queryWatched();
          } else if (newVal) {
            this.queryWatched();
          }
        }
      }
    }
  }
</script>

<style>
  .offset-65 {
    position: relative;
    top: -65px;
  }

  .avatar-col {
    position: relative;
    max-width: 170px;
    top: -20px;
  }

  .header-text {
    color: white;
    text-shadow: 2px 2px 1px black;
  }
</style>