<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="this.config.total"
      :current-page.sync="this.config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    myConfig: Object,
  },
  watch: {
    config: {
      handler: function () {
        console.log(this.config, "config");
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      config: this.myConfig,
    };
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePage(row) {
      this.$emit("change", row);
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: 100%;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: -100px;
    right: 20px;
  }
}
</style>
