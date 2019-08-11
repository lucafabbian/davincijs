<template>
  <dav-app-page :title="title" :scrollable="!isPdfViewer" :infinite-scroll="infiniteScroll">

    <!-- Toolbar -->
    <template slot="icons">
      <span v-if="isPdfViewer">
        <dav-icon icon="md-share" @click="alert('ciao')"></dav-icon>
        <dav-icon icon="md-close" @click="closePdf()"></dav-icon>
      </span>
      <span v-else>
        <dav-icon icon="md-refresh"  @click="refresh()" :spin="refreshing"></dav-icon>
        <dav-icon :icon="onlyPrefs ? 'md-long-arrow-return':'md-star'"  @click="onlyPrefs = !onlyPrefs"></dav-icon>

      </span>
    </template>

    <v-ons-list>
      <!-- Visualizzatore pdf -->
      <dav-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></dav-pdfviewer>

      <!-- Lista comunicati -->
      <dav-comunicato v-else v-for="(comunicato, index) in comunicatiCaricati"
      :comunicato="comunicato"
       :isPref="isPref(comunicato)"
       :isRead="$store.comunicatiLetti.includes($davinciApi.serializeComunicato(comunicato))"
       @openpdf="openPdf(comunicato)"
       @togglepref="togglePref(comunicato)"
       ></dav-comunicato>
       <span v-if="comunicati.length === 0">
          <v-ons-icon :icon="md-spinner" size="28px" spin></v-ons-icon>
       </span>
    </v-ons-list>
    <p style="text-align: center; opacity: 0.6;">
      {{ onlyPrefs && comunicatiCaricati.length === 0 ? 'Nessun preferito selezionato!' :'' }}
    </p>
  </dav-app-page>
</template>
<script>

const types = {
  "studenti": { title: 'Comunicati studenti', comunicati:'comunicatiStudenti', url:"studenti"},
  "genitori": { title: 'Comunicati genitori', comunicati:'comunicatiGenitori', url:"genitori"},
  "docenti" : { title: 'Comunicati docenti',  comunicati:'comunicatiDocenti',  url:"docenti"},
}

export default {
  props: ['type'],
  data(){
    return {
      comunicatiDaCaricare: 15,
      isPdfViewer: false,
      pdfViewerUrl: "file.pdf",
      onlyPrefs: false,
      refreshing: false,
    }
  },
  computed: {
    title()     { return types[this.type].title },
    comunicati(){ return types[this.type].comunicati},
    url()       { return types[this.type].url},

    comunicatiCaricati(){
      return this.$store.dav[this.comunicati]
        .filter( comunicato => !this.onlyPrefs || this.isPref(comunicato))
        .slice(0, this.comunicatiDaCaricare)
    }
  },
  methods: {
    infiniteScroll(done){
      this.comunicatiDaCaricare+=7
      done()
    },
    openPdf(comunicato){
      this.$store.comunicatiLetti= [
        ...this.$store.comunicatiLetti,
        this.$davinciApi.serializeComunicato(comunicato)
      ]
      this.pdfViewerUrl = comunicato.url
      this.isPdfViewer = true
    },
    closePdf(){
      this.isPdfViewer = false
    },
    isPref(comunicato){
      return this.$store.comunicatiPreferiti.includes(
        this.$davinciApi.serializeComunicato(comunicato)
      )
    },
    togglePref(comunicato){
      let serializedComunicato = this.$davinciApi.serializeComunicato(comunicato)
      if(this.$store.comunicatiPreferiti.includes(serializedComunicato)){
        this.$store.comunicatiPreferiti = this.$store.comunicatiPreferiti.filter(
          comunicato => comunicato !== serializedComunicato
        )
      }else{
        this.$store.comunicatiPreferiti = [
          ...this.$store.comunicatiPreferiti,
          serializedComunicato
        ]
      }
    },
    refresh(){
      if(this.refreshing) return
      this.refreshing = true
      const finish = (msg) => {
          this.$ons.notification.toast(msg, { timeout: 1300 })
          this.refreshing = false
      }
      this.$davinciApi.fetchComunicati(this.comunicati, this.url)
        .then( () => finish('Lista comunicati aggiornata!'))
        .catch(() => finish('Errore. Non sono riuscito a connettermi.'))
    },

  },
}
</script>
