

export default {
  image: 'res/img/logo-toolbar.svg', 
  categories: [ {
      name: "",
      elements:[
        {name: "Home",   icon:"md-home",     page:"app-page-home"},    
        {name: "Agenda", icon:"md-calendar", page:"app-page-agenda"},    
        {name: "Orari",  icon:"md-time"},      
      ]
    }, {
      name: "comunicati",
      elements:[
        {name: "Studenti",  icon:"md-graduation-cap", page:"app-page-comunicati", data: { title: 'Comunicati studenti', comunicati:'comunicatiStudenti' } },      
        {name: "Genitori",  icon:"md-accounts",       page:"app-page-comunicati", data: { title: 'Comunicati genitori', comunicati:'comunicatiGenitori' } },      
        {name: "Docenti",   icon:"md-case",           page:"app-page-comunicati", data: { title: 'Comunicati docenti' , comunicati:'comunicatiDocenti'  } }, 
        {name: "Preferiti",   icon:"md-star",         page:"app-page-comunicati-preferiti"},                 
      ]
    }, {
      name: "utilità",
      elements:[
        {name: "Impostazioni", icon:"md-settings", page:"app-page-impostazioni"}
      ]
    }, ],
}