/** Node davincijs testserver
Piccolo server che consente di testare l'app senza incorrere in problemi di 
cross origin. 
http://localhost:3000     -> l'App, servita in modo statico
http://localhost:3000/api -> reindirizza verso http://www.liceodavinci.tv/api/
*/


// Da Vinci api (questi metodi consentono di ottenere i dati dal sito del liceo)
const axios = require('axios');
const app = {}
app.davinciApi = {
  
  // Base url
  apiUrl: "http://www.liceodavinci.tv/api/",
  
  // Check if api is online
  isOnline: () => axios.get(app.davinciApi.apiUrl+"teapot")
    .catch(function (error) { return error.response.status === 418; }),

  // Generic requests
  getAgenda: (filter) => axios.post(app.davinciApi.apiUrl + "agenda", filter),
  getClassi: ()       => axios.get(app.davinciApi.apiUrl + "classi"),
  getOrarioClasse: (classe) => axios.get(app.davinciApi.apiUrl+"orario/"+classe),
  getDocenti: () => axios.get(app.davinciApi.apiUrl+"docenti"),
  getOrarioDocente: (docente) => axios.post(app.davinciApi.apiUrl+"orario/docente", docente),
  
  // Comunicati
  getComunicatiStudenti: (last_n = '') => axios.get(app.davinciApi.apiUrl+"comunicati/studenti/" + last_n ),
  getComunicatiGenitori: (last_n = '') => axios.get(app.davinciApi.apiUrl+"comunicati/genitori/" + last_n ),
  getComunicatiDocenti : (last_n = '') => axios.get(app.davinciApi.apiUrl+"comunicati/docenti/"  + last_n ),

}


// Server
const express = require('express')
const expr = express()  // Main server
const port = 3000       // Porta in cui viene servito

// App (come sito statico)
expr.use('/', express.static('../da-vinci-app')) 
expr.use(express.json()) 

// Reindirizzamenti
expr.get('/api/comunicati/studenti*', function (req, res) { // Comunicati studenti
  console.log("Ricevuta richiesta per: " + req.originalUrl)
  app.davinciApi.getComunicatiStudenti().then( (data) => res.send(data.data))
})
expr.get('/api/comunicati/genitori*', function (req, res) { // Comunicati genitori
  console.log("Ricevuta richiesta per: " + req.originalUrl)
  app.davinciApi.getComunicatiGenitori().then( (data) => res.send(data.data))
})
expr.get('/api/comunicati/docenti*', function (req, res) {  // Comunicati docenti
  console.log("Ricevuta richiesta per: " + req.originalUrl)
  app.davinciApi.getComunicatiDocenti().then( (data) => res.send(data.data))
})
expr.post('/api/agenda', function (req, res) {              // Agenda
  console.log("Ricevuta richiesta per: " + req.originalUrl)
  console.log('con parametri ', req.body);
  app.davinciApi.getAgenda(req.body).then( 
    (data) => res.send(data.data)
  ).catch((err) => console.log('error on getting agenda'))
})


const request = require('request')
const fs = require('fs')
expr.get('/comunicati/*', function(req, res) {
    console.log("Proxying stuff");
    console.log("Ricevuta richiesta per: " + req.originalUrl)
    request.get('http://www.liceodavinci.tv/sitoLiceo/images' + req.originalUrl)
  .on('response', function(response) {
    console.log(response.statusCode) 
    console.log(response.headers['content-type'])
  })
  .on('end', function(){
     // store pdf into DB here.
     fs.createReadStream('pdf-sample.pdf').pipe(res); // send the pdf to client
  }).pipe(fs.createWriteStream('pdf-sample.pdf'))
})

// Si ferma per ascoltare le richieste in arrivo
expr.listen(port, () => console.log(`Per vedere l'app apri il browser su:\n    http://localhost:${port}/#davinciapi=testlocal`))