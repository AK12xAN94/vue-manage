<template>
  <div ref="echarts"></div>
</template>

<script>
import * as echart from "echarts";

export default {
  name: 'CommonEcharts',  
  props: {
    //是否为折线图和柱状图，否则为柱状图
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    //传入的图表数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      //折线图或柱状图配置
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },

      //饼状图配置
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },

      echart: null,
    };
  },
  watch: {
      //监听传入的图表数据，并根据其进行图表的初始化工作
    chartData: {
      handler: function () {
        this.initChart();
        //如果已有图表则直接进行渲染，否则先对图表进行初始化
        if (this.echart) {
          this.echart.setOption(this.options);
        } else {
          this.echart = echart.init(this.$refs.echarts);
          this.echart.setOption(this.options);
        }
      },
      deep: true,
      // immediate: true,
    },
  },
  methods: {
    initChart() {
      this.initChartData();
    },
    initChartData() {
        //折线图或柱状图
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
          //饼图
        this.normalOption.series = this.chartData.series;
      }
    },
  },
  computed: {
    options() {
      //根据图表类型对option进行配置
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
};
</script>

<style>
</style>