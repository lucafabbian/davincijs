<template>
  <dav-app-page title="Orari">

    <!-- Toolbar -->
    <template slot="icons">
      <dav-icon icon="md-chevron-left"  @click="changeDate(month - 1)"></dav-icon>
      <dav-icon icon="md-chevron-right" @click="changeDate(month + 1)"></dav-icon>
      <dav-icon icon="md-calendar" @click="alert('today')"></dav-icon>
    </template>



  </dav-app-page>
</template>
<script>
export default {
  data(){
    return {  }
  },
  computed: {

  },
  methods: {

  }
}
</script>
