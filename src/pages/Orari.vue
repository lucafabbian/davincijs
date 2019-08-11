<template>
  <dav-app-page :title="title">

    <!-- Toolbar -->
    <template slot="icons">
      <div class="orari-classi" v-if="activeTab === 1">
        <v-ons-select v-model="annoClasse">
           <option v-for="anno in [1,2,3,4,5]" :value="anno">{{ anno }} </option>
         </v-ons-select>
         <v-ons-select v-model="classe">
            <option v-for="sezione in $store.dav.classi.filter( (el) => el.startsWith(annoClasse))" :value="sezione">
              {{ sezione.substring(1) }}
            </option>
          </v-ons-select>
       </div>
       <div class="orari-docenti" v-if="activeTab === 2">
         <v-ons-select v-model="docente">
            <option v-for="(docent, index) in $store.dav.docenti" :value="index">
              {{ docent.cognome + ' ' + docent.nome}}
            </option>
          </v-ons-select>
       </div>
    </template>


    <div v-show="activeTab === 0">
      <v-ons-card class="orario-personale" v-if="$store.classePersonale === ''">
        <div> Seleziona la tua classe:</div>
        <v-ons-select v-model="annoClasse">
           <option v-for="anno in [1,2,3,4,5]" :value="anno">{{ anno }} </option>
         </v-ons-select>
         <v-ons-select v-model="classe">
            <option v-for="sezione in $store.dav.classi.filter( (el) => el.startsWith(annoClasse))" :value="sezione">
              {{ sezione.substring(1) }}
            </option>
          </v-ons-select>
        <br>
        <br>
        <v-ons-button modifier="large" @click="updateOrarioPersonale()">Conferma</v-ons-button>
      </v-ons-card>
      <dav-orario v-show="$store.classePersonale !== ''" :data="$store.orarioPersonale"></dav-orario>
    </div>

    <dav-orario v-show="activeTab === 1" :data="orarioClasse"></dav-orario>



    <v-ons-bottom-toolbar class="orari-toolbar">
      <div v-for="(tab, index) in tabs" @click="activeTab = index"
      :class="activeTab === index ? 'active': 'disabled'">
        <v-ons-icon :icon="tab.icon" style="font-size:25px"></v-ons-icon>
        <div>{{ tab.label }}</div>
      </div>
    </v-ons-bottom-toolbar>
  </dav-app-page>
</template>
<style>
.orario-personale { margin-top: 45px !important; }
.orario-personale > div { font-size: 20px; }
.orario-personale .select-input {
  font-size: 20px;
  margin-top: 10px;
  margin-right: 10px;
}

.orari-classi > *, .orari-docenti > * {
  width: 50px; position: relative; top: 12px; left: -20px;
  margin-right: 10px;
}

.orari-docenti > * {
  width: 220px;
  z-index: 4;
}

@media only screen and (min-width: 750px) {
  .orari-classi > *, .orari-docenti > * {
    top: 20px;
  }
}

.orari-classi .select-input, .orari-docenti .select-input {
  color: white !important;
      font-size: 20px;
}
.orari-classi .select-input > option, .orari-docenti .select-input > option{
  color: black !important;
}

.orari-toolbar {
  display: flex !important;
  flex-direction: row;
  height: 70px !important;
}

.orari-toolbar > div{
  flex:  auto;
  padding-top: 14px;
  text-align: center;
}

.orari-toolbar > div.active{
  color: #8e2424;
}
.orari-toolbar > div.disabled{
  color: gray;
}
</style>
<script>
export default {
  data(){
    return {

      // Tabs
      activeTab: 0,
      tabs: [
        { icon: 'md-account',  label: 'Personale', key: "personale" },
        { icon: 'md-city-alt',  label: 'Classi',    key: "classi" },
        { icon: 'md-case',  label: 'Docenti',   key: "docenti" },
      ],

      // Orario classe
      annoClasse: 1,
      classe: '1A',
      orarioClasse: null,

      // Orario docente
      docente: 105,
      orarioDocente: null,
    }
  },
  computed: {
    title(){
      if(this.activeTab === 0) return 'Orario personale ' + this.$store.classePersonale
      if(this.activeTab === 1) return 'Orario classe'
      if(this.activeTab === 2) return ''
    }
  },
  methods: {
    updateOrarioPersonale(){
      const classe = this.classe
      console.log('ipdasa', classe)

      this.$davinciApi.fetchOrarioClasse(classe.toLowerCase()).then( (response) =>{
        this.$store.orarioPersonale = response.data
        this.$store.classePersonale = classe
        console.log('updated')
      })
    },
  },
  watch: {
    classe: {
      handler: function(val){
        this.orarioClasse = null;
        this.$davinciApi.fetchOrarioClasse(val.toLowerCase()).then( (response) =>
          this.orarioClasse = response.data
        )
      },
      immediate: true
    },

  }
}
</script>
