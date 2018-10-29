
app.data.comunicatiStudenti = []


var vm = new Vue({  
  el: '#app', 
  data: app.data
 })
console.log("Vue")

app.davinciApi.getComunicatiStudenti()
  .then(function (result) {
    app.data.comunicatiStudenti = result.data;
  });
