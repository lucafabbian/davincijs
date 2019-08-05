// External libs imports
import Vue from 'vue/dist/vue.esm.browser.js'
import VueOnsen from 'vue-onsenui'

// App imports
import App from './App.vue'
import VueDaVinciApi from './js/davinciapi/VueDaVinciApi.js'
import store from './js/store/store.js'


/**
 *  Componenti "di base" dell'app: si tratta di quelli
 *  che vengono usati più spesso, e pertanto ha senso
 *  registrarli come globali in modo che siano disponibili
 *  ovunque all'interno dei template (anche nei plugin)
 */
import * as baseComponents from './components/*.vue'

// Css imports
import './css/style.css'
import './css/animations.css'
import './css/onsenTheme.css'

/** Install Vue plugins and base components */
;[VueOnsen, VueDaVinciApi].forEach( plugin => Vue.use(plugin))
Object.values(baseComponents).forEach( component => Vue.component(component.name, component))
Vue.prototype.$vue = Vue

/** Developer mode */
if(process.env.NODE_ENV === 'development'){
  Vue.prototype.$ons.platform.select('android') // Set android
}


new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    page: JSON.parse(localStorage.page || '{"name": "Home", "icon":"md-home", "page":"app-page-home"}'),
    comunicatiLetti     : JSON.parse(localStorage.comunicatiLetti     || '[]'),
    comunicatiPreferiti : JSON.parse(localStorage.comunicatiPreferiti || '[]'),
  },
  watch: {
    comunicatiLetti    () { localStorage.comunicatiLetti     = JSON.stringify(this.comunicatiLetti    )  },
    comunicatiPreferiti() { localStorage.comunicatiPreferiti = JSON.stringify(this.comunicatiPreferiti)  },
    page               () { localStorage.page                = JSON.stringify(this.page               )  },
  },
})

Vue.prototype.$davinciApi.refresh()
