<v-ons<template>
  <dav-app-page :title="monthName">

    <!-- Toolbar -->
    <template slot="icons">
      <dav-icon icon="md-chevron-left"  @click="changeDate(month - 1)"></dav-icon>
      <dav-icon icon="md-chevron-right" @click="changeDate(month + 1)"></dav-icon>
      <dav-icon icon="md-calendar" @click="alert('today')"></dav-icon>
    </template>

    <!-- Agenda -->
    <v-ons-row style="background-color:white;">
      <v-ons-col v-for="day in dayNames"
        style="text-align: center; line-height: 200%"> {{ day }} </v-ons-col>
    </v-ons-row>
    <v-ons-row style="background-color:white;" v-for="row in week">
      <v-ons-col
        :style="'text-align: center; line-height: 200%; color: ' + (day.isInMonth ? 'black' : 'grey')"
        v-for="day in row"> {{ day.number }} </v-ons-col>
    </v-ons-row>
    
  </dav-app-page>
</template>
<script>
export default {
  data: function(){ return { dateObj : new Date().toString() } },
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
}
</script>
