<template>
  <ons-toolbar-button v-on:click="$emit('action')">
    <ons-icon :icon="icon"></ons-icon>
  </ons-toolbar-button>
</template>
<script>
export default {
  props: ['icon'],
}
</script>
