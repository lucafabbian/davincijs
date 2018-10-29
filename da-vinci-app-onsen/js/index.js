


var vm = new Vue({  
  el: '#app', 
  data: app.data
 })
console.log("Vue")
app.davinciApi.isOnline()
  .then(function (result) {
    console.log("Api online: "+result);
  });
