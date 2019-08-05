# DaVinci JS
App non ufficiale del Liceo Scientifico Statale "Leonardo Da Vinci" di Treviso.
Si tratta di un'alternativa all'app del Liceo esistente che, pur appoggiandosi
sugli stessi meccanismi (l'api presente qui http://www.liceodavinci.tv/api), è
stata interamente riscritta nel linguaggio javascript (Vue.js),così da essere
più immediata da modificare aggiungendo nuove funzionalità e, allo stesso tempo,
funzionare anche sui dispositivi diversi da Android (sia iPhone che computer o
tablet), oltre che come sito web, mantenendo lo stesso codice.


# Per gli utenti
Attualmente l'app è ancora in lavorazione. Appena sarà disponibile una versione
sufficientemente completa, metteremo a disposizione una demo.


# Per gli sviluppatori
## Prerequisiti
Modificare l'app non richiede conoscenze approfondite: è sufficiente conoscere
una base di html, css, javascript e aver seguito la guida preliminare di [Vue.js](https://vuejs.org/v2/guide/),
la libreria javascript a cui si appoggia il codice.


## Installazione
Dalla versione 0.0.2, il codice sorgente di base è ottimizzato grazie a rollup,
che si può invocare direttamente da Node.js scrivendo:
```bash
npm install    # solo la prima volta
npm run watch  # lancerà il tutto in modalità sviluppatore, ricompila a ogni salvataggio
```
A questo punto è sufficiente aprire un browser su [http://0.0.0.0:10001](http://0.0.0.0:10001)
per vedere un'anteprima dell'app.

## Struttura del progetto
Tutto il codice di base è contenuto in `src/`, una volta preprocessato viene copiato in `dist/`, dove sono presenti anche tutte quelle risorse statiche che non necessitano di preprocessing.


# Licenza
L'app è rilasciata sotto licenza [GPL v3](LICENSE), gli autori sono elencati [qui](AUTHORS.md)
