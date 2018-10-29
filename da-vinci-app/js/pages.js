
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
  data: function(){
    var dateObj = new Date()
    return {
      month: dateObj.getMonth(),
      date:  dateObj.getDate(),
      day:   dateObj.getDay(),
      year:  dateObj.getFullYear(),
    }
  },
  template: `
   <app-page :title="monthName">
     <template slot="actions">
       <app-nav-action icon="md-chevron-left"  v-on:action="removeWeek"></app-nav-action>
       <app-nav-action icon="md-chevron-right" v-on:action="addWeek"></app-nav-action>
       <app-nav-action icon="md-calendar" v-on:action="alert('today')"></app-nav-action>
     </template>
     <transition name="fade">
     <div>
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
     </div>
     </transition>
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
     },
   },
   methods: {
     updateDate: function(dateObj){
       this.month = dateObj.getMonth();
       this.date =  dateObj.getDate();
       this.day =   dateObj.getDay();
       this.year =  dateObj.getFullYear();       
     },
     addWeek: function(){
       var dateObj = new Date(this.year, this.month, this.date)
       dateObj.setDate(this.date + 7)
       this.updateDate(dateObj)
     },
     removeWeek: function(){
       var dateObj = new Date(this.year, this.month, this.date)
       dateObj.setDate(this.date - 7)
       this.updateDate(dateObj)
     }
   }
})


// Pdf reader
Vue.component('app-pdfviewer', {
  props: ['url'],
  template: `<iframe style="width: 100%; height:100%" :src="'./res/pdfjs/web/viewer.html?file=' + url"></iframe>`,  
})

// Comunicati
Vue.component('app-card-comunicato', {
  props: ['name', 'url', 'index'],
  template: `
  <ons-card tappable>
    <ons-row tappable>
      <ons-col width="30px" style="text-align: center; font-size: 90%">
        {{ number }} <br>
        <ons-icon :style="prefColor" :icon="prefIcon" size="25px" v-on:click="togglePref"></ons-icon>
      </ons-col>
      <ons-col width="10px"></ons-col>
      <ons-col v-on:click="openPdf" :style="readStyle"> {{ title }}</ons-col>
    </ons-row>
  </ons-card> `,
  computed: {
    // Parti di cui è composto il nome del comunicato
    number : function(){ return (this.name.match(/^[0-9]*/) || ["0"])[0] || "?"  },
    title  : function(){ return (this.name.substring(this.number.length + 1).replace(".pdf", "").replace(/\_/g," ")) },
    urlName: function(){ return this.url.substring(this.url.lastIndexOf('/')) },    
    // Proprietà del comunicato (se è fra i preferiti/se è stato letto) e relativi stili
    isPref    : function(){ return this.$root.comunicatiPreferiti.includes(this.urlName) },
    prefColor : function(){ return 'color: ' + (this.isPref ? '#daa900' : '#d6d6d6')},
    prefIcon  : function(){ return this.isPref ? 'md-star' : 'md-star-border'},
    isRead    : function(){ return this.$root.comunicatiLetti    .includes(this.urlName) },
    readStyle : function(){ return 'fontWeight: ' + (this.isRead ? '400' : '600')}
  },
  methods: {
    openPdf: function(){  // Chiede alla pagina madre di aprire un pdf su un url
      if(!this.isRead) this.$root.comunicatiLetti.push(this.urlName)
      this.$emit('openPdf', this.url)
    },
    togglePref: function(){ // Cambia stato da preferito a non preferito (e viceversa)
      var pref = this.$root.comunicatiPreferiti
      this.isPref ? pref.splice(pref.indexOf(this.urlName), 1) : pref.push(this.urlName)
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
       <ons-pull-hook onPull="refreshComunicatiStudenti()"> Ricarico...  </ons-pull-hook>
       <span v-if="comunicati.length === 0">
          <ons-icon icon="md-spinner" size="28px" spin></ons-icon>
       </span>
       <span v-else>
         <app-card-comunicato v-for="(comunicato, index) in comunicati" 
          :index="index" :name="comunicato.nome" :url="comunicato.url"
          v-on:openPdf="pdfViewerUrl = $event; togglePdf()" > </app-card-comunicato>
       </span>
     </div>
   </app-page>`,
   methods: {
     togglePdf: function(){ scrollEnabled=  !(this.isPdfViewer = !this.isPdfViewer)}
   }
})

// Pagine dei comunicati (sono uguali tranne per il titolo e l'elenco dei comunicati)
var comunicati = [
  {id: 'studenti', title: 'Comunicati studenti', obj:'comunicatiStudenti'},
  {id: 'genitori', title: 'Comunicati genitori', obj:'comunicatiGenitori'},
  {id: 'docenti' , title: 'Comunicati docenti' , obj:'comunicatiDocenti' }
]
comunicati.forEach( (elem) => Vue.component('app-page-comunicati-' + elem.id, {
  template: `<app-page-comunicati title="${elem.title}" :comunicati="$root.${elem.obj}"></app-page-comunicati>`,  
}))

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

