<template>
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
  </ons-card>
</template>
<script>
export default {
  props: ['comunicato'],
  computed: {
    // Parti di cui è composto il nome del comunicato
    number : function(){ return (this.comunicato.nome.match(/^[0-9]*/) || ["0"])[0] || "?"  },
    title  : function(){ return (this.comunicato.nome.substring(this.number.length + 1).replace(".pdf", "").replace(/\_/g," ")) },
    urlName: function(){ return this.comunicato.url.substring(this.url.lastIndexOf('/')) },
    // Proprietà del comunicato (se è fra i preferiti/se è stato letto) e relativi stili
    isPref    : function(){ return this.comunicato.isPref },
    prefColor : function(){ return 'color: ' + (this.comunicato.isPref ? '#daa900' : '#4c5256')},
    prefIcon  : function(){ return this.isPref ? 'md-star' : 'md-star-border'},
    isRead    : function(){ return this.$root.comunicatiLetti    .includes(this.comunicato) },
    readStyle : function(){ return 'fontWeight: ' + (this.isRead ? '400' : '600')}
  },
  methods: {
    openPdf: function(){  // Chiede alla pagina madre di aprire un pdf su un url
      if(!this.isRead) this.$root.comunicatiLetti.push(this.comunicato)
      this.$emit('openPdf', this.comunicato.url)
    },
    togglePref: function(){ // Cambia stato da preferito a non preferito (e viceversa)
      this.comunicato.isPref = !this.comunicato.isPref
    }
  }
}
</script>
