# DaVinci JS
App non ufficiale del Liceo Scientifico Statale "Leonardo Da Vinci" di Treviso.
Si tratta di un'alternativa all'app del Liceo esistente che, pur appoggiandosi
sugli stessi meccanismi (l'api presente qui http://www.liceodavinci.tv/api), è
stata interamente riscritta nel linguaggio javascript (Vue.js),così da essere
più immediata da modificare aggiungendo nuove funzionalità e, allo stesso tempo,
funzionare anche sui dispositivi diversi da Android (sia iPhone che computer o
tablet), oltre che come sito web, mantenendo lo stesso codice.


# Per gli utenti
Attualmente l'app è ancora in lavorazione. È però presente una demo qui:
[https://lucafabbian.github.io/davincijs/](https://lucafabbian.github.io/davincijs/)  
Enjoy!


# Per gli sviluppatori
Modificare l'app non richiede conoscenze approfondite: è sufficiente conoscere
una base di html, css, javascript e aver seguito la guida preliminare di [Vue.js](https://vuejs.org/v2/guide/),
la libreria javascript a cui si appoggia il codice.

Per creare un plugin non sono necessari software di alcun genere, ma è sufficiente
un editor di testo. Riferirsi alla [guida sui plugin](./docs/PLUGIN.md) per
maggiori informazioni.

Per modificare il cuore dell'app, va invece installato il programma
[Node.js](https://nodejs.org/it/), che si occupa di gestire il processo di
ottimizzazione e concatenazione dei file.


## Installazione
Dalla versione 0.0.2, il codice sorgente di base è ottimizzato utilizzando il software
rollup, che si può invocare direttamente da Node.js scrivendo:
```bash
npm install    # solo la prima volta
npm run watch  # lancerà il tutto in modalità sviluppatore, ricompila a ogni salvataggio
```
A questo punto è sufficiente aprire un browser su [http://0.0.0.0:10001/debug.html](http://0.0.0.0:10001/debug.html)
per vedere un'anteprima dell'app. Il supporto per il livereload è attivo di
default, per cui a ogni salvataggio di un file verrà ricompilato tutto e la
pagina si refresherà automaticamente.

Per creare la versione ottimizzata per la release:
```bash
npm run build
```

## Struttura del progetto
Tutto il codice di base è contenuto in `src/`, una volta preprocessato viene copiato in `dist/`, dove sono presenti anche tutte quelle risorse statiche che non necessitano di preprocessing.

# Autori e Licenza
- Luca Fabbian
- Antonio Napolitano

L'app è rilasciata sotto licenza [GPL v3](LICENSE)
