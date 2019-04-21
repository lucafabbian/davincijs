<template>
  <dav-app-page title="Home">
    <template slot="icons">
      <dav-icon icon="md-menu" @click="alert('ciao')"></dav-icon>
    </template>

    <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
      Swipe right to open the menu!
    </p>

  </dav-app-page>
</template>
<script>
export default {}
</script>
