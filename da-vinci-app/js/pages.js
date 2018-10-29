
window.app.data.page = 'app-page-comunicati-studenti' // Set default page

// Home page
Vue.component('app-page-home', {
   template: `
    <app-page title="Home">
      <template slot="actions">
        <ons-toolbar-button onclick="alert('ciao')">
          <ons-icon icon="md-menu"></ons-icon>
        </ons-toolbar-button>
      </template>

      <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
        Swipe right to open the menu!
      </p>
    </app-page>`
})

// Agenda
Vue.component('app-page-agenda', {
  template: `
   <app-page title="Agenda">
     <template slot="actions">
       <ons-toolbar-button onclick="alert('ciao')">
         <ons-icon icon="md-menu"></ons-icon>
       </ons-toolbar-button>
     </template>
     <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
       This is agenda!
     </p>
   </app-page>`
})

// Comunicati
Vue.component('app-card-comunicato', {
  props: ['name'],
  template: `
 <div>
  <ons-card>
  {{ name }}
  </ons-card>
 </div>`,
 filters: {
   capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
 }
})

Vue.component('app-page-comunicati-studenti', {
  template: `
   <app-page title="Comunicati studenti">
     <template slot="actions">
       <ons-toolbar-button onclick="alert('ciao')">
         <ons-icon icon="md-share"></ons-icon>
       </ons-toolbar-button>
     </template>
     
     <ons-pull-hook onPull="refreshComunicatiStudenti()"> Refreshing...  </ons-pull-hook>
     <app-card-comunicato v-for="comunicato in $root.comunicatiStudenti" :name="comunicato.nome">
     </app-card-comunicato>
     
   </app-page>`
})

var refreshComunicatiStudenti = function(done){
  app.davinciApi.getComunicatiStudenti()
    .then(function (result) {
      console.log("refreshed")
      app.data.comunicatiStudenti = result.data;
      done();
    });
}
