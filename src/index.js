// External libs imports
import Vue from 'vue/dist/vue.esm.browser.js'
import VueOnsen from 'vue-onsenui'

// App imports
import App from './App.vue'
import VueDaVinciApi from './js/davinciapi/VueDaVinciApi.js'
import store from './js/store/store.js'
import BaseComponents from './components/BaseComponents.js'

// Css imports
/* TODO: currently not working */

/** Install Vue plugins */
;[VueOnsen, VueDaVinciApi, BaseComponents].forEach( plugin => Vue.use(plugin))

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
