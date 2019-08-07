<template>
  <dav-app-page :title="title" :scrollable="!isPdfViewer" :infinite-scroll="infiniteScroll">

    <!-- Toolbar -->
    <template slot="icons">
      <span v-if="isPdfViewer">
        <dav-icon icon="md-share" @click="alert('ciao')"></dav-icon>
        <dav-icon icon="md-close" @click="closePdf()"></dav-icon>
      </span>
      <span v-else>
        <dav-icon icon="md-refresh"  @click="changeDate(month - 1)"></dav-icon>
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
    <p style="text-align: center; opacity: 0.6; margin-top: 20px;">
      {{ onlyPrefs && comunicatiCaricati.length === 0 ? 'Nessun preferito selezionato!' :'' }}
    </p>
  </dav-app-page>
</template>
<script>

const types = {
  "studenti": { title: 'Comunicati studenti', comunicati:'comunicatiStudenti'},
  "genitori": { title: 'Comunicati genitori', comunicati:'comunicatiGenitori'},
  "docenti" : { title: 'Comunicati docenti',  comunicati:'comunicatiDocenti'},
}

export default {
  props: ['type'],
  data(){
    return {
      comunicatiDaCaricare: 15,
      isPdfViewer: false,
      pdfViewerUrl: "file.pdf",
      onlyPrefs: false,
    }
  },
  computed: {
    title()     { return types[this.type].title },
    comunicati(){ return types[this.type].comunicati},

    comunicatiCaricati(){
      return this.$store[this.comunicati]
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
    }

  },
}
</script>
