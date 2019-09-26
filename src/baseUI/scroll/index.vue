<template>
  <div ref="wrapper" class="scroll-container">
    <slot/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { debounce } from '../../api/utils'

  export default {
    name: 'scroll',
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
          this.scroll('on', scroll => {
            this.$emit('scroll', scroll)
          })
        }

        // 上拉刷新
        if (this.scroll && this.pullUp) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 100) {
              debounce(this.pullUp, 300)
            }
          })
        }

        // 下拉刷新
        if (this.scroll && this.pullDown) {
          this.scroll.on('touchEnd', pos => {
            if (pos.y > 50) {
              debounce(this.pullDown, 300)
            }
          })
        }

        // 刷新
        if (this.refresh && this.scroll) {
          this.scroll.refresh()
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
</style>
