<template>
  <dav-app-page :title="'Orario ' + tabs[activeIndex].key">

    <!-- Toolbar -->
    <template slot="icons">

    </template>


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
      ]


    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
