<template>
  <div>
    <chartsname chartsname="用户平均每日用水量" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis1" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import chartsname from '@/components/chartsname'

export default {
  components: {
    chartsname
  },
  data() {
    return {
      xAxisdata: [
        '0-100',
        '101-200',
        '201-300',
        '301-400',
        '401-500',
        '501-600',
        '6000-700',
        '701-800',
        '801-900',
        '901-1000',
        '1100-1200',
        '1200-1300',
        '0-100',
        '101-200',
        '201-300',
        '301-400',
        '401-500',
        '501-600',
        '0-100',
        '101-200',
        '201-300',
        '301-400',
        '401-500',
        '501-600'
      ],
      seriesdata: [
        11,
        15,
        13,
        10,
        15,
        14,
        16,
        17,
        13,
        14,
        10,
        15,
        14,
        16,
        17,
        13,
        4,
        10,
        15,
        3,
        6,
        5,
        3,
        4
      ],
      tabledata: [
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' },
        { num: '0-100', a: '20' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById('deviceuseanalysis1'))

      var option = {
        color: ['#80adf8'],
        tooltip: {
          trigger: 'axis'
        },

        xAxis: [
          {
            type: 'category',
            data: this.xAxisdata
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
            data: this.seriesdata
          }
        ]
      }

      myChart.setOption(option)
    })
  }
}
</script>
<style scoped>
#deviceuseanalysis1 {
  width: 100%;
}

.chartsbgbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  height: 300px;
}
</style>
