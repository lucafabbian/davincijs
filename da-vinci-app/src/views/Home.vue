<template>
  <v-ons-page>
    <v-ons-toolbar>
      <MenuButton @click="() => $store.layout.splitterOpen = !$store.layout.splitterOpen"></MenuButton>
      <div class="center"> {{ $store.info.title }}</div>
    </v-ons-toolbar>
    <p style="text-align: center">
      <v-ons-button @click="askServer">
        Click me!
      </v-ons-button>
    </p>
  </v-ons-page>
</template>

<style>
  /* CSS goes here */
</style>

<script>
// Javascript goes here
export default {
  methods: {
    askServer: function () {
      this.$DaVinciAPI.get('/classi').then( (response) => {
        this.$ons.notification.alert(
          'Classi (obtained from api): <br><br>' + JSON.stringify(response.data)
        )
      })
    }
  }
}
</script>
