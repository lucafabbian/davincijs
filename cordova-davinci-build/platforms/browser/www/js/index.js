
app.data.comunicatiStudenti  = JSON.parse(localStorage.comunicatiStudenti  || '[]')
app.data.comunicatiGenitori  = JSON.parse(localStorage.comunicatiGenitori  || '[]')
app.data.comunicatiDocenti   = JSON.parse(localStorage.comunicatiDocenti   || '[]')
app.data.comunicatiLetti     = JSON.parse(localStorage.comunicatiLetti     || '[]')
app.data.comunicatiPreferiti = JSON.parse(localStorage.comunicatiPreferiti || '[]')
app.data.defaultPage         = (localStorage.defaultPage||'app-page-comunicati-studenti')

app.data.page = localStorage.page || 'app-page-home' // Set default page



/** Storage
In questo file sono contenuti tutti i metodi che consentono di memorizzare
dati all'interno del browser/ di leggere dalla sessione precedente */

app.storage = {}

var vm = new Vue({  
  el: '#app', 
  data: app.data,
  watch: {
    comunicatiStudenti () { localStorage.comunicatiStudenti  = JSON.stringify(this.comunicatiStudenti )  },
    comunicatiGenitori () { localStorage.comunicatiGenitori  = JSON.stringify(this.comunicatiGenitori )  },
    comunicatiDocenti  () { localStorage.comunicatiDocenti   = JSON.stringify(this.comunicatiDocenti  )  },
    comunicatiLetti    () { localStorage.comunicatiLetti     = JSON.stringify(this.comunicatiLetti    )  },
    comunicatiPreferiti() { localStorage.comunicatiPreferiti = JSON.stringify(this.comunicatiPreferiti)  },
    page               () { localStorage.page                = this.page                          },

  },
 })
console.log("Vue")


app.actions.refreshComunicatiStudenti()
app.actions.refreshComunicatiGenitori()
app.actions.refreshComunicatiDocenti()
app.actions.refreshAgenda()

