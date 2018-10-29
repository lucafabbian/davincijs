
app.data.comunicatiStudenti  = JSON.parse(localStorage.comunicatiStudenti  || '[]')
app.data.comunicatiGenitori  = JSON.parse(localStorage.comunicatiGenitori  || '[]')
app.data.comunicatiDocenti   = JSON.parse(localStorage.comunicatiDocenti   || '[]')
app.data.comunicatiLetti     = JSON.parse(localStorage.comunicatiLetti     || '[]')
app.data.comunicatiPreferiti = JSON.parse(localStorage.comunicatiPreferiti || '[]')
app.data.defaultPage         = (localStorage.defaultPage||'app-page-comunicati-studenti')
<<<<<<< HEAD
app.data.page = defaultPage
=======
>>>>>>> 30a5b376488375e9f12c4800c911e018a48a8ca6



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
    defaultPage        () { localStorage.defaultPage         = this.defaultPage                          },

  },
 })
console.log("Vue")

window.app.data.page = app.data.defaultPage // Set default page

app.actions.refreshComunicatiStudenti()
app.actions.refreshComunicatiGenitori()
app.actions.refreshComunicatiDocenti()
