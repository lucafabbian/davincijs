<template>
  <v-ons-page>
    <v-ons-toolbar>
      <MenuButton/>
      <div class="center">Comunicati studenti</div>
    </v-ons-toolbar>
    <v-ons-card v-for='elem in elements'>
      <div class="title">
        {{elem}}
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  data () {
    return {
      elements: [1, 2, 3]
    }
  }
}
</script>
