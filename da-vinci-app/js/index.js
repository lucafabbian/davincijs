
app.data.comunicatiStudenti = []


var vm = new Vue({  
  el: '#app', 
  data: app.data
 })
console.log("Vue")

refreshComunicatiStudenti(function(){console.log("doen!")})
