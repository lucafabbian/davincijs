<docs>
 DavItemComunicato:

</docs>
<template functional>
  <div class="app-comunicato">
    <div>
      {{ props.comunicato.number }} <br>
      <div
      :class="props.comunicato.isPref ? 'zmdi-star' : 'zmdi-star-border'"
      @click="listeners.togglepref || (() => {})"
      ></div>
    </div>
    <div
    @click="listeners.openpdf || (() => {})"
    :style="'fontWeight: ' + (props.isRead ? '400' : '600')"
    > {{ props.comunicato.title }}</div>
      <a
      :href="props.comunicato.url"
      :download="props.comunicato.number + '-' + props.comunicato.title + '.pdf'"
      class="zmdi-download"
      ></a>
      <a :href="'https://wa.me/?text=' + props.comunicato.url" class="zmdi-share"></a>
  </div>
</template>
<script>
export default {
  name: 'DavComunicato',
  props: ['comunicato', 'isRead'],
}
  /*
  methods: {
    openPdf (){  // Chiede alla pagina madre di aprire un pdf su un url
      if(!this.isRead) this.$root.comunicatiLetti.push(this.comunicato)
      this.$emit('openPdf', this.comunicato.url)
    },
    togglePref (){ // Cambia stato da preferito a non preferito (e viceversa)
      this.comunicato.isPref = !this.comunicato.isPref
    }
  }*/
</script>
<style>
  /* Stile della lista */
  .app-comunicato {
    display: flex;
    width: 100vw;
    padding: 15px;
    box-sizing: border-box;
    vertical-align: middle;
    border-bottom: 1px solid #cfcfcf;
    padding-top: 20px;
  }
  .app-comunicato:active{
    background-color: #eee;
  }

  /* Stile del testo */
  .app-comunicato :nth-child(2) {
    flex:1;
    text-overflow: ellipsis;
  }

  /* Stile delle icone */
  .app-comunicato :first-child,
  .app-comunicato :nth-child(3),
  .app-comunicato :nth-child(4){
    text-align: center;
    flex: 0 0 50px;
    width: 50px;
    color: #4c5256;
  }
  .app-comunicato :first-child > div{
    font: normal normal normal 25px/1 'Material-Design-Iconic-Font';
    display: inline-block;
    line-height: inherit;
    font-style: normal;
    font-weight: 400;
  }
  .app-comunicato .zmdi-star {
    color: #daa900;
  }
  .app-comunicato > a.zmdi-download,
  .app-comunicato > a.zmdi-share{
    text-decoration: none;
    font: normal normal normal 32px/1 'Material-Design-Iconic-Font';
  }
</style>
