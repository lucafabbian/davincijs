<template>
  <v-ons-splitter>
    <v-ons-splitter-side id="menu" side="left" width="220px" collapse swipeable>
      <dav-app-menu></dav-app-menu>
    </v-ons-splitter-side>
    <v-ons-splitter-content id="content">
        <keep-alive>
          <component :is="$root.page.page" v-bind="$root.page.data"></component>
        </keep-alive>
    </v-ons-splitter-content>
  </v-ons-splitter>
</template>
<script>

import DavAppMenu from './components/DavAppMenu.vue'
import pages   from './pages/pages.js'

export default {
  name: 'App',
  components: {
    DavAppMenu,
    ...pages,
  }
}
</script>
