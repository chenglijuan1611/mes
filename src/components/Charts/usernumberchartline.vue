<template>
  <div>
    <chartsname chartsname="新增用户折线图" />

    <div class="chartsbgbox">
      <div class="block" style="padding-top:1vw">
        <span class="demonstration">时段选择</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
         
        />
        <el-button
          size="mini"
          style="margin-left:1vw;background-color:#15b9bb"
          type="primary"
          icon="el-icon-search"
        >搜索</el-button>
      </div>
      <div id="newuserline" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
import chartsname from '@/components/chartsname'

export default {
  components: {
    chartsname
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById('newuserline'))

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'category',
          data: [
            '4-15',
            '4-16',
            '4-17',
            '4-18',
            '4-19',
            '4-20',
            '4-21',
            '4-22',
            '4-23',
            '4-24',
            '4-25'
          ]
        },
        yAxis: {
          name: '数量',
          type: 'value'
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320
            ],
            type: 'line'
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    })
  }
}
</script>
<style scoped>
#newuserline {
  width: 40vw;
  height: 30vw;
}

.chartsbgbox {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}
.timeselection {
  width: 100%;
  height: 20px;
  background-color: #111;
}
</style>
