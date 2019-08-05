<template>
  <dav-app-page :title="title" :scrollable="!isPdfViewer" :infinite-scroll="infiniteScroll">

    <!-- Toolbar -->
    <template slot="icons">
      <span v-if="isPdfViewer">
        <dav-icon icon="md-share" @click="alert('ciao')"></dav-icon>
        <dav-icon icon="md-close" @click="closePdf()"></dav-icon>
      </span>
    </template>

    <v-ons-list>
      <!-- Visualizzatore pdf -->
      <dav-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></dav-pdfviewer>

      <!-- Lista comunicati -->
      <dav-comunicato v-else v-for="(comunicato, index) in comunicatiCaricati"
      :comunicato="comunicato"
       :isRead="comunicato.isRead"
       @openpdf="openPdf(comunicato)"
       @togglepref="togglePref(comunicato)"
       ></dav-comunicato>
       <span v-if="comunicati.length === 0">
          <v-ons-icon icon="md-spinner" size="28px" spin></v-ons-icon>
       </span>
    </v-ons-list>

  </dav-app-page>
</template>
<script>

const types = {
  "genitori": { title: 'Comunicati genitori', comunicati:'comunicatiGenitori'},
  "studenti": { title: 'Comunicati genitori', comunicati:'comunicatiGenitori'},
  "docenti" : { title: 'Comunicati docenti',  comunicati:'comunicatiDocenti'},
}

export default {
  props: ['type'],
  data(){
    return {
      comunicatiDaCaricare: 15,
      isPdfViewer: false,
      pdfViewerUrl: "file.pdf",
    }
  },
  computed: {
    title()     { return types[this.type].title },
    comunicati(){ return types[this.type].comunicati},

    comunicatiCaricati(){
      return this.$davinciApi.vue[this.comunicati]
        .slice(0, this.comunicatiDaCaricare)
    }
  },
  methods: {
    infiniteScroll(done){
      this.comunicatiDaCaricare+=7
      done()
    },
    openPdf(comunicato){
      this.$davinciApi.vue.addRead(comunicato)
      console.log(this.$davinciApi.vue.readList)
      this.pdfViewerUrl = comunicato.url
      this.isPdfViewer = true
    },
    closePdf(){
      this.isPdfViewer = false
    },
    togglePref(comunicato){
      console.log('preffff')
      comunicato.isPref
        ? this.$davinciApi.vue.removePref(comunicato)
        : this.$davinciApi.vue.addPref   (comunicato)
    }

  },
}
</script>
