<template>
  <div>
    <chartsname chartsname="用户平均每日用水量用户数量百分比" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis1" />
      <xytable :ydata="ydata" :xdata="xdatainit" style="width: 90%"></xytable>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import chartsname from "@/components/chartsname";
import { dayAverageWater } from "@/api/deviceuseanalysis/index";
import xytable from "@/components/Charts/xytabletest";

export default {
  components: {
    chartsname,
    xytable,
  },
  data() {
    return {
      option: {
        color: ["#80adf8"],
        tooltip: {
          trigger: "axis",
        },

        xAxis: [
          {
            type: "category",
            data: [],
          },
        ],
        yAxis: [
          {
            min: 0,
            max: 100,
            type: "value",
            interval: 25,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "数据",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ["#80adf8", "#f75778"];
                  if (params.dataIndex % 2 == 1) {
                    return colorList[1];
                  }
                  return colorList[0];
                },
              },
            },
            data: [],
          },
        ],
      },
      ydata: ["时间", "次数", "次数占比"],
      xdatainit: [[], [], []],
    };
  },
  created() {
    dayAverageWater().then((x) => {
      let a = [];
      let b = [];
      let c = [];
      let d = [];
      x.data.forEach((y, index) => {
        a[index] = y.interval.slice(5).replace("_", "-");
        b[index] = y.count;
        c[index] = y.proportion;
        d[index] = parseFloat(y.proportion);
      });
      a[a.length - 1] = "大于2000";
      this.xdatainit = [a, b, c];
      this.option.xAxis[0].data = a;
      this.option.series[0].data =d;
      this.echartsupdata();
    });
  },
  methods: {
    echartsupdata() {
      this.$nextTick(() => {
        var myChart = echarts.init(
          document.getElementById("deviceuseanalysis1")
        );
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style scoped>
#deviceuseanalysis1 {
  width: 100%;
  height: 60%;
}
.chartsbgbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  height: 430px;
  align-items: flex-start;
}
</style>
