import DaVinciApi from './da-vinci-api.js'

const preferredComponents = JSON.parse(localStorage['da-vinci-api-preferred'] || '[]')

export default { install: function(Vue, options) {
  Vue.prototype.$davinciApi = Object.assign({}, DaVinciApi, {
    data: new Vue({
      data: {
        davinciData: DaVinciApi.data,
      },
      computed: {
        reactiveWrapper() {
          return Object.keys(this.davinciData).map((key, index) => Array.from(this.davinciData[key], (obj) => Object.assign({}, obj, {
            isPref: preferredComponents.includes(this.davinciData[key].url)
          })))
        },
        preferredList() {
          return Object.keys(this.davinciData).map((key, index) => Array.from(this.davinciData[key].filter( (obj) => obj.isPref ))) // sistemare
        }
      },
      watch: {
        preferredList() { localStorage['da-vinci-api-preferred'] = JSON.stringify(this.preferredComponents = Array.from(this.reactiveWrapper.filter(
          (obj) => obj.isPref
        )))} // Aggiunge i preferiti al localStorage
      }
    }),
  })
  
}}
