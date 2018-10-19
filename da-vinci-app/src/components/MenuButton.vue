<template>
  <div class="left">
    <v-ons-toolbar-button @click="() => $store.layout.splitterOpen = !$store.layout.splitterOpen">
      <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
    </v-ons-toolbar-button>
  </div>
</template>
