<template>
  <app-page :title="title" :scrollable="scrollEnabled">
    <template slot="actions">
      <span v-if="isPdfViewer">
        <app-nav-action icon="md-share" v-on:action="alert('ciao')"></app-nav-action>
        <app-nav-action icon="md-close" v-on:action="togglePdf"></app-nav-action>
      </span>
    </template>
    <app-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></app-pdfviewer>
    <div v-show="!isPdfViewer">
      <span v-if="comunicati.length === 0">
         <v-ons-icon icon="md-spinner" size="28px" spin></v-ons-icon>
      </span>
      <span v-else>
        <!--
        <v-ons-lazy-repeat
        :render-item="comunicato"
        :length="$davinciApi.data.reactiveWrapper[comunicati].length"
        ></v-ons-lazy-repeat>
      -->
        <!--
        <app-card-comunicato v-for="(comunicato, index) in $davinciApi.data.reactiveWrapper[comunicati]"
         :comunicato="comunicato"
         v-on:openPdf="pdfViewerUrl = $event; togglePdf()" > </app-card-comunicato>
       -->
      </span>
    </div>
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
            comunicato: this.$davinciApi.data.reactiveWrapper[this.comunicati][index]
          }
        })
      })
    }
  },
  methods: {
    togglePdf: function(){ this.scrollEnabled=  !(this.isPdfViewer = !this.isPdfViewer)}
  },
  components: {
    AppPdfviewer,
  }
}
</script>
