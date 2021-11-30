<template>
  <div class="users-list">
    <h2 v-if="isArtist">Commissioners List</h2>
    <h2 v-else>Commissioned Artists List</h2>
    
    <ul v-for="user in uniqueUsers">
      <li>
        <router-link :to="{
          name: 'UserPage',
          params: {
            username: user.screen_name
          }}">
            {{ user.name }} ({{ user.art_count }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'UsersList',
    props: {
      uniqueUsers: Object,
      isArtist: Boolean
    }
  }
</script>