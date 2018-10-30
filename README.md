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
Per rendere il tutto più immediato si è scelto di scrivere l'app semplicemente 
con normale html/css/javascript, senza fare uso di strumenti preprocessori.


Per poter testare il codice, è però necessario avvalersi di node.js, che farà da ponte
fra il proprio computer e il server della scuola. Dopo aver installato node.js
sul proprio pc, bisogna aprire un terminale nella cartella api-server e digitare 
```bash
npm install  #solo la prima volta
node index.js
```
A questo punto è sufficiente aprire un browser su [http://localhost:3000](http://localhost:3000)
per vedere un'anteprima dell'app.

## Struttura del progetto
L'intero codice è contenuto nella cartella da-vinci-app, tutte le librerie sono 
contenute nella sottocartella ```res```, mentre i file javascript sono all'interno della
sottocartella ```js```.


# Licenza
L'app è rilasciata sotto licenza [GPL v3](LICENSE), gli autori sono elencati [qui](AUTHORS.md)
