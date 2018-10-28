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
  getComunicatiStudenti: (last_n = 20) => axios.get(app.davinciApi.apiUrl+"comunicati/studenti/"+last_n),
  getComunicatiGenitori: (last_n = 20) => axios.get(app.davinciApi.apiUrl+"comunicati/genitori/"+last_n),
  getComunicatiDocenti : (last_n = 20) => axios.get(app.davinciApi.apiUrl+"comunicati/docenti/"+last_n),

}
