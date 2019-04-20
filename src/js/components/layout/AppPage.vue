<template>
  <div>
    <ons-toolbar class="toolbar">
      <div class="left">
        <ons-toolbar-button onclick="document.getElementById('menu').open()">
          <ons-icon icon="md-menu"></ons-icon>
        </ons-toolbar-button>
      </div>
      <div class="center"> {{ title }} </div>
      <div class="right">
        <slot name="actions"></slot>
      </div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content" :style=" scrollable ? '' : 'overflow-y:hidden'">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: 'String',
    scrollable: { type: 'Boolean', default: true },
  },
}

</script>
