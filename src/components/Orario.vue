<template>
  <div v-if="data" style="width:100%">
    <div class="orario-giorno" v-for="day in days">
      {{day[0]}}
      <div v-for="lezione in data.filter( el => el.giorno === day[1])" :class="'durata-' + lezione.durata">
        {{ lezione.mat_cod}}
      </div>
    </div>
  </div>
</table>


</template>
<style>
  .orario-giorno {
    text-align: center;
    margin-top: 20px;
    line-height: 30px;
    vertical-align: top;
    display: inline-block;
    width:16.666%;
    color: #4e4e4e;
  }

  .orario-giorno > div {
    margin-top: 5px;
    margin-left: 3px;
    margin-right: 3px;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    background-color: #792222;
    font-size: 14px;
    color: white;
  }

  .orario-giorno .durata-1h00{
    height: 50px;
    line-height: 50px;
  }

  .orario-giorno .durata-2h00{
    height: 105px;
    line-height: 105px;
  }
</style>
<script>

export default {
  name: 'DavOrario',
  props: ['data'],
  data(){
    return {
      days: [
        ['Lun','lunedì'],
        ['Mar','martedì'],
        ['Mer','mercoledì'],
        ['Gio','giovedì'],
        ['Ven','venerdì'],
        ['Sab','sabato']
      ],
    }
  }
}
</script>
