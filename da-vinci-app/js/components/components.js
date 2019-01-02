
// Layout
import AppPage      from './layout/app-page.js'
import AppNavAction from './layout/app-nav-action.js'
import AppMenu      from './layout/app-menu.js'

// Pages
import AppPageHome         from './pages/app-page-home.js'
import AppPageAgenda       from './pages/app-page-agenda.js'
import AppPageComunicati   from './pages/app-page-comunicati.js'
import AppPageImpostazioni from './pages/app-page-impostazioni.js'

// Helper components
import AppPdfviewer      from './others/app-pdfviewer.js'
import AppCardComunicato from './others/app-card-comunicato.js'



export default { install: function (Vue, options) {
  let components = [
    {name: 'app-page'      , obj: AppPage     },
    {name: 'app-nav-action', obj: AppNavAction},
    {name: 'app-menu'      , obj: AppMenu     },
    
    {name: 'app-page-home'        , obj: AppPageHome        },
    {name: 'app-page-agenda'      , obj: AppPageAgenda      },
    {name: 'app-page-impostazioni', obj: AppPageImpostazioni},
    {name: 'app-page-comunicati'  , obj: AppPageComunicati  },    
    
    {name: 'app-pdfviewer'      , obj: AppPdfviewer     },
    {name: 'app-card-comunicato', obj: AppCardComunicato},
  ]
  
  components.forEach( (component) => Vue.component(component.name, component.obj))
    
  // Pagine dei comunicati (sono uguali tranne per il titolo e l'elenco dei comunicati)
  const comunicati = [
    {id: 'studenti', title: 'Comunicati studenti', obj:'comunicatiStudenti'},
    {id: 'genitori', title: 'Comunicati genitori', obj:'comunicatiGenitori'},
    {id: 'docenti' , title: 'Comunicati docenti' , obj:'comunicatiDocenti' },
  ]
  comunicati.forEach( (elem) => Vue.component('app-page-comunicati-' + elem.id, {
    template: `<app-page-comunicati title="${elem.title}" :comunicati="$davinciApi.data.${elem.obj}"></app-page-comunicati>`,  
  }))

  // Pagina comunicati preferiti
  Vue.component('app-page-comunicati-preferiti', {
    template: `<app-page-comunicati title="Comunicati preferiti" :comunicati="$root.comunicatiPreferiti"></app-page-comunicati>`,
  })
}}