<template>
  <div class="recommend-container">
    <Scroll>
      <div>
        <Sliver :bannerList="bannerList"></Sliver>
        <List :recommend-list="recommendList"></List>
        <Loading v-show="enterLoading"/>
      </div>
    </Scroll>
    <transition name="fly">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import Scroll from '../../baseUI/scroll'
  import Sliver from '../../components/sliver'
  import List from '../../components/list'
  import Loading from '../../baseUI/loading'

  const {mapState, mapActions} = createNamespacedHelpers('recommend')

  export default {
    name: "recommend",
    components: {
      Scroll,
      Sliver,
      List,
      Loading
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        recommendList: state => state.recommendList,
        bannerList: state => state.bannerList,
        enterLoading: state => state.enterLoading
      }),
    },
    created() {
      this.changeBanner()
      this.changeRecommendList()
    },
    methods: {
      ...mapActions(['changeRecommendList', 'changeBanner'])
    }
  }
</script>

<style scoped>
.recommend-container{
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
}
.fly-enter, .fly-leave-to{
  transform: rotateZ(30deg) translate3d(100%, 0, 0);
  transform-origin: right bottom;
}
.fly-enter-active, .fly-leave-active{
  transition: transform .3s;
}
</style>
