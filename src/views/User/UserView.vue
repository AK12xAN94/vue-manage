<template>
  <div class="manage">
    <!-- 表单弹窗 -->
    <el-dialog
      :visible.sync="isShow"
    >
      <div slot="title" class="dialog-title">{{ operateType === 'add' ? '新增用户' : '更新用户' }}</div>
      <common-form
        :formLabel="operateFormLabel"
        :myForm="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 表头 -->
    <div class="manage_header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :myForm="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList">搜索</el-button>
      </common-form>
    </div>
    <!-- 表格内容 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :myConfig="config"
      @change="getList"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>

import CommonForm from "../../components/CommonForm.vue";
import CommonTable from '../../components/CommonTable.vue'

import formLabelData from '../../data/FormData.js'

import { getUser } from '../../api/data'

export default {
  name: "UserView",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: formLabelData,
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
          keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'sexLabel',
          label: '性别',
        },
        {
          prop: 'birth',
          label: '出生日期',
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        },
      ],
      config: {
        page: 1,
        total: 30
      }
    };
  },
  methods: {
    confirm() {
        if(this.operateType === 'edit'){
            this.$http.post('/user/edit', this.operateForm).then(res => {
                console.log(res)
                this.isShow = false
            })
        }else {
            this.$http.post('/user/add', this.operateForm).then(res => {
                console.log(res)
                this.isShow = false
            })
        }
        this.getList()
    },
    addUser() {
        this.isShow = true
        this.operateType = 'add',
        this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      }
    },
    getList(name = '') {
      this.config.loading = true
      name = name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex ===0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$http.get('user/del', {
          params: { id }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    }
  },
  created() {
    this.getList()
  },
};
</script>

<style lang="less" scoped>
.manage {
    .dialog-title {
        text-align: center;
        height: 100px;
    }
    .manage_header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        height: 50px;
    }
}

</style>
