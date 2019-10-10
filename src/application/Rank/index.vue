<template>
  <div class="rank-container">
    <Scroll>
      <div>
        <h1 class="offical" v-show="!loading">官方榜</h1>
        <ul class="list" v-for="item in officalRank" :key="item.coverImgId">
          <div class="list-item">
            <div class="img_wrapper">
              <img :src="item.coverImgUrl" alt="">
              <div class="decorate"/>
              <span class="update_frequecy">
                {{item.updateFrequency}}
              </span>
            </div>
            <ul class="song-list">
              <li v-for="(songItem, index) in item.tracks" :key="index">
                {{index+1}}.{{songItem.first}}-{{songItem.second}}
              </li>
            </ul>
          </div>
        </ul>
        <h1 class="global" v-show="!loading">全球榜</h1>
        <ul class="list list-wrap">
          <div class="list-item" v-for="item in globalRank" :key="item.coverImgId">
            <div class="img_wrapper">
              <img :src="item.coverImgUrl" alt="">
              <div class="decorate"/>
              <span class="update_frequecy">
                {{item.updateFrequency}}
              </span>
            </div>
          </div>
        </ul>
      </div>
      <div class="enter-loading">
        <Loading v-show="loading"/>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from '../../baseUI/scroll'
  import Loading from '../../baseUI/loading'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('rank')

  export default {
    name: "rank",
    components: {
      Scroll,
      Loading
    },
    computed: {
      ...mapState({
        loading: state => state.loading,
        rankList: state => state.rankList
      }),
      officalRank() {
        return this.rankList.length > 0 ? this.rankList.slice(0, 4) : []
      },
      globalRank() {
        return this.rankList.length > 0 ? this.rankList.slice(4, this.rankList.length) : []
      }
    },
    data() {
      return {}
    },
    created() {
      this.getRankList()
    },
    methods: {
      ...mapActions(['getRankList'])
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style";

  .rank-container {
    position: fixed;
    top: 90px;
    bottom: 0;
    width: 100%;

    .offical,
    .global {
      margin: 10px 5px;
      padding-top: 15px;
      font-weight: 700;
      font-size: $font-size-m;
      color: $font-color-desc;
    }

    .list {
      margin-top: 10px;
      padding: 0 5px;
      background: $background-color;

      &::after {
        content: '';
        display: block;
        width: 32vw;
      }

      .list-item {
        display: flex;
        padding: 3px 0;
        border-bottom: 1px solid $border-color;

        .img_wrapper {
          width: 27vw;
          height: 27vw;
          border-radius: 3px;
          position: relative;

          .decorate {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, .4));
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }

          .update_frequecy {
            position: absolute;
            left: 7px;
            bottom: 7px;
            font-size: $font-size-ss;
            color: $font-color-light;
          }
        }

        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 10px 10px;

          > li {
            font-size: $font-size-s;
            color: grey;
          }
        }
      }
    }

    .list-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
      .list-item{
        .img_wrapper{
          width: 32vw;
          height: 32vw;
        }
      }
    }
  }
</style>
