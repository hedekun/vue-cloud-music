<template>
  <div>
    <div class="nav-container">
      <Horizen :list=categoryTypes title="分类(默认热门)" :handleClick=handleUpdateCategory :oldVal="category"/>
      <Horizen :list=alphaTypes title="首字母" :handleClick=handleUpdateAlpha :oldVal="alpha"/>
    </div>
    <div class="list-container">
      <Scroll :pull-up="handlePullUp" :pull-up-loading="pullUpLoading" :pull-down-loading="pullDownLoading" :pull-down="handlePullDown" ref="scroll">
        <div class="list">
          <div class="list-item" v-for="(item, index) in singerList" :key="item.accountId + '' + index" @click="enterDetail(item.id)">
            <div class="img_wrapper">
              <img v-lazy="`${item.picUrl}?param=300*300`" alt="music" width="100%" height="100%"/>
            </div>
            <span className="name">{{item.name}}</span>
          </div>
        </div>
      </Scroll>
      <Loading v-show="enterLoading"></Loading>
    </div>
    <router-view />
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueLazyLoad from 'vue-lazyload'
  import Horizen from '../../baseUI/horizen-item'
  import Scroll from '../../baseUI/scroll'
  import {categoryTypes, alphaTypes} from '../../api/config'
  import {createNamespacedHelpers} from 'vuex'
  import Loading from '../../baseUI/loading'

  const {mapMutations, mapActions, mapState} = createNamespacedHelpers('singers')

  Vue.use(VueLazyLoad, {
    loading: require('../../assets/singer.png'),
    attempt: 1
  })

  export default {
    name: "singers",
    components: {
      Horizen,
      Scroll,
      Loading
    },
    data() {
      return {
        category: '',
        alpha: '',
        categoryTypes: categoryTypes,
        alphaTypes: alphaTypes
      }
    },
    computed: {
      ...mapState({
        singerList: state => state.singerList,
        enterLoading: state => state.enterLoading,
        pullUpLoading: state => state.pullUpLoading,
        pullDownLoading: state => state.pullDownLoading
      })
    },
    mounted() {
      this.getHotSingerList()
    },
    methods: {
      ...mapActions(['getHotSingerList', 'getSingerList', 'pullUpRefresh', 'pullDownRefresh']),
      ...mapMutations(['CHANGE_PULL_UP_LOADING']),
      handleUpdateCategory(val) {
        this.category = this.category === val ? '' : val
        const data = {
          alpha: this.alpha,
          category: this.category
        }
        this.$refs.scroll.scrollRefresh()
        this.getSingerList(data)
      },
      handleUpdateAlpha(val) {
        this.alpha = this.alpha === val ? '' : val
        const data = {
          alpha: this.alpha,
          category: this.category
        }
        this.$refs.scroll.scrollRefresh()
        this.getSingerList(data)
      },
      handlePullUp() {
        this.pullUpRefresh({
          category: this.category,
          alpha: this.alpha,
          hot: this.category === ''
        })
      },
      handlePullDown() {
        this.pullDownRefresh({
          category: this.category,
          alpha: this.alpha,
        })
      },
      enterDetail(id) {
        this.$router.push(`/singers/${id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style";

  .nav-container {
    box-sizing: border-box;
    position: fixed;
    top: 95px;
    width: 100%;
    padding: 5px;
    overflow: hidden;
  }

  .list-container {
    position: fixed;
    top: 160px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    width: 100%;

    .list {
      display: flex;
      margin: auto;
      flex-direction: column;
      overflow: hidden;

      .title {
        margin: 10px 0 10px 10px;
        color: $font-color-desc;
        font-size: $font-size-s;
      }

      .list-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        margin: 0 5px;
        padding: 5px 0;
        align-items: center;
        border-bottom: 1px solid $border-color;

        .img_wrapper {
          margin-right: 20px;

          img {
            border-radius: 3px;
            width: 50px;
            height: 50px;
          }
        }

        .name {
          font-size: $font-size-m;
          color: $font-color-desc;
          font-weight: 500;
        }
      }
    }
  }

</style>
