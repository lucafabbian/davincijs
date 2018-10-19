<template id="main-page">
  <div id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable width="150px" collapse="" side="left" :open.sync="$store.layout.splitterOpen">
        <Splitter/>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <component :is="$store.layout.pageStack[$store.layout.pageStack.length - 1]" :toggle-menu="() => openSide = !openSide"></component>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </div>
</template>

<style>
  /* CSS goes here */
</style>

<script>
// Layout components
import Splitter from '@/layout/Splitter'

// Views
import Home from '@/views/Home'
import Comunicati from '@/views/Comunicati'

// Register components and views, and export them
const layoutComponents = { Splitter }
const views = { Home, Comunicati }


export default {
  components: { ...layoutComponents, ...views }
}
</script>
