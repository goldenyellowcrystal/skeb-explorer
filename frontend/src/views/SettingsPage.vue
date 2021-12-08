<template>
  <div class="settings-page pa-6">
    <div class="text-h4 text-center pb-6">
      Settings Page
    </div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="ps-4">
            <v-switch
              v-model="openInNewTab"
              :label="`Open users in new tab`"
            >
            </v-switch>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title class="ps-4">
            <v-switch
              v-model="showNsfw"
              :label="`Show NSFW`"
            >
            </v-switch>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-content>
        <v-list-item-title class="ps-4">
          Screen Height: {{ windowSize.height }}; Width: {{ windowSize.width }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: 'SettingsPage',
    computed: {
      openInNewTab: {
        get() {
          return window.localStorage.getItem('show-in-new-tab') == 'true'
        },
        set(newVal) {
          window.localStorage.setItem('show-in-new-tab', newVal)
        }
      },
      showNsfw: {
        get() {
          return window.localStorage.getItem('show-nsfw') == 'true'
        },
        set(newVal) {
          window.localStorage.setItem('show-nsfw', newVal)
        }
      },
      windowSize() {
        return window.screen;
      }
    }
  }
</script>