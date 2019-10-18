<template>
  <div class="recommend-container">
    <Scroll>
      <div>
        <Sliver :bannerList="bannerList"></Sliver>
        <List :recommend-list="recommendList"></List>
        <Loading v-show="enterLoading"/>
      </div>
    </Scroll>
    <router-view />
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
</style>
