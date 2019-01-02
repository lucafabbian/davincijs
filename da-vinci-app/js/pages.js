
// Home page
Vue.component('app-page-home', {
   template: `
    <app-page title="Home">
      <template slot="actions">
        <app-nav-action icon="md-menu" v-on:action="alert('ciao')"></app-nav-action>
      </template>

      <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
        Swipe right to open the menu!
      </p>
      <a href="./res/pdfjs/web/viewer.html">pdf</a>

    </app-page>`
})

// Agenda
Vue.component('app-page-agenda', {
  data: function(){ return { dateObj : new Date().toString() } },
  template: `
   <app-page :title="monthName">
     <template slot="actions">
       <app-nav-action icon="md-chevron-left"  v-on:action="changeDate(month - 1)"></app-nav-action>
       <app-nav-action icon="md-chevron-right" v-on:action="changeDate(month + 1)"></app-nav-action>
       <app-nav-action icon="md-calendar" v-on:action="alert('today')"></app-nav-action>
     </template>
     <ons-row style="background-color:white;">
       <ons-col v-for="day in dayNames"
         style="text-align: center; line-height: 200%"> {{ day }} </ons-col>
     </ons-row>
     <ons-row style="background-color:white;" v-for="row in week">
       <ons-col 
         :style="'text-align: center; line-height: 200%; color: ' + (day.isInMonth ? 'black' : 'grey')" 
         v-for="day in row"> {{ day.number }} </ons-col>
     </ons-row>
   </app-page>`,
   computed: {
     month: function(){ return new Date(this.dateObj).getMonth()},
     date:  function(){ return new Date(this.dateObj).getDate()},
     day:   function(){ return new Date(this.dateObj).getDay()},
     year:  function(){ return new Date(this.dateObj).getFullYear()},
     dayNames: function(){ return ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']},
     monthName: function(){ 
       return [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
       "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ][this.month]
     },
     week: function(){
       var date = new Date(this.year, this.month, 1); date.setDate( 1 - date.getDay())
       return Array.from([1,2,3,4,5], () => Array.from([1, 2, 3, 4, 5, 6, 7], () => {
         date.setDate(date.getDate() + 1)
         return {
           isInMonth: (this.month === date.getMonth()),
           number: ((date.getDate() < 10 ? '0' : '') + date.getDate())
         }
       }))
     },
     weekEvents: function(){
       
     }
   },
   methods: {
     changeDate: function(date){
       var dateObj = new Date(this.dateObj); dateObj.setMonth(date)
       this.dateObj = dateObj.toString()
     },
   }
})


// Pdf reader
Vue.component('app-pdfviewer', {
  props: ['url'],
  data: () => {return { baseUrl: './res/pdfjs/web/viewer.html?file='}},
  template: `<iframe style="width: 100%; height:100%; display: block;" :src="baseUrl + davinciApi.urlComunicato(url)"></iframe>`,  
})

// Comunicati
Vue.component('app-card-comunicato', {
  props: ['comunicato'],
  template: `
  <ons-card tappable>
    <ons-row tappable>
      <ons-col width="30px" style="text-align: center; font-size: 90%">
        {{ number }} <br>
        <ons-icon :style="prefColor" :icon="prefIcon" size="25px" v-on:click="togglePref"></ons-icon>
      </ons-col>
      <ons-col width="10px"></ons-col>
      <ons-col v-on:click="openPdf" :style="readStyle"> {{ title }}</ons-col>
      <ons-col width="40px" style="text-align: center">
        <a :href="comunicato.url" :download="number + '-' + title + '.pdf'">
          <ons-icon style="color: #4c5256" icon="md-download" size="28px"></ons-icon>
        </a>
      </ons-col>
      <ons-col width="40px" style="text-align: center">
        <a :href="'https://wa.me/?text=' + comunicato.url">
          <ons-icon style="color: #4c5256" icon="md-share" size="28px"></ons-icon>
        </a>
      </ons-col>
    </ons-row>
  </ons-card> `,
  computed: {
    // Parti di cui è composto il nome del comunicato
    number : function(){ return (this.comunicato.nome.match(/^[0-9]*/) || ["0"])[0] || "?"  },
    title  : function(){ return (this.comunicato.nome.substring(this.number.length + 1).replace(".pdf", "").replace(/\_/g," ")) },
    urlName: function(){ return this.comunicato.url.substring(this.url.lastIndexOf('/')) },    
    // Proprietà del comunicato (se è fra i preferiti/se è stato letto) e relativi stili
    isPref    : function(){ return this.$root.comunicatiPreferiti.includes(this.comunicato) },
    prefColor : function(){ return 'color: ' + (this.isPref ? '#daa900' : '#4c5256')},
    prefIcon  : function(){ return this.isPref ? 'md-star' : 'md-star-border'},
    isRead    : function(){ return this.$root.comunicatiLetti    .includes(this.comunicato) },
    readStyle : function(){ return 'fontWeight: ' + (this.isRead ? '400' : '600')}
  },
  methods: {
    openPdf: function(){  // Chiede alla pagina madre di aprire un pdf su un url
      if(!this.isRead) this.$root.comunicatiLetti.push(this.comunicato)
      this.$emit('openPdf', this.url)
    },
    togglePref: function(){ // Cambia stato da preferito a non preferito (e viceversa)
      var pref = this.$root.comunicatiPreferiti
      this.isPref ? pref.splice(pref.indexOf(this.comunicato), 1) : pref.push(this.comunicato)
    }
  }
})

Vue.component('app-page-comunicati', {
  props: ['title', 'comunicati'],
  data: () =>{ return{ scrollEnabled: true, isPdfViewer: false, pdfViewerUrl: "file.pdf"}},
  template: `
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
         <app-card-comunicato v-for="(comunicato, index) in comunicati" 
          :comunicato="comunicato"
          v-on:openPdf="pdfViewerUrl = $event; togglePdf()" > </app-card-comunicato>
       </span>
     </div>
   </app-page>`,
   methods: {
     togglePdf: function(){ this.scrollEnabled=  !(this.isPdfViewer = !this.isPdfViewer)}
   }
})

// Pagine dei comunicati (sono uguali tranne per il titolo e l'elenco dei comunicati)
var comunicati = [
  {id: 'studenti', title: 'Comunicati studenti', obj:'comunicatiStudenti'},
  {id: 'genitori', title: 'Comunicati genitori', obj:'comunicatiGenitori'},
  {id: 'docenti' , title: 'Comunicati docenti' , obj:'comunicatiDocenti' },
]
comunicati.forEach( (elem) => Vue.component('app-page-comunicati-' + elem.id, {
  template: `<app-page-comunicati title="${elem.title}" :comunicati="$root.davinciApi.${elem.obj}"></app-page-comunicati>`,  
}))

// Pagina comunicati preferiti
Vue.component('app-page-comunicati-preferiti', {
  template: `<app-page-comunicati title="Comunicati preferiti" :comunicati="$root.comunicatiPreferiti"></app-page-comunicati>`,
})

// Impostazioni
Vue.component('app-page-impostazioni', {
  template: `
   <app-page title="Impostazioni">
     <template slot="actions">
       <app-nav-action icon="md-menu" v-on:action="alert('ciao')"></app-nav-action>
     </template>
    <ons-list>
      <ons-list-header>Generali</ons-list-header>
      <ons-list-item expandable v-on:click="document.getElementById(app.data.defaultPage).checked = true">Sezione all'avvio
      <div class="expandable-content">
        <span v-for="category in $root.menu.categories">
          <ons-list-item v-for="element in category.elements" v-on:click="app.data.defaultPage=element.page" tappable>
            <label class="left">
              <ons-radio name="color" :input-id="element.page"></ons-radio>
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
