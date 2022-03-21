<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="i in item.opts"
          :key="i.value"
          :label="i.label"
          :value="i.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  props: {
    // 表单内容选项
    formLabel: Array,
    // 表单内容数据
    myForm: Object,
    // 行内表单模式
    inline: Boolean,
  },
  data() {
    return {
      form: this.myForm,
    };
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
</style>
