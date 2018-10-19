// Webpack CSS import
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// JS import
import Vue from 'vue'
import VueOnsen from 'vue-onsenui' // This imports 'onsenui', so no need to import it separately
import VueStash from 'vue-stash'
import App from './App.vue'
import Components from './components'

import DaVinciAPI from './scripts/DaVinciAPI'

Vue.use(VueStash)
Vue.use(VueOnsen) // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in the startup code.
Vue.use(Components)
Vue.use(DaVinciAPI)

Vue.config.productionTip = false

const info = {
  version: '0.0.1',
  title: 'DaVinciJS'
}

let layout = {
  pageStack: ['Home'],
  splitterOpen: true
}

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  beforeCreate(){
    this.$ons.platform.select('Android')
  },
  data: {
    store: { info, layout }
  }
})
