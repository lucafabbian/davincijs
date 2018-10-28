var apiUrl = "http://www.liceodavinci.tv/api/";

function isOnline() {
    return axios.get(apiUrl+"teapot")
        .catch(function (error) {
            return error.response.status == 418;
        });
}

function getAgenda(filter) {
    return axios.post(apiUrl+"agenda", filter);
}

function getClassi() {
    return axios.get(apiUrl+"classi");
}

function getComunicatiStudenti(last_n) {
    return axios.get(apiUrl+"comunicati/studenti/"+last_n);
}

function getComunicatiGenitori(last_n) {
    return axios.get(apiUrl+"comunicati/genitori/"+last_n);
}

function getComunicatiDocenti(last_n) {
    return axios.get(apiUrl+"comunicati/docenti/"+last_n);
}

function getDocenti() {
    return axios.get(apiUrl+"docenti");
}

function getOrarioClasse(classe) {
    return axios.get(apiUrl+"orario/"+classe);
}

function getOrarioDocente(docente) {
    return axios.post(apiUrl+"orario/docente", docente);
}
