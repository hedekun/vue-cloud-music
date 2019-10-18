<template>
  <div class="header-container">
    <i class="iconfont back" @click="handleClick">&#xe655;</i>
    <marquee v-if="isMarquee"><h1>{{title}}</h1></marquee>
    <h1 v-else>{{title}}</h1>
  </div>
</template>

<script>
  export default {
    name: "my-header",
    props: {
      handleClick: {
        type: Function,
        default: null
      },
      title: {
        type: String,
        default: '标题'
      },
      isMarquee: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style";

  .header-container {
    position: fixed;
    padding: 0 10px 5px 10px;
    height: 40px;
    width: 100%;
    z-index: 100;
    display: flex;
    line-height: 40px;
    color: $font-color-light;

    .back {
      margin-right: 5px;
      font-size: 20px;
      width: 20px;
    }

    > h1 {
      font-size: $font-size-l;
      font-weight: 700;
    }
  }
</style>
