/** Da Vinci Api
In questo file sono contenuti tutti i metodi necessari per comunicare con il
server del liceo. 
NOTA: il browser deve avere abilitato il cross-origin */


window.davinciApi = new function(){
  // Controlla se e' attivata la test mode (bisogna appendere davinciapi=testlocal all'url)
  const isTest = window.location.hash.includes('davinciapi=testlocal')
  
  // Crea l'oggetto con cui fare le richieste all'api
  const api = axios.create({ baseURL: (isTest ? '/api/' : 'http://www.liceodavinci.tv/api') })
  
  // Qui verranno cachate le richieste ottenute (e salvate in localStorage)
  this.data = {
    comunicatiStudenti: JSON.parse(localStorage.comunicatiStudenti  || '[]'),
    comunicatiGenitori: JSON.parse(localStorage.comunicatiGenitori  || '[]'),
    comunicatiDocenti : JSON.parse(localStorage.comunicatiDocenti   || '[]'),
  }
  
  console.log(localStorage.comunicatiStudenti)
  
  // Restituisce l'url dei comunicati (viene modificato se siamo in test mode)
  this.urlComunicato = (url) => (isTest ? url.replace('http://www.liceodavinci.tv/sitoLiceo/images', '') : url)
  
  // Controlla se l'api e' online
  this.isOnline = () => api.get('teapot').catch( (err) => err.response.status === 418 )

  // Richieste generiche
  const agenda       = (filter)  => api.post('agenda', filter  )
  const classi       = ()        => api.get ('classi')
  const orarioClasse = (classe)  => api.get ('orario/' + classe)
  const docenti      = ()        => api.get ('docenti')
  const orarioDocente= (docente) => api.post('orario/docente', docente)
  
  // Comunicati
  const comunicati = (obj, url, last = '') => new Promise( (resolve, reject) => {
    api.get(url + last).then( (result) => resolve(localStorage[obj] = this.data[obj] = result.data) )
  })
  
  this.comunicatiStudenti = (last) => comunicati('comunicatiStudenti', '/comunicati/studenti/', last)
  this.comunicatiGenitori = (last) => comunicati('comunicatiGenitori', '/comunicati/genitori/', last)
  this.comunicatiDocenti  = (last) => comunicati('comunicatiDocenti' , '/comunicati/docenti/' , last)
  
  this.refresh = () => {
    this.comunicatiStudenti()
    this.comunicatiGenitori()
    this.comunicatiDocenti()
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
