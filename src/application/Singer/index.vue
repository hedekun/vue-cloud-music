<template>
  <div class="singer-container">
    <MyHeader :title="artist.name" ref="header" :handle-click="handleBack"></MyHeader>
    <div class="img-wrapper" ref="imgWrapper" :style="{backgroundImage:'url(' + artist.picUrl + ')'}">
      <div class="filter"/>
    </div>
    <div class="collection-button" ref="collectButton">
      <i class="iconfont">&#xe62d;</i>
      <span class="text">收藏</span>
    </div>
    <div class="bg-layer" ref="layer" />
    <div class="song-list-wrapper" ref="songScrollWrapper">
      <Scroll ref="songScroll" :on-scroll="handleScroll">
        <div>
          <SongsList :songs="songs" :show-collect="false"/>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import MyHeader from '../../baseUI/header'
  import Scroll from '../../baseUI/scroll'
  import SongsList from '../SongsList'

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers('singerInfo')
  const OFFSET = 5

  export default {
    name: "singer",
    components: {
      MyHeader,
      Scroll,
      SongsList
    },
    computed: {
      ...mapState({
        artist: state => state.artist,
        songs: state => state.songsOfArtist,
        loading: state => state.loading
      })
    },
    mounted() {
      this.getInitSingerInfo(this.$route.params.id)
    },
    data() {
      return{
        height: 0
      }
    },
    methods: {
      ...mapActions(['getSingerInfo']),
      ...mapMutations(['CHANGE_ENTER_LOADING', 'CHANGE_SONGS_OF_ARTIST', 'CHANGE_ARTIST']),
      getInitSingerInfo(id) {
        this.CHANGE_ENTER_LOADING(true)
        this.getSingerInfo(id)
        const h = this.$refs.imgWrapper.offsetHeight
        this.$refs.songScrollWrapper.style.top = `${h - OFFSET}px`
        this.$refs.layer.style.top = `${h -OFFSET}px`
        this.$refs.songScroll.scrollRefresh()
        this.height = h
      },
      handleBack() {
        this.$router.go(-1)
      },
      handleScroll(pos) {
        const newY = pos.y
        const imageDom = this.$refs.imgWrapper
        const buttonDom = this.$refs.collectButton
        const headerDom = this.$refs.header.$el
        const layerDom = this.$refs.layer
        const minScollY = -(this.height - OFFSET) + 45
        const percent = Math.abs(newY / this.height);

        if (newY > 0) {
          imageDom.style.transform = `scale(${1 + percent})`
          buttonDom.style.transform = `translate3d(0, ${newY}px, 0)`
          layerDom.style.top = `${this.height - OFFSET + newY}px`
        } else if (newY >= minScollY) {
          layerDom.style.top = `${this.height - OFFSET - Math.abs(newY)}px`;
          //这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
          layerDom.style.zIndex = 1;
          imageDom.style.paddingTop = "75%";
          imageDom.style.height = 0;
          imageDom.style.zIndex = -1;
          //按钮跟着移动且渐渐变透明
          buttonDom.style["transform"] = `translate3d(0, ${newY}px, 0)`;
          buttonDom.style["opacity"] = `${1 - percent * 2}`;
        } else {
          //往上滑动，但是超过Header部分
          layerDom.style.top = `${45 - OFFSET}px`;
          layerDom.style.zIndex = 1;
          //防止溢出的歌单内容遮住Header
          headerDom.style.zIndex = 100;
          //此时图片高度与Header一致
          imageDom.style.height = `${45}px`;
          imageDom.style.paddingTop = 0;
          imageDom.style.zIndex = 99;
        }
      }
    },
    beforeDestroy() {
      
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style";

  .singer-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background: #f2f3f4;

    .img-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 75%;
      transform-origin: top;
      background-size: cover;
      z-index: 50;

      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.3);
      }
    }

    .collection-button {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      box-sizing: border-box;
      width: 120px;
      height: 40px;
      margin-top: -55px;
      z-index: 50;
      background: $theme-color;
      color: $font-color-light;
      border-radius: 20px;
      text-align: center;
      font-size: 0;
      line-height: 40px;

      .iconfont {
        display: inline-block;
        margin-right: 10px;
        font-size: 12px;
        vertical-align: 1px;
      }

      .text {
        display: inline-block;
        font-size: 14px;
        letter-spacing: 5px;
      }
    }

    .bg-layer{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: white;
      border-radius: 10px;
      z-index: 50;
    }

    .song-list-wrapper {
      position: absolute;
      z-index: 50;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      > div {
        position: absolute;
        left: 0;
        width: 100%;
        overflow: visible;
      }
    }
  }
</style>
