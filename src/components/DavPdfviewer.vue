<template>
  <div class="dav-pdfviewer">
    <iframe
    style="width: 100%; height:100%; display: block;"
    :src="baseUrl + $davinciApi.urlComunicato(url)"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: 'DavPdfviewer',
  props: ['url'],
  data: () => ({ baseUrl: './static/pdfviewer/web/viewer.html?file='}),
}
</script>
<style>
.dav-pdfviewer {
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
