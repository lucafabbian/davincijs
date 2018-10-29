
window.app.data.page = 'app-page-comunicati-studenti' // Set default page

// Home page
Vue.component('app-page-home', {
   template: `
    <app-page title="Home">
      <template slot="actions">
        <ons-toolbar-button onclick="alert('ciao')">
          <ons-icon icon="md-menu"></ons-icon>
        </ons-toolbar-button>
      </template>

      <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
        Swipe right to open the menu!
      </p>
      <a href="./res/pdfjs/web/viewer.html">pdf</a>

    </app-page>`
})

// Agenda
Vue.component('app-page-agenda', {
  template: `
   <app-page title="Agenda">
     <template slot="actions">
       <ons-toolbar-button onclick="alert('ciao')">
         <ons-icon icon="md-menu"></ons-icon>
       </ons-toolbar-button>
     </template>
     <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
       This is agenda!
     </p>
   </app-page>`
})


// Pdf reader
Vue.component('app-pdfviewer', {
  props: ['url'],
  template: `
  <iframe style="width: 100%; height:100%" :src="'./res/pdfjs/web/viewer.html?file=' + url"></iframe>
 `,  
})

// Comunicati
Vue.component('app-card-comunicato', {
  props: ['name', 'url', 'index'],
  template: `
  <ons-card>
    <ons-row>
      <ons-col width="30px" style="text-align: center; font-size: 90%">
      {{ number }}    <br>
      <ons-icon 
       :style=" $root.comunicatiPreferiti.includes(url) ? 'color: #daa900' : 'color: #d6d6d6'"
       :icon="$root.comunicatiPreferiti.includes(url) ? 'md-star' : 'md-star-border'" 
       size="25px"
       v-on:click="
       if(!$root.comunicatiPreferiti.includes(url)){
          $root.comunicatiPreferiti.push(url);
          console.log(url);
        }else{
          $root.comunicatiPreferiti.splice(   $root.comunicatiPreferiti.indexOf(url), 1 ); 
        }" 
      ></ons-icon>
      </ons-col>
      <ons-col width="10px"></ons-col>
      <ons-col 
        v-on:click="
         if(!$root.comunicatiLetti.includes(url)) $root.comunicatiLetti.push(url); 
         $emit('openPdf', url)" 
        :style=" 'fontWeight: ' + ($root.comunicatiLetti.includes(url) ? '400' : '600')"
      > {{ title }}</ons-col>
    </ons-row>
  </ons-card>
 `,
  computed: {
     number: function () {
      return (this.name.match(/^[0-9]*/) || ["0"])[0] || "?"
     },
     title: function () {
      return (this.name.substring(this.number.length + 1).replace(".pdf", "").replace(/\_/g," "))
     },
   },
})

// Comunicati studenti
Vue.component('app-page-comunicati-studenti', {
  data: function(){
    return{ scrollEnabled: true, isPdfViewer: false, pdfViewerUrl: "file.pdf"}
  },
  template: `
   <app-page title="Comunicati studenti" :scrollable="scrollEnabled">
     <template slot="actions">
     <span v-if="isPdfViewer">
       <ons-toolbar-button v-on:click="alert('ciao')">
         <ons-icon icon="md-share"></ons-icon>
       </ons-toolbar-button>
       <ons-toolbar-button v-on:click="isPdfViewer = false; scrollEnabled = true">
         <ons-icon icon="md-close"></ons-icon>
       </ons-toolbar-button>
     </span>
     </template>
      
     <app-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></app-pdfviewer>
     <div v-show="!isPdfViewer">
       <ons-pull-hook onPull="refreshComunicatiStudenti()"> Ricarico...  </ons-pull-hook>
       <span v-if=" $root.comunicatiStudenti.length === 0">
       <ons-progress-circular style="text-align: center; opacity: 0.6; padding-top: 20px;" indeterminate></ons-progress-circular>

       </span>
       <span v-else>
       <app-card-comunicato v-for="(comunicato, index) in $root.comunicatiStudenti" 
        :index="index" 
        :name="comunicato.nome" 
        :url="comunicato.url"
        v-on:openPdf="pdfViewerUrl = $event; scrollEnabled= false; isPdfViewer = true;"
       >
       </app-card-comunicato>
       </span>
     </div>
   </app-page>`,
})

