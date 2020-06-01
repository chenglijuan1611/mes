<template>
  <div>
    <chartsname chartsname="每小时内用水次数占总用水次数的比例" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis3" />
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
      tableData: [
        {
          date: '0-100',
          name: '50',
          address: '20%'
        },
        {
          date: '0-100',
          name: '50',
          address: '20%'
        },
        {
          date: '0-100',
          name: '50',
          address: '20%'
        },
        {
          date: '0-100',
          name: '50',
          address: '20%'
        },
        {
          date: '0-100',
          name: '50',
          address: '20%'
        },
        {
          date: '0-100',
          name: '50',
          address: '20%'
        },
        {
          date: '0-100',
          name: '50',
          address: '20%'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById('deviceuseanalysis3'))

      var option = {
        color: ['#80adf8'],
        tooltip: {
          trigger: 'axis'
        },

        xAxis: [
          {
            type: 'category',
            data: [
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
            data: [
              19,
              15,
              13,
              10,
              15,
              14,
              16,
              27,
              15,
              13,
              10,
              15,
              14,
              16,
              27,
              15,
              14,
              16,
              27,

              10,
              15,

              13,
              14,
              10
            ]
          }
        ]
      }

      myChart.setOption(option)
    })
  }
}
</script>
<style scoped>
#deviceuseanalysis3 {
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
