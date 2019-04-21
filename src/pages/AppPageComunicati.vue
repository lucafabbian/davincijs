<template>
  <app-page
  :title="title"
  scrollable
  :infinite-scroll="infiniteScroll"
  >
    <template slot="actions">
      <span v-if="isPdfViewer">
        <app-nav-action icon="md-share" v-on:action="alert('ciao')"></app-nav-action>
        <app-nav-action icon="md-close" v-on:action="togglePdf"></app-nav-action>
      </span>
    </template>
    <app-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></app-pdfviewer>
    <span v-if="comunicati.length === 0 && !isPdfViewer">
       <v-ons-icon icon="md-spinner" size="28px" spin></v-ons-icon>
    </span>
    <v-ons-list>
      <app-card-comunicato v-for="(comunicato, index) in comunicatiCaricati"
       :comunicato="comunicato"
       :isRead="$root.comunicatiLetti.includes(comunicato)"
       @openpdf="
       pdfViewerUrl = comunicato.url;
       togglePdf()"
       ></app-card-comunicato>
    </v-ons-list>
  </app-page>
</template>
<script>
import AppCardComunicato from '../components/AppCardComunicato.vue'
import AppPdfviewer      from '../components/AppPdfviewer.vue'
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
  components: {
    AppPdfviewer,
    AppCardComunicato,
  }
}
</script>