// Comunicati genitori
Vue.component('app-page-comunicati-genitori', {
  data: function(){
    return{ scrollEnabled: true, isPdfViewer: false, pdfViewerUrl: "file.pdf"}
  },
  template: `
   <app-page title="Comunicati genitori" :scrollable="scrollEnabled">
     <template slot="actions">
     <span v-if="isPdfViewer">
       <ons-toolbar-button v-on:click="alert('ciao')">
         <ons-icon icon="md-share"></ons-icon>
       </ons-toolbar-button>
       <ons-toolbar-button v-on:click="isPdfViewer = false; scrollEnabled = true">
         <ons-icon icon="md-close"></ons-icon>
       </ons-toolbar-button>
     </span>
     </template>
      
     <app-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></app-pdfviewer>
     <div v-show="!isPdfViewer">
       <ons-pull-hook onPull="refreshComunicatiGenitori()"> Ricarico...  </ons-pull-hook>
       <span v-if=" $root.comunicatiGenitori.length === 0">
       <ons-progress-circular style="text-align: center; opacity: 0.6; padding-top: 20px;" indeterminate></ons-progress-circular>

       </span>
       <span v-else>
       <app-card-comunicato v-for="(comunicato, index) in $root.comunicatiGenitori" 
        :index="index" 
        :name="comunicato.nome" 
        :url="comunicato.url"
        v-on:openPdf="pdfViewerUrl = $event; scrollEnabled= false; isPdfViewer = true;"
       >
       </app-card-comunicato>
       </span>
     </div>
   </app-page>`,
})

// Comunicati docenti
Vue.component('app-page-comunicati-docenti', {
  data: function(){
    return{ scrollEnabled: true, isPdfViewer: false, pdfViewerUrl: "file.pdf"}
  },
  template: `
   <app-page title="Comunicati docenti" :scrollable="scrollEnabled">
     <template slot="actions">
     <span v-if="isPdfViewer">
       <ons-toolbar-button v-on:click="alert('ciao')">
         <ons-icon icon="md-share"></ons-icon>
       </ons-toolbar-button>
       <ons-toolbar-button v-on:click="isPdfViewer = false; scrollEnabled = true">
         <ons-icon icon="md-close"></ons-icon>
       </ons-toolbar-button>
     </span>
     </template>
      
     <app-pdfviewer v-if="isPdfViewer" :url="pdfViewerUrl"></app-pdfviewer>
     <div v-show="!isPdfViewer">
       <ons-pull-hook onPull="refreshComunicatiDocenti()"> Ricarico...  </ons-pull-hook>
       <span v-if=" $root.comunicatiDocenti.length === 0">
       <ons-progress-circular style="text-align: center; opacity: 0.6; padding-top: 20px;" indeterminate></ons-progress-circular>

       </span>
       <span v-else>
       <app-card-comunicato v-for="(comunicato, index) in $root.comunicatiDocenti" 
        :index="index" 
        :name="comunicato.nome" 
        :url="comunicato.url"
        v-on:openPdf="pdfViewerUrl = $event; scrollEnabled= false; isPdfViewer = true;"
       >
       </app-card-comunicato>
       </span>
     </div>
   </app-page>`,
})

// Impostazioni
Vue.component('app-page-impostazioni', {
  template: `
   <app-page title="Impostazioni">
     <template slot="actions">
       <ons-toolbar-button onclick="alert('ciao')">
         <ons-icon icon="md-menu"></ons-icon>
       </ons-toolbar-button>
     </template>
     <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
       This is impostazioni!
     </p>
   </app-page>`
})

