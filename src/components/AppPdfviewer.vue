<template>
  <iframe
  style="width: 100%; height:100%; display: block;"
  :src="baseUrl + $davinciApi.urlComunicato(url)"
  ></iframe>
</template>
<script>
export default {
  props: ['url'],
  data: () => ({ baseUrl: './pdfviewer/web/viewer.html?file='}),
}
</script>
