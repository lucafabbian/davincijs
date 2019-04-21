import DaVinciApi from './DaVinciApi.js'

const serializeComunicato = comunicato => JSON.stringify({
  url: comunicato.url,
})

export default { install: function(Vue, options) {
  Vue.prototype.$davinciApi = Object.assign({}, DaVinciApi, {
    vue: new Vue({
      data: {
        davinciData: DaVinciApi.data,
        prefList:    JSON.parse(localStorage.DaVinciApiPrefList || '[]'),
        readList:    JSON.parse(localStorage.DaVinciApiReadList || '[]'),
      },
      methods: {
        mapComunicato(comunicato){
          return {
            ...comunicato,
            isPref: this.prefList.includes(serializeComunicato(comunicato)),
            isRead: this.readList.includes(serializeComunicato(comunicato)),
          }
        },
        addPref(comunicato){
          const serializedComunicato = serializeComunicato(comunicato)
          if(!this.prefList.includes(serializedComunicato)) {
            this.prefList.push(serializedComunicato)
          }
        },
        removePref(comunicato){
          const serializedComunicato = serializeComunicato(comunicato)
          this.prefList = this.prefList.filter(
            comunicato => comunicato !== serializedComunicato
          )
        },
        addRead(comunicato){
          const serializedComunicato = serializeComunicato(comunicato)
          if(!this.readList.includes(serializedComunicato)) {
            this.readList.push(serializedComunicato)
          }
        }
      },
      computed: {
        comunicatiGenitori(){
          return this.davinciData.comunicatiGenitori.map(this.mapComunicato)
        },
        comunicatiStudenti(){
          return this.davinciData.comunicatiStudenti.map(this.mapComunicato)
        },
        comunicatiDocenti(){
          return this.davinciData.comunicatiDocenti.map(this.mapComunicato)
        },
      },
      watch: {
        prefList(){ localStorage.DaVinciApiPrefList = JSON.stringify(this.prefList) },
        readList(){ localStorage.DaVinciApiReadList = JSON.stringify(this.readList) },
      },
    }),
  })

}}
