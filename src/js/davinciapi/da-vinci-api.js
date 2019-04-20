/** Da Vinci Api
In questo file sono contenuti tutti i metodi necessari per comunicare con il
server del liceo. **/
import axios from 'axios'

export default new function(){
  // Crea l'oggetto con cui fare le richieste all'api
  const api = axios.create({ baseURL: 'https://davapi.antonionapolitano.eu/' })

  // Qui verranno cachate le richieste ottenute (e salvate in localStorage)
  this.data = {
    comunicatiStudenti: JSON.parse(localStorage.comunicatiStudenti  || '[]'),
    comunicatiGenitori: JSON.parse(localStorage.comunicatiGenitori  || '[]'),
    comunicatiDocenti : JSON.parse(localStorage.comunicatiDocenti   || '[]'),
    immaginiSlideshow : JSON.parse(localStorage.immaginiSlideshow   || '[]'),
  }

  // Restituisce l'url dei comunicati
  this.urlComunicato = (url) => url.replace('http://www.liceodavinci.tv/', 'https://davapi.antonionapolitano.eu/');

  // Controlla se l'api e' online
  this.isOnline = () => api.get('api/teapot').catch( (err) => err.response.status === 418 )

  // Richieste generiche
  this.agenda       = (filter)  => api.post('api/agenda', filter)
  // il filtro è una stringa JSON del tipo {"prima":xxxxxxxxxx,"dopo":yyyyyyyyyy} con x e y le rappresentazioni in tempo unix dell'intervallo di tempo da considerare
  this.classi       = ()        => api.get ('api/classi')
  this.orarioClasse = (classe)  => api.get ('api/orario/' + classe)
  this.docenti      = ()        => api.get ('api/docenti')
  this.orarioDocente= (docente) => api.post('api/orario/docente/', docente)

  // Comunicati
  const comunicati = (obj, url, last) => new Promise( (resolve, reject) => {
    last = (last == undefined) ? '' : '/' + last; // aggiungi uno slash solo se last non è nullo
    // aggiungere sempre lo slash alla fine causa dei redirect inutili
    api.get(url + last).then( (result) => {
      localStorage[obj] = JSON.stringify(result.data);
      resolve(this.data[obj] = result.data);
    })
  })

  this.comunicatiStudenti = (last) => comunicati('comunicatiStudenti', 'api/comunicati/studenti', last)
  this.comunicatiGenitori = (last) => comunicati('comunicatiGenitori', 'api/comunicati/genitori', last)
  this.comunicatiDocenti  = (last) => comunicati('comunicatiDocenti' , 'api/comunicati/docenti' , last)
  this.immaginiSlideshow  = () => new Promise ( (resolve, reject) => {
    var el = document.createElement('html');

    api.get("sitoLiceo/index.php").then((response) => {
      el.innerHTML = response.data; resolve(console.log(el.getElementsByTagName('ul')))
    });
  })

  this.refresh = () => {
    this.comunicatiStudenti()
    this.comunicatiGenitori()
    this.comunicatiDocenti()
    //this.immaginiSlideshow()
  }

}()

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
