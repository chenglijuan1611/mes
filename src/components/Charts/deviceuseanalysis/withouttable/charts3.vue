<template>
  <div>
    <chartsname chartsname="每小时内用水次数占总用水次数的比例" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysisw3" />

      <div  class="righttable">
        <div>
          <el-table height="250" :data="tableData">
            <el-table-column prop="time" label="日期"></el-table-column>
            <el-table-column prop="count" label="姓名"></el-table-column>
            <el-table-column prop="scale" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import chartsname from '@/components/chartsname'
import xytable from '@/components/Charts/xytabletest'
import { usewater } from '@/api/deviceuseanalysis/index'
export default {
  components: {
    chartsname,
    xytable
  },

  created() {
    usewater().then(x => {
      let a = x.data.perHourTotal
      console.log(x)

      let temp = [
        a.clock0,
        a.clock1,
        a.clock2,
        a.clock3,
        a.clock4,
        a.clock5,
        a.clock6,
        a.clock7,
        a.clock8,
        a.clock9,
        a.clock10,
        a.clock11,
        a.clock12,
        a.clock13,
        a.clock14,
        a.clock15,
        a.clock16,
        a.clock17,
        a.clock18,
        a.clock19,
        a.clock20,
        a.clock21,
        a.clock22,
        a.clock23
      ]
      let scale = [
        x.data.clock_0,
        x.data.clock_1,
        x.data.clock_2,
        x.data.clock_3,
        x.data.clock_4,
        x.data.clock_5,
        x.data.clock_6,
        x.data.clock_7,
        x.data.clock_8,
        x.data.clock_9,
        x.data.clock_10,
        x.data.clock_11,
        x.data.clock_12,
        x.data.clock_13,
        x.data.clock_14,
        x.data.clock_15,
        x.data.clock_16,
        x.data.clock_17,
        x.data.clock_18,
        x.data.clock_19,
        x.data.clock_20,
        x.data.clock_21,
        x.data.clock_22,
        x.data.clock_23
      ].map(x => {
        if (x === 0) {
          return x
        }
        let x100 = x * 100
        return x100.toFixed(2) + '%'
      })

      this.option.series[0].data = temp

      this.xdatainit[1] = temp
      this.xdatainit[2] = scale
  
      this.echartsupdated()
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
  data() {
    return {
      tableData: [],
      option: {
        color: ['#80adf8'],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '00:00',
              '01:00',
              '02:00',
              '03:00',
              '04:00',
              '05:00',
              '06:00',
              '07:00',
              '08:00',
              '09:00',
              '10:00',
              '11:00',
              '12:00',
              '13:00',
              '14:00',
              '15:00',
              '16:00',
              '17:00',
              '18:00',
              '19:00',
              '20:00',
              '21:00',
              '22:00',
              '23:00'
            ]
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
            color: '#3484fc',
            name: '数据',
            type: 'bar',
            barWidth: 10,
            itemStyle: { barBorderRadius: 5 },
            data: []
          }
        ]
      },
      ydata: ['时间', '次数', '次数占比'],
      xdatainit: [
        [
          '00.00',
          '01.00',
          '02.00',
          '03.00',
          '04.00',
          '05.00',
          '06.00',
          '07.00',
          '08.00',
          '09.00',
          '10.00',
          '11.00',
          '12.00',
          '13.00',
          '14.00',
          '15.00',
          '16.00',
          '17.00',
          '18.00',
          '19.00',
          '20.00',
          '21.00',
          '22.00',
          '23.00'
        ],
        [],
        []
      ]
    }
  },
  mounted() {},
  methods: {
    echartsupdated() {
      this.$nextTick(() => {
        let myChart = echarts.init(
          document.getElementById('deviceuseanalysisw3')
        )

        myChart.setOption(this.option)
      })
    }
  }
}
</script>
<style scoped>
#deviceuseanalysisw3 {
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
