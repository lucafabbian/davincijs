
window.app.data.page = 'app-page-home' // Set default page

// Home page
Vue.component('app-page-home', {
   template: `
  <div>
    <app-navbar title="Home">
      <ons-toolbar-button onclick="alert('ciao')">
        <ons-icon icon="md-menu"></ons-icon>
      </ons-toolbar-button>
    </app-navbar>
    <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
      Swipe right to open the menu!
    </p>
  </div>`
})

// Agenda
Vue.component('app-page-agenda', {
   template: `
  <div>
    <app-navbar title="Agenda">
      <ons-toolbar-button onclick="alert('ciao')">
        <ons-icon icon="md-menu"></ons-icon>
      </ons-toolbar-button>
    </app-navbar>
    <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
      This is the agenda!
    </p>
  </div>`
})

// Comunicati
Vue.component('app-page-comunicati-studenti', {
   template: `
  <div>
    <app-navbar title="Comunicati studenti">
      <ons-toolbar-button onclick="alert('ciao')">
        <ons-icon icon="md-share"></ons-icon>
      </ons-toolbar-button>
    </app-navbar>
    <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
      Comunicati studenti
    </p>
  </div>`
})
