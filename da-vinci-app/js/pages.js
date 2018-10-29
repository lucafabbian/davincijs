
window.app.data.page = 'app-page-agenda' // Set default page

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
  data: function(){
    var date = new Date()
    return {
      month: date.getMonth(),
      date:  date.getDate(),
      day:   date.getDay(),
      year:  date.getFullYear(),
    }
  },
  template: `
   <app-page :title="monthName">
     <template slot="actions">
     <ons-toolbar-button onclick="alert('ciao')">
       <ons-icon icon="md-chevron-left"></ons-icon>
     </ons-toolbar-button>
     <ons-toolbar-button onclick="alert('ciao')">
       <ons-icon icon="md-chevron-right"></ons-icon>
     </ons-toolbar-button>
       <ons-toolbar-button onclick="alert('ciao')">
         <ons-icon icon="md-calendar"></ons-icon>
       </ons-toolbar-button>
     </template>
     <ons-row>
       <ons-col 
         style="text-align: center; line-height: 320%" 
         v-for="day in  ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']"
       > {{ day }} </ons-col>
     </ons-row>
     <ons-row>
       <ons-col 
         style="text-align: center; line-height: 320%" 
         v-for="day in week"
       > {{ day }} </ons-col>
     </ons-row>
   </app-page>`,
   computed: {
     monthName: function(){
       return [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
       "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ][this.month]
     },
     week: function(){
       var date = new Date(this.year, this.month, this.date)
       date.setDate(date.getDate() - this.day + 1)
       var weekDates = []
       for(var i = 0; i < 7; i++){
         weekDates.push((date.getDate() < 10 ? '0' : '') + date.getDate())
         date.setDate(date.getDate() + 1)
       }
       return weekDates
     }
   }
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
  <ons-card tappable>
    <ons-row tappable>
      <ons-col width="30px" style="text-align: center; font-size: 90%">
      {{ number }}    <br>
      <ons-icon 
       :style=" $root.comunicatiPreferiti.includes(urlName) ? 'color: #daa900' : 'color: #d6d6d6'"
       :icon="$root.comunicatiPreferiti.includes(urlName) ? 'md-star' : 'md-star-border'" 
       size="25px"
       v-on:click="
       if(!$root.comunicatiPreferiti.includes(urlName)){
          $root.comunicatiPreferiti.push(urlName);
          console.log(urlName);
        }else{
          $root.comunicatiPreferiti.splice(   $root.comunicatiPreferiti.indexOf(urlName), 1 ); 
        }" 
      ></ons-icon>
      </ons-col>
      <ons-col width="10px"></ons-col>
      <ons-col 
        v-on:click="
         if(!$root.comunicatiLetti.includes(url)) $root.comunicatiLetti.push(urlName); 
         $emit('openPdf', url)" 
        :style=" 'fontWeight: ' + ($root.comunicatiLetti.includes(urlName) ? '400' : '600')"
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
     urlName: function(){
       return this.url.substring(this.url.lastIndexOf('/'))
     }
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
    <ons-list>
      <ons-list-header>Generali</ons-list-header>
      <ons-list-item expandable>Sezione all'avvio
      <div class="expandable-content">
        <span v-for="category in $root.menu.categories">
          <ons-list-item v-for="element in category.elements" tappable>
            <label class="left">
              <ons-radio name="color" :input-id="element.name"></ons-radio>
            </label>
            <label :for="element.name" class="center">
              {{ element.name }}
            </label>
          </ons-list-item>
        </span>
      </div>

      </ons-list-item>
      <ons-list-header>Informazioni</ons-list-header>
    </ons-list>
   </app-page>`
})

