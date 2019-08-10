<template>
  <dav-app-page title="Home">
    <template slot="icons">
      <dav-icon icon="md-settings" @click="$store.page = ['Impostazioni', 'md-settings', 'impostazioni']"></dav-icon>
    </template>

    <v-ons-card class="davinci-carousel-card">
      <v-ons-carousel swipeable auto-scroll overscrollable
      :index.sync="carouselIndex">
        <v-ons-carousel-item v-for="slide in $store.slideshowSito" :key="slide.link">
          <div class="imgcontainer">
            <img :src="$davinciApi.urlSlideshowImg(slide)">
            <h2 class="title">{{slide.title}}</h2>
          </div>
        </v-ons-carousel-item>
      </v-ons-carousel>
    </v-ons-card>
    <iframe
    style="width: 0%; height:0%; display: block;"
    src="./static/pdfviewer/web/viewer.html"
    ></iframe>
  </dav-app-page>
</template>
<style>
.davinci-carousel-card {
  padding: 0 !important;
  background-color: #000 !important;
}

.davinci-carousel-card img{
  width: 100%;
  display: block;
}
.davinci-carousel-card  .title{
  z-index: 10;
  transform: translateY( calc(-5vw - 122px));
  width: calc(100% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #000000c2 !important;
  color: #fff;
  padding: 16px !important;
  font-weight: 400;
  height: 90px;
  margin-bottom: -500px;
  font-size: 18px;
}
</style>
<script>

export default {
  data() {
    return {
      carouselIndex: 0,
    }
  },
  mounted(){
    setInterval(() => {
      this.carouselIndex++
      if(this.$store.slideshowSito.length === this.carouselIndex) this.carouselIndex = 0
    }, 4000)
  }
}
</script>
