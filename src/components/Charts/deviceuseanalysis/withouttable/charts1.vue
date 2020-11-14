<template>
  <div>
    <chartsname chartsname="用户平均每日用水量用户数量百分比" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis1" />
      <div class="righttable">
        <div>
          <el-table height="250" :data="tableData">
            <el-table-column width="100" prop="time" label="日均用水量"></el-table-column>
            <el-table-column width="80" prop="count" label="用户数量"></el-table-column>
            <el-table-column width="100" prop="scale" label="数量占比"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import chartsname from '@/components/chartsname'
import { dayAverageWater } from '@/api/deviceuseanalysis/index'
import xytable from '@/components/Charts/xytabletest'

export default {
  components: {
    chartsname,
    xytable
  },
  data() {
    return {
      option: {
        color: ['#80adf8'],
        tooltip: {
          trigger: 'axis'
        },

        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            min: 0,
            max: 100,
            type: 'value',
            interval: 25,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '数据',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ['#80adf8', '#f75778']
                  if (params.dataIndex % 2 == 1) {
                    return colorList[1]
                  }
                  return colorList[0]
                }
              }
            },
            data: []
          }
        ]
      },
      ydata: ['时间', '次数', '次数占比'],
      xdatainit: [[], [], []],
      tableData: []
    }
  },
  created() {
    dayAverageWater().then(x => {
      let a = []
      let b = []
      let c = []
      let d = []
      console.log(x.data);
      x.data.forEach((y, index) => {
        a[index] = y.interval.slice(5).replace('_', '-')
        b[index] = y.count
        c[index] = y.proportion
        d[index] = parseFloat(y.proportion)
      })
      a[a.length - 1] = '大于2000'
      this.xdatainit = [a, b, c]
      this.option.xAxis[0].data = a
      this.option.series[0].data = d
       this.echartsupdata()
      //   右侧表格数据
      let tabledata = []
      this.xdatainit[0].map((x, y) => {
        let temp = Object.create(null)
        temp.time = this.xdatainit[0][y]
        temp.count = this.xdatainit[1][y]
        temp.scale = this.xdatainit[2][y]
        tabledata[y] = temp
      })
      this.tableData = tabledata
    })
  },
  methods: {
    echartsupdata() {
      this.$nextTick(() => {
        var myChart = echarts.init(
          document.getElementById('deviceuseanalysis1')
        )
        myChart.setOption(this.option)
      })
    }
  }
}
</script>
<style scoped>
#deviceuseanalysis1 {
  width: 68%;
  height: 300px;
}

.chartsbgbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  height: 300px;
  align-items: flex-start;
}
.righttable {
  width: 30%;
  height: 300px;

  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
