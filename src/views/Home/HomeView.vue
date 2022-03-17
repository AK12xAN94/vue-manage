<template>
  <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
          <el-card shadow="hover">
              <div class="user">
                  <img :src="userImg"/>
                  <div class="userinfo">
                      <p class="name">Admin</p>
                      <p class="access">超级管理员</p>
                  </div>
              </div>
              <div class="login-info">
                  <p>上次登录时间: <span>2022年3月17日14:23:45</span></p>
                  <p>上次登录地点： <span>广州</span></p>
              </div>
          </el-card>
      </el-col>
  </el-row>
</template>

<script>
export default {
    name: 'HomeView',
    data() {
        return {
            userImg: require('../../assets/images/user.png')
        }
    },
}
</script>

<style>

</style>