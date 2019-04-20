<template>
  <app-page :title="title" :scrollable="scrollEnabled">
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
      <v-ons-lazy-repeat
      :render-item="comunicato"
      :length="$davinciApi.data.reactiveWrapper[comunicati].length"
      :calculate-item-height="itemHeight"
      ></v-ons-lazy-repeat>
    </v-ons-list>
        <!--
        <app-card-comunicato v-for="(comunicato, index) in $davinciApi.data.reactiveWrapper[comunicati]"
         :comunicato="comunicato"
         v-on:openPdf="pdfViewerUrl = $event; togglePdf()" > </app-card-comunicato>
       -->
  </app-page>
</template>
<script>
import AppCardComunicato from '../components/AppCardComunicato.vue'
import AppPdfviewer      from '../components/AppPdfviewer.vue'
export default {
  props: ['title', 'comunicati'],
  data(){
    return {
      scrollEnabled: true,
      isPdfViewer: false,
      pdfViewerUrl: "file.pdf",
      comunicato: index => new this.$vue({
        render: h => h(AppCardComunicato, {
          props: {
            comunicato: this.$davinciApi.data.reactiveWrapper[this.comunicati][index],
            isRead: this.$root.comunicatiLetti.includes(
              this.$davinciApi.data.reactiveWrapper[this.comunicati]
            )
          }
        })
      })
    }
  },
  methods: {
    togglePdf(){ this.scrollEnabled=  !(this.isPdfViewer = !this.isPdfViewer)},
    itemHeight(){ return 80; },
  },
  components: {
    AppPdfviewer,
  }
}
</script>
