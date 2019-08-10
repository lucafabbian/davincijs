<script>
import * as pages from './pages/*.vue'

const sidemenu = {
  "default":[
    ["Home",   "md-home",     "home"],
    ["Agenda", "md-calendar", "agenda"],
    ["Orari",  "md-time",     "orari"],
  ],
  "comunicati": [
    ["Studenti" ,  "md-graduation-cap", "comunicati", {type: 'studenti'}],
    ["Genitori" ,  "md-accounts",       "comunicati", {type: 'genitori'}],
    ["Docenti"  ,  "md-case",           "comunicati", {type: 'docenti' }],
  ],
  "utilità": [
    ["Impostazioni", "md-settings", "impostazioni"],
  ],
}

export default {
  data(){ return {sidemenu}},
  components: { ...pages },
  methods: {
    changePage(page){
      this.$root.page = page
      document.getElementById('menu').close()
    },
    debug(){
      this.$davinciApi.fetchSlideshowSito().then( (r) => console.log(r))
    },
  }
}
</script>
<template>
  <v-ons-splitter>
    <v-ons-splitter-side class="sidemenu-border" id="menu" side="left" width="220px" :collapse="($root.window.width < 750) ? '' : false" swipeable>
      <v-ons-page>
        <div class="sidemenu" @click="debug"><img src="./static/img/logo-toolbar.svg"></div>
        <v-ons-list>
          <span v-for="(category, name) in sidemenu" :key="name">
            <span v-if=" name != 'default'">
              <br><v-ons-list-title>{{ name }}</v-ons-list-title>
            </span>
            <v-ons-list-item v-for="element in category" :key="element[0]" @click="changePage(element)" tappable>
              <div class="left">
                <v-ons-icon fixed-width class="list-item__icon" :icon="element[1]"></v-ons-icon>
              </div>
              <div class="center">{{ element[0] }}</div>
            </v-ons-list-item>
          </span>
        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>
    <v-ons-splitter-content id="content">
      <keep-alive>
        <component :key="$store.page[0]" :is="$store.page[2]" v-bind="$store.page[3]"></component>
      </keep-alive>
    </v-ons-splitter-content>
  </v-ons-splitter>
</template>
<style>
  .sidemenu-border {
    border-right: 1px solid #e2e9ee;
  }
  .sidemenu-border >ons-page > .page__content{
    background-color: #ccd4da !important;
  }
  .sidemenu > img {
    display: block;
    width: calc(100% + 2px);
    height: 73px;
  }
</style>
