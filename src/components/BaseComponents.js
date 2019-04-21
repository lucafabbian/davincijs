import DavIcon       from './DavIcon.vue'
import DavAppPage    from './DavAppPage.vue'
import DavPdfviewer  from './DavPdfviewer.vue'
import DavComunicato from './DavComunicato.vue'

/**
 *  Componenti "di base" dell'app: si tratta di quelli
 *  che vengono usati più spesso, e pertanto ha senso
 *  registrarli come globali in modo che siano disponibili
 *  ovunque all'interno dei template (anche nei plugin)
 */
export default { install(Vue){
  ;[
    DavIcon,       // Icone della toolbar
    DavAppPage,    // Pagina standard
    DavPdfviewer,  // Visualizzatore pdf
    DavComunicato, // Oggetto nella lista comunicati
  ].forEach( component => Vue.component(component.name, component))
}}
