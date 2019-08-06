// External libs imports
import Vue from 'vue/dist/vue.js'
import VueOnsen from 'vue-onsenui'
import VueLocalStorage from 'vue-localstorage'


// App imports
import App from './App.vue'
import VueDaVinciApi from './js/davinciapi/VueDaVinciApi.js'
import DaVinciApi from './js/DaVinciApi.js'
import store from './js/Store.js'
import * as baseComponents from './components/*.vue'

// Css imports
import './css/style.css'
import './css/animations.css'
import './css/onsenTheme.css'

/** Install Vue plugins and base components */
;[VueOnsen, VueDaVinciApi].forEach( plugin => Vue.use(plugin))
Vue.use(VueLocalStorage, {name: 'localStorage', bind: true})
Object.values(baseComponents).forEach( component => Vue.component(component.name, component))
Vue.prototype.$vue = Vue

/** Developer mode */
if(process.env.NODE_ENV === 'development'){
  Vue.prototype.$ons.platform.select('android') // Set android
}

// Load Store
const localStorage = { ...store, ...DaVinciApi.store}
Object.keys(localStorage).map(function(key) { localStorage[key] = {type: Object, default: localStorage[key]}})
Object.defineProperty(Vue.prototype, "$store", { get: () => Vue.prototype.$localStorage })


/** Start Vue */
new Vue({
  el: '#app',
  render: h => h(App),
  localStorage,
})

//Vue.prototype.$davinciApi.refresh()
