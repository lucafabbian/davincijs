import Vue from 'vue'
import App from './App.vue'
import onsenui from 'onsenui'

import VueDaVinciApi from './js/davinciapi/vue-da-vinci-api.js'
import AppComponents from './js/components/components.js'

Vue.use(VueDaVinciApi)
Vue.use(AppComponents)
Vue.config.devtools = true

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
console.log(Vue.prototype.$davinciApi.data)
