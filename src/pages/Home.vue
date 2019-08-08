<template>
  <dav-app-page title="Home">
    <template slot="icons">
      <dav-icon icon="md-settings" @click="$store.page = ['Impostazioni', 'md-settings', 'impostazioni']"></dav-icon>
    </template>

    <p style="text-align: center; opacity: 0.6; padding-top: 20px;">
      Swipe right to open the menu!
    </p>
    <v-ons-card >
      <v-ons-carousel swipeable auto-scroll overscrollable
      :index.sync="carouselIndex">
        <v-ons-carousel-item v-for="(value, key) in items" :style="{backgroundColor: value}">
          <div style="text-align: center; font-size: 30px; margin-top: 20px; margin-bottom: 50px; color: #fff;">{{key}}</div>
        </v-ons-carousel-item>
      </v-ons-carousel>
    </v-ons-card>
    <iframe
    style="width: 0%; height:0%; display: block;"
    src="./static/pdfviewer/web/viewer.html"
    ></iframe>
  </dav-app-page>
</template>
<script>
fetch('./news/news.json').then(response => response.json()).then(data => {
  console.log(data)
})
export default {
  data() {
    return {
      carouselIndex: 0,
      items: {
        BLUE: '#085078',
        DARK: '#373B44',
        ORANGE: '#D38312'
      },
      dots: {
        textAlign: 'center',
        fontSize: '30px',
        color: '#fff',
        position: 'absolute',
        bottom: '40px',
        left: 0,
        right: 0
      }
    }
  }
}
</script>
