import DaVinciApi from './da-vinci-api.js'

export default { install: function(Vue, options){
  Vue.prototype.$davinciApi =   Object.assign({}, DaVinciApi, {
    data: new Vue({data: {reactiveWrapper: DaVinciApi.data}} ).reactiveWrapper,
  })
  
}}