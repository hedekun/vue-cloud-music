<template>
  <div class="all-container">
    <div class="slider-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slider in bannerList" :key="slider.imageUrl">
          <div class="slider-nav">
            <img :src="slider.imageUrl" width="100%" height="100%" alt="推荐">
          </div>
        </div>
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'

  export default {
    name: "index",
    props: {
      bannerList: {
        type: Array,
        default: () => []
      }
    },
    updated() {
      // 如果再mounted中执行的话，因为获取bannerList是异步的会导致bug，再数据收到后，updated钩子函数里执行一次
      if (this.bannerList.length && !this.hasInit) {
        this.hasInit = true
        new Swiper('.slider-container', {
          loop: true,
          autoplay: {
            delay: 3000
          },
          autoplayDisableOnInteraction: false,
          pagination: {el: '.swiper-pagination'},
        })
      }
    },
    data() {
      return{
        hasInit: false
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/global-style";

  .all-container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: auto;
    background: white;

    .before {
      position: absolute;
      top: 0;
      height: 60%;
      width: 100%;
      background: $theme-color
    }

    .slider-container {
      position: relative;
      width: 98%;
      height: 160px;
      overflow: hidden;
      margin: auto;
      border-radius: 6px;

      .slider-nav {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
      }

      .swiper-pagination-bullet-active {
        background: $theme-color
      }
    }
  }
</style>
