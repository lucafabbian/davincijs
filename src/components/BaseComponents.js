import AppNavAction      from './AppNavAction.vue'
import AppPage           from './AppPage.vue'

export default { install(Vue){
  ;[
    AppNavAction,
    AppPage,
  ].forEach( component => Vue.component(component.name, component))
}}
