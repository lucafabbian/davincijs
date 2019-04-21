<template>
  <dav-app-page
  :title="title"
  scrollable
  :infinite-scroll="infiniteScroll"
  >
    <template slot="icons">
      <span v-if="isPdfViewer">
        <dav-icon icon="md-share" @click="alert('ciao')"></dav-icon>
        <dav-icon icon="md-close" @click="togglePdf"></dav-icon>
      </span>
    </template>
    <dav-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></dav-pdfviewer>
    <span v-if="comunicati.length === 0 && !isPdfViewer">
       <v-ons-icon icon="md-spinner" size="28px" spin></v-ons-icon>
    </span>
    <v-ons-list>
      <dav-comunicato v-for="(comunicato, index) in comunicatiCaricati"
       :comunicato="comunicato"
       :isRead="$root.comunicatiLetti.includes(comunicato)"
       @openpdf="
       pdfViewerUrl = comunicato.url;
       togglePdf()"
       ></dav-comunicato>
    </v-ons-list>
  </dav-app-page>
</template>
<script>
export default {
  props: ['title', 'comunicati'],
  data(){
    return {
      comunicatiDaCaricare: 15,
      isPdfViewer: false,
      pdfViewerUrl: "file.pdf",

    }
  },
  computed: {
    comunicatiCaricati(){
      return this.$davinciApi.data.reactiveWrapper[this.comunicati].slice(
        0,
        this.comunicatiDaCaricare
      )
    }
  },
  methods: {
    togglePdf(){
      console.log('toggling pdf')
      this.scrollEnabled=  !(this.isPdfViewer = !this.isPdfViewer)
    },
    itemHeight(){ return 80; },
    infiniteScroll(done){
      this.comunicatiDaCaricare+=7
      done()
    }
  },
}
</script>
