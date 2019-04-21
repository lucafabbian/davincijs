<template>
  <v-ons-toolbar-button @click="$emit('click')">
    <v-ons-icon :icon="icon"></v-ons-icon>
  </v-ons-toolbar-button>
</template>
<script>
export default {
  name: 'DavIcon',
  props: ['icon'],
}
</script>
