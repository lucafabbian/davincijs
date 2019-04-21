import DavIcon       from './DavIcon.vue'
import DavAppPage    from './DavAppPage.vue'
import DavPdfviewer  from './DavPdfviewer.vue'
import DavComunicato from './DavComunicato.vue'


export default { install(Vue){
  ;[
    DavIcon,
    DavAppPage,
    DavPdfviewer,
    DavComunicato,
  ].forEach( component => Vue.component(component.name, component))
}}
