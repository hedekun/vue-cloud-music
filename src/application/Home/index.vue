<template>
  <div>
    <div class="top">
      <span class="iconfont menu">&#xe65c;</span>
      <span class="title">VueApp</span>
      <span class="iconfont search">&#xe62b;</span>
    </div>
    <div class="tab">
      <RouterLink to="/recommend" active-class="selected">
        <div class="tabItem">
          <span>推荐</span>
        </div>
      </RouterLink>
      <RouterLink to="/singers" active-class="selected">
        <div class="tabItem">
          <span>歌手</span>
        </div>
      </RouterLink>
      <RouterLink to="/rank" active-class="selected">
        <div class="tabItem">
          <span>排行榜</span>
        </div>
      </RouterLink>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style";

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px;
    background: $theme-color;

    span {
      line-height: 40px;
      color: #f1f1f1;
      font-size: 20px;

      .iconfont {
        font-size: 25px;
      }
    }
  }

  .tab {
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: $theme-color;

    a {
      flex: 1;
      padding: 2px 0;
      font-size: 14px;
      color: #e4e4e4;

      &.selected {
        span {
          padding: 3px 0;
          font-weight: 700;
          color: #f1f1f1;
          border-bottom: 2px solid #f1f1f1;
        }
      }
    }
  }

  .tabItem {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
