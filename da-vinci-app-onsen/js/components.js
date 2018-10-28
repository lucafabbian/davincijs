Vue.component('app-navbar', {
  props: ['title'],
  template: `<div>
  <ons-toolbar>
    <div class="left">
      <ons-toolbar-button onclick="fn.open()">
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

Vue.component('app-menu', {
  template: `<ons-page>
    <div class="profile-pic"><img :src="$root.menu.image"></div>      
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




