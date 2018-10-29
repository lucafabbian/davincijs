<template id="main-page">
  <div id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable width="150px" collapse="" side="left" :open.sync="splitter">
        <Splitter/>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <transition name="fade">
          <keep-alive>
            <component :is="pageStack[pageStack.length - 1]"></component>
          </keep-alive>
        </transition>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
  store: { pageStack : 'layout.pageStack', splitter: 'layout.splitterOpen'},
  components: { ...layoutComponents, ...views }
}
</script>
