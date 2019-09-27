<template>
  <div>
    <Scroll direction="horizental">
      <div ref="category">
        <div class="list">
          <span>{{title}}</span>
          <span class="list-item" v-for="item in list" :key="item.key" :class="[oldVal === item.key ? 'selected': '']"
               @click="()=> { handleClick(item.key)}">
            {{item.name}}
          </span>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from '../scroll'

  export default {
    name: "HorizenItem",
    components: {
      Scroll
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      oldVal: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      handleClick: {
        type: Function,
        default: null
      }
    },
    mounted() {
      if (this.list.length > 0) {
        const categoryDOM = this.$refs.category
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
          totalWidth += ele.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/global-style.scss";

  .list {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;

    > span:first-of-type {
      display: block;
      flex: 0 0 auto;
      padding: 5px 0;
      margin-right: 5px;
      color: grey;
      font-size: $font-size-m;
      vertical-align: middle;
    }

    .list-item {
      flex: 0 0 auto;
      font-size: $font-size-m;
      padding: 5px 8px;
      border-radius: 10px;

      &.selected {
        color: $theme-color;
        border: 1px solid $theme-color;
        opacity: 0.8;
      }
    }
  }

</style>
