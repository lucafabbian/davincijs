<template>
  <ons-splitter>
    <ons-splitter-side id="menu" side="left" width="220px" collapse swipeable>
      <app-menu></app-menu>
    </ons-splitter-side>
    <ons-splitter-content id="content">
      <ons-page class="page">
          <keep-alive>
            <component :is="$root.page.page" v-bind="$root.page.data"></component>
          </keep-alive>
      </ons-page>
    </ons-splitter-content>
  </ons-splitter>
</template>
<script>
export default {
  name: 'App',
}
</script>
