<template>
  <div class="song-list">
    <div class="first_line">
      <div class="play_all">
        <i class="iconfont">&#xe6e3;</i>
        <span>播放全部
        <span>共{{songs.length}}首</span>
        </span>
      </div>
      <div class="add_list" v-if="showCollect">
        <i class="iconfont">&#xe62d;</i>
        <span>收藏{{Math.floor(collectCount / 1000) / 10}}万</span>
      </div>
    </div>
    <ul class="song-item">
      <li v-for="(item, index) in songs" :key="item.id">
        <span class="index">{{index+1}}</span>
        <span class="info">
          <span>{{item.name}}</span>
          <span>
            {{ item.ar ? getName(item.ar) : getName(item.artists)}} - {{ item.al ? item.al.name : item.album.name }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getName} from '../../api/utils'

  export default {
    name: "songs-list",
    props: {
      songs: {
        type: Array,
        default: () => []
      },
      collectCount: {
        type: Number,
        default: 0
      },
      showCollect: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getName: getName
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style";

  .song-list {
    border-radius: 10px;
    opacity: 0.98;

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
</style>
