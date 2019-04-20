<template>
  <v-ons-toolbar-button v-on:click="$emit('action')">
    <v-ons-icon :icon="icon"></v-ons-icon>
  </v-ons-toolbar-button>
</template>
<script>
export default {
  name: 'AppNavAction',
  props: ['icon'],
}
</script>
