<template>
  <dav-app-page title="Home">
    <template slot="icons">
      <dav-icon icon="md-settings" @click="$store.page = ['Impostazioni', 'md-settings', 'impostazioni']"></dav-icon>
    </template>

    <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
      Swipe right to open the menu!
    </p>
    <v-ons-card >
    </v-ons-card>
  </dav-app-page>
</template>
<script>
fetch('./news/news.json').then(response => response.json()).then(data => {
  console.log(data)
})
export default {

}
</script>
