import VueDaVinciApi from './davinciapi/vue-da-vinci-api.js'
import AppComponents from './components/components.js'

Vue.use(VueDaVinciApi)
Vue.use(AppComponents)
Vue.config.devtools = true

window.vm = new Vue({  
  el: '#app', 
  data: {
    page: (localStorage.page || '{name: "Home", icon:"md-home", page:"app-page-home"}'),
    comunicatiLetti     : JSON.parse(localStorage.comunicatiLetti     || '[]'),
    comunicatiPreferiti : JSON.parse(localStorage.comunicatiPreferiti || '[]'),
    
  },
  watch: {
    comunicatiLetti    () { localStorage.comunicatiLetti     = JSON.stringify(this.comunicatiLetti    )  },
    comunicatiPreferiti() { localStorage.comunicatiPreferiti = JSON.stringify(this.comunicatiPreferiti)  },
    page               () { localStorage.page                = JSON.stringify(this.page               )  },

  },
})

//console.log(vm.comunicatiLetti)

Vue.prototype.$davinciApi.refresh()
console.log(Vue.prototype.$davinciApi.data)
