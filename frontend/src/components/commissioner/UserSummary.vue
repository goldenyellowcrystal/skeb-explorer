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

                  <WatchButton />             
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

  export default {
    name: 'UserSummary',
    components: {
      WatchButton
    },
    props: {
      userInfo: Object
    }
  }
</script>