<template>
  <div>
    <chartsname chartsname="用户平均每日用水量" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis1" />
      <el-table
        height="250"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日均用水量(升)"
        />
        <el-table-column
          prop="name"
          label="用户数量"
        />
        <el-table-column
          prop="address"
          label="数量占比"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import chartsname from "@/components/chartsname";

export default {
  components: {
    chartsname
  },
  data() {
    return {
      tableData: [
        {
          date: "0-100",
          name: "50",
          address: "20%"
        },
        {
          date: "0-100",
          name: "50",
          address: "20%"
        },
        {
          date: "0-100",
          name: "50",
          address: "20%"
        },
        {
          date: "0-100",
          name: "50",
          address: "20%"
        },
        {
          date: "0-100",
          name: "50",
          address: "20%"
        },
        {
          date: "0-100",
          name: "50",
          address: "20%"
        },
        {
          date: "0-100",
          name: "50",
          address: "20%"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById("deviceuseanalysis1"));

      var option = {
        color: ["#80adf8"],
        tooltip: {
          trigger: "axis"
        },

        xAxis: [
          {
            type: "category",
            data: [
              "0-100",
              "101-200",
              "201-300",
              "301-400",
              "401-500",
              "501-600",
              "6000-700",
              "701-800",
              "801-900",
              "901-1000",
              "1100-1200",
              "1200-1300",
              "0-100",
              "101-200",
              "201-300",
              "301-400",
              "401-500",
              "501-600",
              "0-100",
              "101-200",
              "201-300",
              "301-400",
              "401-500",
              "501-600"
            ]
          }
        ],
        yAxis: [
          {
            min: 0,
            max: 100,
            type: "value",
            interval: 25,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "数据",
            type: "bar",

            data: [
              1,
              5,
              3,
              10,
              15,
              4,
              6,
              7,
              3,
              4,
              10,
              15,
              4,
              6,
              7,
              3,
              4,
              10,
              15,
              3,
              6,
              5,
              3,
              4
            ]
          }
        ]
      };

      myChart.setOption(option);
    });
  }
};
</script>
<style scoped>
#deviceuseanalysis1 {
  width: 60vw;
  height: 15vw;
}

.chartsbgbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
}
</style>
