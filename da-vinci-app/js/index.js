import VueDaVinciApi from './davinciapi/vue-da-vinci-api.js'
import AppComponents from './components/components.js'

Vue.use(VueDaVinciApi)
Vue.use(AppComponents)

new Vue({  
  el: '#app', 
  data: {
    page: (localStorage.page || 'app-page-home'),
    comunicatiLetti     : JSON.parse(localStorage.comunicatiLetti     || '[]'),
    comunicatiPreferiti : JSON.parse(localStorage.comunicatiPreferiti || '[]'),
    menu: {
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
            {name: "Studenti",  icon:"md-graduation-cap", page:"app-page-comunicati-studenti"},      
            {name: "Genitori",  icon:"md-accounts",       page:"app-page-comunicati-genitori"},      
            {name: "Docenti",   icon:"md-case",           page:"app-page-comunicati-docenti"}, 
            {name: "Preferiti",   icon:"md-star",         page:"app-page-comunicati-preferiti"},                 
          ]
        }, {
          name: "utilità",
          elements:[
            {name: "Impostazioni", icon:"md-settings", page:"app-page-impostazioni"}
          ]
        }, ],
    }
    
  },
  watch: {
    comunicatiLetti    () { localStorage.comunicatiLetti     = JSON.stringify(this.comunicatiLetti    )  },
    comunicatiPreferiti() { localStorage.comunicatiPreferiti = JSON.stringify(this.comunicatiPreferiti)  },
    page               () { localStorage.page                = this.page                          },

  },
})

Vue.prototype.$davinciApi.refresh()

