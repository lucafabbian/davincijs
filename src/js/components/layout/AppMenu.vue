<template>
  <ons-page>
    <div class="profile-pic">
      <img :src="image" style="display: block; max-width: 100%;">
    </div>
    <ons-list>
      <span v-for="category in categories">
        <span v-if=" category.name != ''">
          <br><ons-list-title>{{ category.name }}</ons-list-title>
        </span>
        <ons-list-item v-for="element in category.elements" v-on:click="changePage(element)" tappable>
          <div class="left">
            <ons-icon fixed-width class="list-item__icon" :icon="element.icon"></ons-icon>
          </div>
          <div class="center">{{ element.name }}</div>
        </ons-list-item>
      </span>
    </ons-list>
  </ons-page>
</template>
<script>

const data = {
  image: 'res/img/logo-toolbar.svg',
  categories: [ {
      name: "",
      elements:[
        {name: "Home",   icon:"md-home",     page:"app-page-home"},
        {name: "Agenda", icon:"md-calendar", page:"app-page-agenda"},
        {name: "Orari",  icon:"md-time"},
      ]
    }, {
      name: "comunicati",
      elements:[
        {name: "Studenti",  icon:"md-graduation-cap", page:"app-page-comunicati", data: { title: 'Comunicati studenti', comunicati:0 } },
        {name: "Genitori",  icon:"md-accounts",       page:"app-page-comunicati", data: { title: 'Comunicati genitori', comunicati:1 } },
        {name: "Docenti",   icon:"md-case",           page:"app-page-comunicati", data: { title: 'Comunicati docenti' , comunicati:2 } },
        {name: "Preferiti",   icon:"md-star",         page:"app-page-comunicati-preferiti"},
      ]
    }, {
      name: "utilità",
      elements:[
        {name: "Impostazioni", icon:"md-settings", page:"app-page-impostazioni"}
      ]
    }, ],
}

export default {
  name: 'AppMenu',
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
