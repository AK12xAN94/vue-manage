<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      // 别名
      close: "closeTag",
    }),
    // 点击tag进行跳转
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
    // 关闭tag逻辑
    handleClose(tag, index) {
      // 获取tabsList数组最后一个元素的索引
      const last = this.tags.length - 1;
      // 调用tab.js的closeTag方法
      this.close(tag);
      if (tag.name !== this.$route.name) {
        //点击的标签不是当前路由，则不需要修改tag焦点
        return;
      }
      console.log('index:' + index + 'last:' + last)
      if (index === last) {
        //关闭最后一个tag，跳转到倒数第二个标签所指向的路由
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 否则跳到最后一个标签所属的路由
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  background-color: transparent;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>