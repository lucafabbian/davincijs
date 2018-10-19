Questa pagina fornisce un riassunto su come scaricare il codice, testare delle modifiche, e usarlo per creare un'app.
Per degli esempi concreti su come aggiungere funzionalità all'app, guarda piuttosto [questa pagina](EXTENDING.md)


# Installing
(Nota: prima di proseguire assicurati di avere installato sul tuo computer i programmi [git](https://git-scm.com/) e [Node.js](https://nodejs.org/en/)).

Crea una nuova cartella, entraci, ed apri un terminale (su windows premi shift+tasto destro -> apri un terminale), e digita:
```bash
git clone https://github.com/lucafabbian/davinciapp.git
```

Questo comando scaricherà una copia del codice sul pc. A questo punto apri un nuovo terminale nella sottocartella da-vinci-app e digita:
```bash
npm install
```

# Running
Ogni volta che vuoi modificare l'app e vedere che effetto hanno le modifiche, usa il comando:
```bash
npm run serve
```
Adesso, se apri un browser al link [http://localhost:8080](http://localhost:8080), vedrai la versione web dell'app. Ogni volta che modificherai il codice e lo salverai, la pagina si ricaricherà in automatico.
