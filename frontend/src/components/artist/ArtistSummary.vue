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

                  <v-btn
                    small
                    color="primary"
                    elevation="2"
                    class="ms-2"
                  >
                    <v-icon left>
                      mdi-eye-plus
                    </v-icon>
                    Watch
                  </v-btn>                  
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
                    :color="artistSummaryInfo.allowNSFW ? 'green' : 'red'">
                      NSFW {{ artistSummaryInfo.allowNSFW ? '✔' : '❌' }}
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
  export default {
    name: 'ArtistSummary',
    props: {
      artistSummaryInfo: Object
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