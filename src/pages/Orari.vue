<template>
  <dav-app-page :title="'Orario ' + tabs[activeIndex].key">

    <!-- Toolbar -->
    <template slot="icons">
      <div class="orari-classi" v-if="activeIndex === 1">
        <v-ons-select v-model="annoClasse">
           <option v-for="anno in [1,2,3,4,5]" :value="anno">{{ anno }} </option>
         </v-ons-select>
         <v-ons-select v-model="classe">
            <option v-for="sezione in $store.classi.filter( (el) => el.startsWith(annoClasse))" :value="sezione">
              {{ sezione.substring(1) }}
            </option>
          </v-ons-select>
       </div>
    </template>


    <dav-orario v-show="activeIndex === 1" :data="orarioClasse">

    </dav-orario>

    <v-ons-bottom-toolbar class="orari-toolbar">
      <div v-for="(tab, index) in tabs" @click="activeIndex = index"
      :class="activeIndex === index ? 'active': 'disabled'">
        <v-ons-icon :icon="tab.icon" style="font-size:25px"></v-ons-icon>
        <div>{{ tab.label }}</div>
      </div>
    </v-ons-bottom-toolbar>
  </dav-app-page>
</template>
<style>
.orari-classi > * {
  width: 50px; position: relative; top: 12px; left: -20px;
  margin-right: 10px;
}
@media only screen and (min-width: 750px) {
  .orari-classi > * {
    top: 20px;
  }
}

.orari-classi .select-input {
  color: white !important;
      font-size: 20px;
}
.orari-classi .select-input > option{
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
      activeIndex: 0,
      tabs: [
        { icon: 'md-account',  label: 'Personale', key: "personale" },
        { icon: 'md-city-alt',  label: 'Classi',    key: "classi" },
        { icon: 'md-case',  label: 'Docenti',   key: "docenti" },
      ],
      annoClasse: 1,
      classe: '1A',
      orarioClasse: null,

    }
  },
  computed: {

  },
  methods: {

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
