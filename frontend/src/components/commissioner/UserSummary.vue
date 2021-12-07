<template>
  <div class="user-summary">
    <v-img
      max-height="175px"
      :src="userInfo.userHeader">
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
                  :src="userInfo.userIcon"
                  :alt="userInfo.userName + ' icon'" />
              </v-avatar>
            </v-col>
            <v-col class="pt-0" :cols="8">
              <v-row class="d-block pb-5">
                <div class="text-h4 text-no-wrap text-truncate header-text">
                  {{ userInfo.userName }}
                </div>
                <div class="d-block text-no-wrap text-truncate header-text">
                  @{{ userInfo.screenName }}

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
                    color="orange">
                      Commissioner
                  </v-chip>
                </div>
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

  export default {
    name: 'UserSummary',
    components: {
      WatchButton
    },
    data() {
      return {
        isWatched: false
      }
    },
    props: {
      userInfo: Object
    },
    methods: {
      async addToWatch() {
        try {
          const id = await db.users.add({
            icon: this.userInfo.userIcon,
            header: this.userInfo.userHeader,
            name: this.userInfo.userName,
            screen_name: this.userInfo.screenName,
            lang: this.userInfo.lang,
            is_artist: false,
            total_works: this.userInfo.commissionedCnt
          });

          this.isWatched = true;
        } catch (error) {
          console.log(`Failed to add ${this.userInfo.screenName}: ${error}`)
        }
      },
      async queryWatched() {
        try {
          const followedUser = await db.users.where('screen_name').equalsIgnoreCase(this.userInfo.screenName).toArray();
          this.isWatched = followedUser.length > 0
        } catch (error) {
          if (error != 'TypeError: String expected.')
            console.log(`Error during query: ${error}`)
        }
      },
      async removeFromWatch() {
        try {
          const deleted = await db.users.where('screen_name').equalsIgnoreCase(this.userInfo.screenName).delete();
          this.isWatched = false;
        } catch (error) {
          console.log(`Error during deletion of ${this.userInfo.screen_name}: ${error}`)
        }
      }
    },
    watch: {
      userInfo: {
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