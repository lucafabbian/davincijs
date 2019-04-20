<template>
  <v-ons-card tappable>
    <v-ons-row tappable>
      <v-ons-col width="30px" style="text-align: center; font-size: 90%">
        {{ number }} <br>
        <v-ons-icon :style="prefColor" :icon="prefIcon" size="25px" v-on:click="togglePref"></v-ons-icon>
      </v-ons-col>
      <v-ons-col width="10px"></v-ons-col>
      <v-ons-col v-on:click="openPdf" :style="readStyle"> {{ title }}</v-ons-col>
      <v-ons-col width="40px" style="text-align: center">
        <a :href="comunicato.url" :download="number + '-' + title + '.pdf'">
          <v-ons-icon style="color: #4c5256" icon="md-download" size="28px"></v-ons-icon>
        </a>
      </v-ons-col>
      <v-ons-col width="40px" style="text-align: center">
        <a :href="'https://wa.me/?text=' + comunicato.url">
          <v-ons-icon style="color: #4c5256" icon="md-share" size="28px"></v-ons-icon>
        </a>
      </v-ons-col>
    </v-ons-row>
  </v-ons-card>
</template>
<script>
export default {
  name: 'AppCardComunicato',
  props: ['comunicato'],
  computed: {
    // Parti di cui è composto il nome del comunicato
    number (){ return (this.comunicato.nome.match(/^[0-9]*/) || ["0"])[0] || "?"  },
    title  (){ return (this.comunicato.nome.substring(this.number.length + 1).replace(".pdf", "").replace(/\_/g," ")) },
    urlName(){ return this.comunicato.url.substring(this.url.lastIndexOf('/')) },
    // Proprietà del comunicato (se è fra i preferiti/se è stato letto) e relativi stili
    isPref    (){ return this.comunicato.isPref },
    prefColor (){ return 'color: ' + (this.comunicato.isPref ? '#daa900' : '#4c5256')},
    prefIcon  (){ return this.isPref ? 'md-star' : 'md-star-border'},
    isRead    (){ return this.$root.comunicatiLetti    .includes(this.comunicato) },
    readStyle (){ return 'fontWeight: ' + (this.isRead ? '400' : '600')}
  },
  methods: {
    openPdf (){  // Chiede alla pagina madre di aprire un pdf su un url
      if(!this.isRead) this.$root.comunicatiLetti.push(this.comunicato)
      this.$emit('openPdf', this.comunicato.url)
    },
    togglePref (){ // Cambia stato da preferito a non preferito (e viceversa)
      this.comunicato.isPref = !this.comunicato.isPref
    }
  }
}
</script>
