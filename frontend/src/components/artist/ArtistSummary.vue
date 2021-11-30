<template>
  <div class="artist-summary">
    Artist Icon: <img :src= "artistSummaryInfo.artistIcon" class="icon"/><br/>
    Artist Name: {{artistSummaryInfo.artistName}}<br/>
    Are commissions open: {{artistSummaryInfo.commsOpen}}<br/>
    Suggested Price: {{artistSummaryInfo.suggestedPrice}}<br/>
    Completion Rate: {{artistSummaryInfo.completeRate}}<br/>
    Allow Private: {{artistSummaryInfo.allowPrivate}}<br/>
    Allow NSFW: {{artistSummaryInfo.allowNsfw}}
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