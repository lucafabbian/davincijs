app.davinciApi = {};

app.davinciApi.apiUrl = "http://www.liceodavinci.tv/api/";

app.davinciApi.isOnline = function () {
    return axios.get(app.davinciApi.apiUrl+"teapot")
        .catch(function (error) {
            return error.response.status == 418;
        });
}

app.davinciApi.getAgenda = function (filter) {
    return axios.post(app.davinciApi.apiUrl+"agenda", filter);
}

app.davinciApi.getClassi = function () {
    return axios.get(app.davinciApi.apiUrl+"classi");
}

app.davinciApi.getComunicatiStudenti = function (last_n) {
    return axios.get(app.davinciApi.apiUrl+"comunicati/studenti/"+last_n);
}

app.davinciApi.getComunicatiGenitori = function (last_n) {
    return axios.get(app.davinciApi.apiUrl+"comunicati/genitori/"+last_n);
}

app.davinciApi.getComunicatiDocenti = function (last_n) {
    return axios.get(app.davinciApi.apiUrl+"comunicati/docenti/"+last_n);
}

app.davinciApi.getDocenti = function () {
    return axios.get(app.davinciApi.apiUrl+"docenti");
}

app.davinciApi.getOrarioClasse = function (classe) {
    return axios.get(app.davinciApi.apiUrl+"orario/"+classe);
}

app.davinciApi.getOrarioDocente = function (docente) {
    return axios.post(app.davinciApi.apiUrl+"orario/docente", docente);
}
