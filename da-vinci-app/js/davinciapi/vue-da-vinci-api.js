import DaVinciApi from './da-vinci-api.js'

const preferredComponents = JSON.parse(localStorage['da-vinci-api-preferred'] || '[]')

export default { install: function(Vue, options){
  Vue.prototype.$davinciApi =   Object.assign({}, DaVinciApi, {
    data: new Vue({
      data: {
        davinciData: DaVinciApi.data,
        
      },
      computed: {
        reactiveWrapper: function(){
          return Array.from(this.davinciData, (obj) => Object.assign({}, obj, {
            isPref: preferredComponents.includes(obj.url)
          }))
        },
        preferredList(){
          return Array.from(this.davinciData, (obj) => obj.isPref)
        }
      },
      watch: {
        preferredList() { localStorage['da-vinci-api-preferred'] = JSON.stringify(this.preferredComponents = Array.from(Array.filter(
          this.reactiveWrapper,
         (obj) => obj.isPref
        )))}
      }
    }).reactiveWrapper,
  })
  
}}