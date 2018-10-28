// Navbar
Vue.component('app-navbar', {
  props: ['title'],
  template: `<div>
  <ons-toolbar>
    <div class="left">
      <ons-toolbar-button onclick="document.getElementById('menu').open()">
        <ons-icon icon="md-menu"></ons-icon>
      </ons-toolbar-button>
    </div>
    <div class="center"> {{ title }} </div>
    <div class="right">
     <slot></slot>
    </div>
  </ons-toolbar>
  <div style="top: 44px; display: block; padding-top:44px"></div>
  </div>`
})


// Side menu
app.menu ={
  image: 'https://monaca.io/img/logos/download_image_onsenui_01.png', 
  categories: [ {
      name: "",
      elements:[
        {name: "Agenda", icon:"md-calendar"},    
        {name: "Orari",  icon:"md-time"},      
      ]
    }, {
      name: "comunicati",
      elements:[
        {name: "Studenti",  icon:"md-graduation-cap"},      
        {name: "Genitori",  icon:"md-accounts"},      
        {name: "Docenti",   icon:"md-case"}, 
        {name: "Salvati",   icon:"md-download"},                 
      ]
    }, {
      name: "utilità",
      elements:[
        {name: "Impostazioni", icon:"md-settings"}
      ]
    }, ],
}

Vue.component('app-menu', {
  template: `<ons-page>
    <div class="profile-pic">
      <img :src="$root.menu.image" style="display: block; max-width: 100%;">
    </div>      
    <ons-list>
      <span v-for="category in $root.menu.categories">
        <span v-if=" category.name != ''">
          <br><ons-list-title>{{ category.name }}</ons-list-title>
        </span>
        <ons-list-item v-for="element in category.elements" onclick="fn.load('home.html')" tappable>
          <div class="left">
            <ons-icon fixed-width class="list-item__icon" :icon="element.icon"></ons-icon>
          </div>
          <div class="center">{{ element.name}}</div>
        </ons-list-item>
      </span>
    </ons-list>
  </ons-page>`
}) 




