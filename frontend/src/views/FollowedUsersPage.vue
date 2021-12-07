<template>
  <div class="followed-users pa-6">
    <div class="text-h4 text-center pb-6">
      Followed Artists
    </div>
    <v-card
      class="mb-6"
      elevation="1"
      outlined
    >
      <v-tabs v-model="tab" show-arrows>
        <v-tab v-for="key in Object.keys(groupedArtistByPrice)" :key="key">
          ¥{{ key }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(pricePoint, key) in groupedArtistByPrice"
          :key="key"
        >
          <v-container fluid>
            <v-row>
              <v-col class="d-flex flex-column" v-for="user in pricePoint" :key="user.id">
                <UserCard :user="user" :hide-subtext="true" />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-divider></v-divider>

    <div class="text-h4 text-center py-6">
      Followed Commissioners
    </div>
    <v-card
      class="mb-6"
      elevation="1"
      outlined
    >
      <v-container fluid>
        <v-row>
          <v-col class="d-flex flex-column" v-for="user in fixedCommissioners" :key="user.id">
            <UserCard :user="user" :hide-subtext="true" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  import { db } from "../db";
  import { liveQuery } from "dexie";
  import { useObservable } from "@vueuse/rxjs";

  import UserCard from "../components/common/UserCard.vue";

  export default {
    name: 'FollowedUsersPage',
    components: {
      UserCard
    },
    data() {
      return {
        tab: null
      }
    },
    setup() {
      return {
        db,
        artists: useObservable(
          liveQuery(() => db.users.where('is_artist').equals(1).toArray())
        ),
        commissioners: useObservable(
          liveQuery(() => db.users.where('is_artist').equals(0).toArray())
        )
      };
    },
    computed: {
      groupedArtistByPrice() {
        var grouped = {};
        if (!!this.artists) {
          this.artists.forEach(artist => {
            if (!grouped[artist.suggested_price]) {
              grouped[artist.suggested_price] = [];
            }
            grouped[artist.suggested_price].push({
              is_creator: (artist.is_artist > 0),
              id: artist.id,
              name: artist.name,
              screen_name: artist.screen_name,
              avatar: artist.icon,
              header: artist.header
            });
          });
        }
        return grouped;
      },
      fixedCommissioners() {
        var fixed = [];
        if (!!this.commissioners) {
          this.commissioners.forEach(commissioner => {
            fixed.push({
              is_creator: (commissioner.is_artist < 1),
              id: commissioner.id,
              name: commissioner.name,
              screen_name: commissioner.screen_name,
              avatar: commissioner.icon,
              header: commissioner.header
            });
          });
        }
        return fixed;
      }
    }
  }
</script>