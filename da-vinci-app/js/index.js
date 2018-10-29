
app.data.comunicatiStudenti = [];
app.data.comunicatiGenitori = [];
app.data.comunicatiDocenti = [];
app.data.comunicatiLetti = [];
app.data.comunicatiPreferiti = [];



/** Storage
In questo file sono contenuti tutti i metodi che consentono di memorizzare
dati all'interno del browser/ di leggere dalla sessione precedente */

app.storage = {}

var vm = new Vue({  
  el: '#app', 
  data: app.data,
 })
console.log("Vue")

app.actions.refreshComunicatiStudenti()
app.actions.refreshComunicatiGenitori()
app.actions.refreshComunicatiDocenti()
