<template>
  <el-row class="home" :gutter="20">
    <!-- 用户信息&销量 -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
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
      <!-- 销量 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 订单信息&销售情况 -->
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <!-- 订单数量 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: flex, padding: 0}"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <common-echarts :chartData="this.echartData.order" style="height: 280px"></common-echarts>
      </el-card>
      <!-- 柱状图&饼图 -->
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <common-echarts :chartData="this.echartData.user" style="height: 240px"></common-echarts>
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <common-echarts :chartData="this.echartData.video" :isAxisChart="false" style="height: 240px"></common-echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import data from "../../data/TableData.js";
import cData from "../../data/CountData.js";
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";

import CommonEcharts from '../../components/CommonEcharts.vue'

export default {
  name: "HomeView",
  components: {
    CommonEcharts,
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总共购买",
      },
      countData: cData,
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        }
      }
    };
  },
  mounted() {
    getData().then((res) => {
      console.log(res);
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;

        //初始化echart
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        //配置echart数据
        //线段图
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        //柱状图
        this.echartData.user.xData = data.userData.map((item) => item.date)
        this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ]
        //饼图  
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: 'pie', 
            }
          ]
      }
    });
  },
};
</script>

<style>
</style>