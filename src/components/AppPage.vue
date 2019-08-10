<template>
  <v-ons-page :infiniteScroll="infiniteScroll">
    <v-ons-toolbar :class="($root.window.width < 750) ? '' : 'toolbar-expanded'">
      <div class="left">
        <v-ons-toolbar-button v-if="($root.window.width < 750)" onclick="document.getElementById('menu').open()">
          <v-ons-icon icon="md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center"> {{ title }} </div>
      <div class="right">
        <slot name="icons"></slot>
      </div>
    </v-ons-toolbar>
    <slot></slot>
  </v-ons-page>
</template>
<style>
.toolbar-expanded {
  height: 73px !important;
}
.toolbar-expanded > *{
  height: 73px !important;
  line-height: 73px !important;
}

.toolbar-expanded+.page__background, .toolbar-expanded+.page__background+.page__content {
  top: 73px !important;
}
</style>

<script>
export default {
  name: 'DavAppPage',
  props: {
    title: String,
    scrollable: { type: Boolean, default: true },
    infiniteScroll: Function,
  },
}

</script>
