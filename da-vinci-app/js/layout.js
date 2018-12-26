// Page layout + navbar
Vue.component('app-page', {
  props: {  title: 'String', scrollable: { type: 'Boolean', default: true },  },
  template: `
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
  </div>  `
})

//Page action icons
Vue.component('app-nav-action', {
  props: ['icon'],
  template: `<ons-toolbar-button v-on:click="$emit('action')">
    <ons-icon :icon="icon"></ons-icon>
  </ons-toolbar-button>`
})



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
        <ons-list-item v-for="element in category.elements" v-on:click="changePage(element.page)" tappable>
          <div class="left">
            <ons-icon fixed-width class="list-item__icon" :icon="element.icon"></ons-icon>
          </div>
          <div class="center">{{ element.name }}</div>
        </ons-list-item>
      </span>
    </ons-list>
  </ons-page>`,
  methods: {
    changePage: function (page) {
      this.$root.page = page
      document.getElementById('menu').close()
    }
  }
}) 