/** Da Vinci Api
In questo file sono contenuti tutti i metodi necessari per comunicare con il
server del liceo. 
NOTA: il browser deve avere abilitato il cross-origin */

/* In app.davinciApi sono contenute le chiamate al server */
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
  getComunicatiStudenti: (last_n = undefined) => axios.get(app.davinciApi.apiUrl+"comunicati/studenti/" + (last_n ? last_n : "")),
  getComunicatiGenitori: (last_n = undefined) => axios.get(app.davinciApi.apiUrl+"comunicati/genitori/" + (last_n ? last_n : "")),
  getComunicatiDocenti : (last_n = undefined) => axios.get(app.davinciApi.apiUrl+"comunicati/docenti/"  + (last_n ? last_n : "")),

}

/* In app.actions sono contenuti i metodi per aggiornare i dati in base 
alla risposta di app.davinciApi */
app.actions = {
  refreshComunicatiStudenti: (done) => {
    app.davinciApi.getComunicatiStudenti()
      .then(function (result) {
        app.data.comunicatiStudenti = result.data;
        if(done) done();
      });
  },
  
  
}
