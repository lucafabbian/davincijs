/** DaVinciApi 2.0
Nuova versione del codice che consente

In questo file sono contenuti tutti i metodi necessari per comunicare con il
server del liceo. */

const tenMonths = 26298000 // dieci mesi in secondi

// Fetch configuration
import axios from 'axios'
const davURL = 'http://liceodavinci.edu.it/' // non cifrato e lento, non aggiunge gli header CORS perciò è inutilizzabile per ora
const cacheURL = 'https://davapi.antonionapolitano.eu/' // utilizza https/2.0 e una cache per rendere sicura la connessione e ridurre il tempo di risposta
let baseURL = cacheURL // per ora quindi viene utilizzato di default il proxy
const api = axios.create({ baseURL })

/** Store dell'api */
const store = {
  dav: {
    comunicatiStudenti: [],
    comunicatiGenitori: [],
    comunicatiDocenti:  [],
    slideshowSito:      [],
    internalNews:       [],
    docenti: [],
    classi:  [],
    agenda:  [],
  }
}

/** Funzioni per il DaVinciApi */
const $davinciApi = function(Vue){
  const update = (key, value) => {
    Vue.prototype.$store.dav = {
      ...Vue.prototype.$store.dav,
      [key]: value,
    }
  }


  // Controlla se l'api e' online
  this.isOnline = () => api.get('api/teapot').catch( (err) => err.response.status === 418 )


  // Slideshow e news
  this.urlSlideshowImg = (slide) => baseURL + slide.img
  this.fetchSlideshowSito  = () => new Promise ( (resolve, reject) => {
    api.get("sitoLiceo/index.php").then((response) => {
      resolve(update('slideshowSito', [...new DOMParser().parseFromString(response.data, 'text/html')
        .querySelectorAll ('ul.sprocket-features-img-list li')].map( (el) => ({
            link:  el.children[0].children[0].getAttribute('href'),
            img:   el.children[0].children[0].children[0].getAttribute('src'),
            title: el.children[1].children[0].textContent
          }))
      ))
    }).catch( (err) => reject(err))
  })
  this.fetchInternalNews = () => new Promise ( (resolve, reject) => {
    axios.get("/davincijs/dist/news/news.json").then((response) => {
      resolve(update('internalNews', response.data.news))
    }).catch( (err) => reject(err))
  })



  // Agenda, orari, classi e docenti
  // il filtro è una stringa JSON del tipo {"prima":xxxxxxxxxx,"dopo":yyyyyyyyyy} con x e y le rappresentazioni in tempo unix dell'intervallo di tempo da considerare
  this.fetchAgenda       = (filter)  => api.post('api/agenda', filter).then((response) =>
    update('agenda', response.data)
  )
  this.fetchClassi       = () => new Promise ( (resolve, reject) => {
    api.get ('api/classi').then( (result) => update('classi', result.data)).catch( (err) => reject(err))
  })
  this.fetchDocenti      = () => new Promise ( (resolve, reject) => {
    api.get('api/docenti').then( (result) =>
      update('docenti', result.data.sort( (a,b) => (a.cognome.localeCompare(b.cognome))) )
    ).catch( (err) => reject(err))
  })


  this.fetchOrarioClasse = (classe)  => api.get ('api/orario/classe/' + classe)
  this.fetchOrarioDocente= (docente) => api.post('api/orario/docente/', docente)




  // Comunicati
  this.urlComunicato = (url) => url.replace('http://www.liceodavinci.tv/', 'https://davapi.antonionapolitano.eu/')
  this.serializeComunicato = comunicato => JSON.stringify({url: comunicato.url})
  this.fetchComunicati = (key, url, last) => new Promise( (resolve, reject) => {
    last = (last == undefined) ? '' : '/' + last; // aggiungi uno slash solo se last non è nullo
    // aggiungere sempre lo slash alla fine causa dei redirect inutili
    api.get(`api/comunicati/${url}${last}`).then( (result) => {
      // Mappa i risultati, aggiungendo proprietà non previste, come titolo e numero
      const comunicati = result.data.map( comunicato => ({
        ...comunicato,
        number: (comunicato.nome.match(/^[0-9]*/) || ["0"])[0] || "000" ,
        title: comunicato.nome.substring(((comunicato.nome.match(/^[0-9]*/) || ["0"])[0] || "0").length + 1).replace(".pdf", "").replace(/\_/g," "),
        urlName: comunicato.url.substring(comunicato.url.lastIndexOf('/')),
      }))
      resolve(update(key, comunicati)) // Aggiorna in localStorage, in modo da tenere in cache
    }).catch( ()  => reject() )
  })


  this.refresh = () => {
    this.fetchComunicati('comunicatiStudenti', 'studenti')
    this.fetchComunicati('comunicatiGenitori', 'genitori')
    this.fetchComunicati('comunicatiDocenti' , 'docenti' )
    this.fetchSlideshowSito()
    this.fetchInternalNews()
    let timeNow = new Date(); let currentYear = timeNow.getFullYear()
    let inizioAS = (timeNow.getMonth() >= 8) ? currentYear : currentYear - 1
    this.fetchAgenda( {"prima":timeNow+tenMonths,"dopo":+new Date(inizioAS, 8, 1)} )
    this.fetchClassi()
    this.fetchDocenti()

  }

}


/** */
export default {install(Vue){Vue.prototype.$davinciApi = new $davinciApi(Vue)}, store}






/*
app.actions = {
  refreshAgenda: (done) => {
    console.log(new Date(1543618800000))
    console.log(new Date(1538344800000))
    app.davinciApi.getAgenda({
      prima: 1543618800,
      dopo:  1538344800
    }).then( (data) => console.log('agenda', data)).catch( (err) => console.log("error",err))
  }
} */
