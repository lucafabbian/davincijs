<template>
  <v-ons-page>
    <div class="app-menu-profile-pic">
      <img src="./static/img/logo-toolbar.svg">
    </div>
    <v-ons-list>
      <span v-for="category in categories">
        <span v-if=" category.name != ''">
          <br><v-ons-list-title>{{ category.name }}</v-ons-list-title>
        </span>
        <v-ons-list-item v-for="element in category.elements" v-on:click="changePage(element)" tappable>
          <div class="left">
            <v-ons-icon fixed-width class="list-item__icon" :icon="element.icon"></v-ons-icon>
          </div>
          <div class="center">{{ element.name }}</div>
        </v-ons-list-item>
      </span>
    </v-ons-list>
  </v-ons-page>
</template>
<style>
  .app-menu-profile-pic > img {
    display: block;
    width: 100%;
  }
</style>
<script>

const data = {
  categories: [ {
      name: "",
      elements:[
        {name: "Home",   icon:"md-home",     page:"dav-app-page-home"},
        {name: "Agenda", icon:"md-calendar", page:"dav-app-page-agenda"},
        {name: "Orari",  icon:"md-time"},
      ]
    }, {
      name: "comunicati",
      elements:[
        {
          name: "Studenti",
          icon:"md-graduation-cap",
          page:"dav-app-page-comunicati",
          data: { title: 'Comunicati studenti', comunicati:'comunicatiStudenti'}
        },
        {
          name: "Genitori",
          icon:"md-accounts",
          page:"dav-app-page-comunicati",
          data: { title: 'Comunicati genitori', comunicati:'comunicatiGenitori'}
        },
        {
          name: "Docenti",
          icon: "md-case",
          page:"dav-app-page-comunicati",
          data: { title: 'Comunicati docenti', comunicati:'comunicatiDocenti'}
        },
        {name: "Preferiti", icon:"md-star",         page:"dav-app-page-comunicati-preferiti"},
      ]
    }, {
      name: "utilità",
      elements:[
        {name: "Impostazioni", icon:"md-settings", page:"dav-app-page-impostazioni"}
      ]
    }, ],
}

export default {
  name: 'DavAppMenu',
  data: function(){
    return data
  },
  methods: {
    changePage: function (page) {
      this.$root.page = page
      document.getElementById('menu').close()
    }
  }
}
</script>
