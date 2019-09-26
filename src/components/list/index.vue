<template>
  <div class="list-wrapper">
    <h1 class="title">推荐歌单</h1>
    <div class="list">
      <div v-for="(item, index) in recommendList" :key="item.id + index" class="list-item">
        <div class="img_wrapper">
          <div class="decorate"/>
          <img v-lazy='item.picUrl + "?param=300x300"' width="100%" height="100%" alt="music"/>
          <div class="play_count">
            <i class="iconfont play">&#xe885;</i>
            <span class="count">{{item.playCount | count}}</span>
          </div>
        </div>
        <div class="desc">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCount } from '../../api/utils'
  import Vue from 'vue'
  import VueLazyLoad from 'vue-lazyload'
  Vue.use(VueLazyLoad,{
    loading: require('../../assets/music.png'),
    attempt: 1
  })

  export default {
    name: 'list',
    filters: {
      count: getCount
    },
    props: {
      recommendList: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style.scss";
.list-wrapper{
  max-width: 100%;
  .title{
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: $theme-color
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .list-item{
      position: relative;
      width: 32%;

      .img_wrapper{
        .decorate{
          position: absolute;
          top: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient(hsla(0,0%, 43%, 4), hsla(0,0%,100%,0));
        }
        position: relative;
        height: 0;
        padding-bottom: 100%;
        .play_count{
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: $font-size-s;
          line-height: 15px;
          color: $font-color-light;
          .play{
            vertical-align: top;
          }
        }
        img{
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      .desc{
        overflow: hidden;
        margin-top: 2px;
        padding: 0 2px;
        height: 50px;
        text-align: left;
        font-size: $font-size-s;
        line-height: 1.4;
        color: $font-color-desc
      }
    }
  }
}
</style>
