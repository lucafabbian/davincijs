export default {
  props: ['url'],
  data: () => {return { baseUrl: './res/pdfjs/web/viewer.html?file='}},
  template: `<iframe style="width: 100%; height:100%; display: block;" :src="baseUrl + $davinciApi.urlComunicato(url)"></iframe>`,  
}