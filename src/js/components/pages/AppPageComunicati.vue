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
         <ons-icon icon="md-spinner" size="28px" spin></ons-icon>
      </span>
      <span v-else>
        <app-card-comunicato v-for="(comunicato, index) in $davinciApi.data.reactiveWrapper[comunicati]"
         :comunicato="comunicato"
         v-on:openPdf="pdfViewerUrl = $event; togglePdf()" > </app-card-comunicato>
      </span>
    </div>
  </app-page>
</template>
<script>
export default {
  props: ['title', 'comunicati'],
  data: () =>({ scrollEnabled: true, isPdfViewer: false, pdfViewerUrl: "file.pdf"}),
   methods: {
     togglePdf: function(){ this.scrollEnabled=  !(this.isPdfViewer = !this.isPdfViewer)}
   }
}
</script>
