<template>
  <div>
    <v-ons-toolbar class="toolbar">
      <div class="left">
        <v-ons-toolbar-button onclick="document.getElementById('menu').open()">
          <v-ons-icon icon="md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center"> {{ title }} </div>
      <div class="right">
        <slot name="actions"></slot>
      </div>
    </v-ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content" :style=" scrollable ? '' : 'overflow-y:hidden'">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppPage',
  props: {
    title: String,
    scrollable: { type: Boolean, default: true },
  },
}

</script>
