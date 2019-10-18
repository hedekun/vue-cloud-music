<template>
  <div ref="wrapper" class="scroll-container">
    <slot/>
    <div class="pull-up-loading" v-show="pullUpLoading">
      <Loading></Loading>
    </div>
    <div class="pull-down-loading" v-show="pullDownLoading">
      <LoadingV2></LoadingV2>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { debounce } from '../../api/utils'
  import Loading from '../loading'
  import LoadingV2 from '../loading2'

  export default {
    name: 'scroll',
    components: {
      Loading,
      LoadingV2
    },
    props: {
      direction: {
        type: String,
        default: 'vertical'
      },
      click: {
        type: Boolean,
        default: true
      },
      refresh: {
        type: Boolean,
        default: true
      },
      onScroll: {
        type: Function,
        default: null
      },
      pullUpLoading: {
        type: Boolean,
        default: false
      },
      pullDownLoading: {
        type: Boolean,
        default: false
      },
      pullUp:{
        type: Function,
        default: null
      },
      pullDown: {
        type: Function,
        default: null
      },
      bounceTop: {
        type: Boolean,
        default: true
      },
      bounceBottom: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return{
        scroll: null
      }
    },
    mounted() {
     this.$nextTick(() => {
       this._initScroll()
       this._pullUpDebounce = debounce(this.pullUp, 1000)
       this._pullDownDebounce =  debounce(this.pullDown, 300)
     })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return false
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: this.direction === 'horizental',
          scrollY: this.direction === 'vertical',
          probeType: 3,
          click: this.click,
          bounce:{
            top: this.bounceTop,
            bottom: this.bounceBottom
          }
        })
        // 滚动事件
        if (this.scroll && this.onScroll) {
          this.scroll.on('scroll', scroll => {
            this.onScroll(scroll)
            // this.$emit('scroll', scroll)
          })
        }

        // 上拉刷新
        if (this.scroll && this.pullUp) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 100) {
              this._pullUpDebounce()
            }
          })
        }

        // 下拉刷新
        if (this.scroll && this.pullDown) {
          this.scroll.on('touchEnd', pos => {
            if (pos.y > 50) {
              this._pullDownDebounce()
            }
          })
        }

        // 刷新
        if (this.refresh && this.scroll) {
          this.scroll.refresh()
        }
      },
      scrollRefresh() {
        if(this.scroll) {
          this.scroll.refresh();
          this.scroll.scrollTo(0, 0);
        }
      }
    },
    beforeDestroy() {
      // 解绑事件是异步的
      Promise.all([this.scroll.off('scroll'), this.scroll.off('scrollEnd'), this.scroll.off('scrollEnd')]).then(() => {
        this.scroll = null
      })
    }
  }
</script>

<style scoped>
  .scroll-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .pull-up-loading{
    position: absolute;
    left:0; right:0;
    bottom: 5px;
    width: 60px;
    height: 60px;
    margin: auto;
    z-index: 100;
  }
  .pull-down-loading{
    position: absolute;
    left:0; right:0;
    top: 0;
    height: 30px;
    margin: auto;
    z-index: 100;
  }
</style>
