<template>
  <div>
    <chartsname chartsname="用户单次时长占所有用水次数的百分比" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis2" />
      <el-table
        height="250"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="用户单次时长"
        />
        <el-table-column
          prop="name"
          label="次数"
        />
        <el-table-column
          prop="address"
          label="用水次数占比"
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
          date: "0-30分钟",
          name: "90",
          address: "30%"
        },
        {
          date: "30-60分钟",
          name: "50",
          address: "20%"
        },
        {
          date: "60-90分钟",
          name: "50",
          address: "20%"
        },
        {
          date: "90分钟以上",
          name: "50",
          address: "20%"
        },
 
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById("deviceuseanalysis2"));
      var data = [
        { value: 335, name: "0-30分钟" },
        { value: 310, name: "30-60分钟" },
        { value: 234, name: "60-90分钟" },
        { value: 135, name: "90分钟以上" }
      ];
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: 20,

          bottom: 20,
          data: data.value,

          selected: data.name
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: ["50%", "70%"],

            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      myChart.setOption(option);
    });
  }
};
</script>
<style scoped>
#deviceuseanalysis2 {
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
