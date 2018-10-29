
app.data.comunicatiStudenti  = JSON.parse(localStorage.comunicatiStudenti  || '[]')
app.data.comunicatiLetti     = JSON.parse(localStorage.comunicatiLetti     || '[]')
app.data.comunicatiPreferiti = JSON.parse(localStorage.comunicatiPreferiti || '[]')



/** Storage
In questo file sono contenuti tutti i metodi che consentono di memorizzare
dati all'interno del browser/ di leggere dalla sessione precedente */

app.storage = {}

var vm = new Vue({  
  el: '#app', 
  data: app.data,
  watch: {
    comunicatiStudenti () { localStorage.comunicatiStudenti  = JSON.stringify(this.comunicatiStudenti )  },
    comunicatiLetti    () { localStorage.comunicatiLetti     = JSON.stringify(this.comunicatiLetti    )  },
    comunicatiPreferiti() { localStorage.comunicatiPreferiti = JSON.stringify(this.comunicatiPreferiti)  },

  },
 })
console.log("Vue")

app.actions.refreshComunicatiStudenti()
