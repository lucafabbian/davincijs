<template>
  <app-page title="Impostazioni">
    <template slot="actions">
      <app-nav-action icon="md-menu" v-on:action="alert('ciao')"></app-nav-action>
    </template>
   <v-ons-list>
     <v-ons-list-header>Generali</v-ons-list-header>
     <v-ons-list-item expandable v-on:click="document.getElementById(app.data.defaultPage).checked = true">Sezione all'avvio
     <div class="expandable-content">
       <span v-for="category in $root.menu.categories">
         <v-ons-list-item v-for="element in category.elements" v-on:click="app.data.defaultPage=element.page" tappable>
           <label class="left">
             <v-ons-radio name="color" :input-id="element.page"></v-ons-radio>
           </label>
           <label :for="element.name" class="center">
             {{ element.name }}
           </label>
         </v-ons-list-item>
       </span>
     </div>

     </v-ons-list-item>
     <v-ons-list-header>Informazioni</v-ons-list-header>
   </v-ons-list>
  </app-page>
</template>
<script>
export default {}
</script>
