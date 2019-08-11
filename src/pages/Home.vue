<template>
  <dav-app-page :title="isNews ? currentNews.title :'Home'">
    <template slot="icons">
      <template v-if="!isNews">
        <dav-icon icon="md-settings" @click="$store.page = ['Impostazioni', 'md-settings', 'impostazioni']"></dav-icon>
      </template>
      <template v-else>
        <dav-icon icon="md-long-arrow-return" @click="isNews = false"></dav-icon>
      </template>
    </template>
    <div v-show="!isNews">
      <v-ons-card class="davinci-carousel-card">
        <v-ons-carousel swipeable auto-scroll overscrollable
        :index.sync="carouselIndex">
          <v-ons-carousel-item v-for="slide in $store.dav.slideshowSito" :key="slide.link">
            <div class="imgcontainer">
              <img :src="$davinciApi.urlSlideshowImg(slide)">
              <h2 class="title">{{slide.title}}</h2>
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>
      </v-ons-card>
      <v-ons-card v-for="news in $store.dav.internalNews"
      @click="currentNews = news; isNews = true; ">
        <img :src="news.preview" style="width: 64px; height: 64px">
        <div style="float:right; width: calc(100% - 100px); line-height: 26px">
          <b style="font-size: 18px">{{news.title}}</b><br>{{news.subtitle}}
        </div>
        <div style="clear: both;"></div>
      </v-ons-card>
      <iframe
      style="width: 0%; height:0%; display: block;"
      src="./static/pdfviewer/web/viewer.html"
      ></iframe>
    </div>
    <div v-show="isNews">
      <div style="margin: 10px; font-size: 18px;" v-html="currentNews.text"></div>
    </div>
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
  transform: translateY( calc(-5vh - 122px));
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

let interval;

export default {
  name: 'App',
  data() {
    return {
      carouselIndex: 0,
      isNews: false,
      currentNews : {},
    }
  },
  activated(){
    interval = setInterval(() => {
      try{
        this.carouselIndex++
        if(this.$store.dav.slideshowSito.length === this.carouselIndex) this.carouselIndex = 0
      }catch(e){}
    }, 6500)
  },
  deactivated(){
    clearInterval(interval)
  }
}
</script>
