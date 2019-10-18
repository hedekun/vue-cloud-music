<template>
  <div class="album-container">
    <MyHeader ref="headerEl" :title="title" :isMarquee="isMarquee" :handleClick="handleBack"/>
    <Scroll :bounce-top="false" :on-scroll="handleScroll" v-if="currentAlbum">
      <div>
        <div class="top-desc">
          <div class="background" :style="{backgroundImage:'url(' + currentAlbum.coverImgUrl + ')'}">
            <div class="filter"/>
          </div>
          <div class="img_wrapper">
            <div class="decorate"/>
            <img :src="currentAlbum.coverImgUrl" alt="">
            <div class="play_count">
              <i class="iconfont play">&#xe885;</i>
              <span class="count">{{getCount(currentAlbum.subscribedCount)}}</span>
            </div>
          </div>
          <div class="desc_wrapper">
            <div class="title">{{currentAlbum.name}}</div>
            <div class="person">
              <div class="avatar">
                <img :src="currentAlbum.creator.avatarUrl" alt="">
              </div>
              <div class="name">{{currentAlbum.creator.nickname}}</div>
            </div>
          </div>
        </div>

        <div class="menu">
          <div>
            <i class="iconfont">&#xe6ad;</i>
            评论
          </div>
          <div>
            <i class="iconfont">&#xe86f;</i>
            点赞
          </div>
          <div>
            <i class="iconfont">&#xe62d;</i>
            收藏
          </div>
          <div>
            <i class="iconfont">&#xe606;</i>
            更多
          </div>
        </div>

        <div class="songList">
          <div class="first_line">
            <div class="play_all">
              <i class="iconfont">&#xe6e3;</i>
              <span>播放全部
              <span class="sum">共{{currentAlbum.tracks.length}}首</span>
            </span>
            </div>
            <div class="add_list">
              <i class="iconfont">&#xe62d;</i>
              <span>收藏{{getCount(currentAlbum.subscribedCount)}}</span>
            </div>
          </div>
          <ul class="song-item">
            <li v-for="(item, index) in currentAlbum.tracks" :key="index">
              <span class="index">{{index+1}}</span>
              <div class="info">
                <span>{{item.name}}</span>
                <span>
                {{getName(item.ar)}}-{{item.al.name}}
              </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import {getCount, getName} from "../../api/utils"
  import MyHeader from '../../baseUI/header'
  import Scroll from '../../baseUI/scroll'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('album')
  export default {
    name: "album",
    components: {
      MyHeader,
      Scroll
    },
    data() {
      return {
        title: '返回',
        isMarquee: false,
      }
    },
    computed: {
      ...mapState({
        currentAlbum: state => state.currentAlbum,
        enterLoading: state => state.enterLoading
      }),
    },
    mounted() {
      this.getAlbumData(this.$route.params.id)
    },
    methods: {
      ...mapActions(['getAlbumList', 'changeEnterLoading']),
      getCount: getCount,
      getName: getName,
      getAlbumData(id) {
        this.changeEnterLoading(true)
        this.getAlbumList(id)
      },
      handleScroll(pos) {
        const minScrollY = -45
        const percent = Math.abs(pos.y / minScrollY)
        const headerDom = this.$refs.headerEl.$el
        if(pos.y < minScrollY) {
          headerDom.style.backgroundColor = '#d44439'
          headerDom.style.opacity = Math.min(1, (percent -1)/2)
          this.title = this.currentAlbum.name
          this.isMarquee = true
        } else {
          headerDom.style.backgroundColor = ''
          headerDom.style.opacity = 1
          this.title = '歌单'
          this.isMarquee = false
        }
      },
      handleBack() {
        this.$router.go(-1)
      },
    }
  }
</script>


<style scoped lang="scss">
  @import "../../assets/global-style";

  .album-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #fff;

    .top-desc {
      background-size: 100%;
      padding: 5px 20px 50px 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: 275px;
      position: relative;

      .background {
        z-index: -1;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: 100% 100%;
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(20px);

        .filter {
          position: absolute;
          z-index: 10;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(7, 17, 27, 0.2);
        }
      }

      .img_wrapper {
        width: 120px;
        height: 120px;
        position: relative;

        .decorate {
          position: absolute;
          top: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient(hsla(0, 0%, 43%, .4), hsla(0, 0%, 100%, 0));
        }

        .play_count {
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: $font-size-s;
          line-height: 15px;
          color: $font-color-light;

          .play {
            vertical-align: top;
          }
        }

        img {
          width: 120px;
          height: 120px;
          border-radius: 3px;
        }
      }

      .desc_wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 120px;
        padding: 0 10px;

        .title {
          max-height: 70px;
          color: $font-color-light;
          font-weight: 700;
          line-height: 1.5;
          font-size: $font-size-l;
        }
      }

      .person {
        display: flex;

        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 5px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .name {
          line-height: 20px;
          font-size: $font-size-m;
          color: $font-color-desc-v2;
        }
      }
    }

    .menu {
      position: relative;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 30px 20px 30px;
      margin: -100px 0 0 0;

      > div {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        text-align: center;
        font-size: $font-size-s;
        color: $font-color-light;
        z-index: 100;
        font-weight: 500;

        .iconfont {
          font-size: 20px;
        }
      }
    }

    .songList {
      border-radius: 10px;
      opacity: .98;

      .first_line {
        box-sizing: border-box;
        padding: 10px 0;
        margin-left: 10px;
        position: relative;
        justify-content: space-between;
        border-bottom: 1px solid $border-color;

        .play_all {
          display: inline-block;
          line-height: 24px;
          color: $font-color-desc;

          .iconfont {
            font-size: 24px;
            margin-right: 10px;
            vertical-align: top;
          }

          .sum {
            font-size: $font-size-s;
            color: $font-color-desc-v2;
          }

          > span {
            vertical-align: top;
          }
        }

        .add_list, .isCollected {
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 130px;
          line-height: 34px;
          background: $theme-color;
          color: $font-color-light;
          font-size: 0;
          border-radius: 3px;
          vertical-align: top;

          .iconfont {
            vertical-align: top;
            font-size: 10px;
            margin: 0 5px 0 10px;
          }

          span {
            font-size: 14px;
            line-height: 34px;
          }
        }

        .isCollected {
          display: flex;
          background: $background-color;
          color: $font-color-desc;
        }
      }

      .song-item {
        > li {
          display: flex;
          height: 60px;
          align-items: center;

          .index {
            flex-basis: 60px;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
          }

          .info {
            box-sizing: border-box;
            flex: 1;
            display: flex;
            height: 100%;
            padding: 5px 0;
            flex-direction: column;
            justify-content: space-around;
            border-bottom: 1px solid $border-color;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            > span {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            > span:first-child {
              color: $font-color-desc;
            }

            > span:last-child {
              font-size: $font-size-s;
              color: #bba8a8;
            }
          }
        }
      }
    }
  }

</style>
