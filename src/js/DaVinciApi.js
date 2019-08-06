/** DaVinciApi 2.0
Nuova versione del codice che consente

In questo file sono contenuti tutti i metodi necessari per comunicare con il
server del liceo. */

import axios from 'axios'
const api = axios.create({ baseURL: 'https://davapi.antonionapolitano.eu/' })

/** */
const store = {

}

/** Funzioni per il DaVinciApi */
const $davinciapi = new function(Vue){
  const update = (key, value) => Vue.prototype.$store[key] = value



}


/** */
export default {install(Vue){Vue.prototype.$davinciApi = $davinciApi}, store}
