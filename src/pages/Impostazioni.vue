<template>
  <dav-app-page title="Impostazioni">
    <template slot="icons">
      <dav-icon icon="md-menu" @click="alert('ciao')"></dav-icon>
    </template>
   <v-ons-list>
     <v-ons-list-header>Generali</v-ons-list-header>
     <v-ons-list-item> Heila!</v-ons-list-item>
     <v-ons-list-header>Informazioni</v-ons-list-header>
   </v-ons-list>
 </dav-app-page>
</template>
<script>
export default {}
</script>
