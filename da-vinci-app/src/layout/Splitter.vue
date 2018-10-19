<template>
  <v-ons-page>
    <v-ons-list>
      <ons-list-header>Default</ons-list-header>
      <ons-list-item @click="switchPage('Home')">Home</ons-list-item>
      <ons-list-item @click="switchPage('Comunicati')">Comunicati</ons-list-item>
      <MenuButton/>
    </v-ons-list>
  </v-ons-page>
</template>

<style>
  /* CSS goes here */
</style>

<script>
export default {
  data: function() {
    return {

    }
  },
  methods: {
    switchPage: function(page){
      if(this.$store.layout.pageStack[this.$store.layout.pageStack - 1] !== page){
         this.$store.layout.pageStack.push(page)
         this.$store.layout.splitterOpen = false
       }
    }
  }
}
</script>
