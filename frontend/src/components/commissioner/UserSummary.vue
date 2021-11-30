<template>
  <div class="user-summary">
    User Icon: <img :src= "userInfo.userIcon" class="icon"/><br/>
    Name: {{ userInfo.userName }} <br />
    Screen Name: {{ userInfo.screenName }} <br />
    Header URL: {{ userInfo.userHeader }} <br />
  </div>
</template>

<script>
  export default {
    name: 'UserSummary',
    props: {
      userInfo: Object
    }
  }
</script>