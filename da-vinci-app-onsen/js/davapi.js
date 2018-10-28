var apiUrl = "http://www.liceodavinci.tv/api/";

function isOnline() {
    axios.get(apiUrl+"teapot")
        .then(function (response) {
            return (response.status == 418);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getAgenda() {
}

function getClassi() {
}

function getComunicatiStudenti(last_n) {
}

function getComunicatiGenitori(last_n) {
}

function getComunicatiDocenti(last_n) {
}

function getDocenti() {
}

function getOrarioClasse(classe) {
}

function getOrarioDocente(docente) {
}

console.log(isOnline());
