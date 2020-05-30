<template>
  <div>
    <chartsname chartsname="用户单次时长占所有用水次数的百分比" />
    <div class="chartsbgbox">
      <div id="deviceuseanalysis2" />
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
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById('deviceuseanalysis2'))
      var data = [
        { value: 335, name: '0-30分钟' },
        { value: 310, name: '30-60分钟' },
        { value: 234, name: '60-90分钟' },
        { value: 135, name: '90分钟以上' }
      ]
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 20,

          bottom: 20,
          data: data.value,

          selected: data.name
        },
        title: [
          {
            text: '300',
            left: 'center',
            top: '40%',
            textStyle: {
              color: '#323232',
              fontSize:36,
              align: 'center'
            }
          },
          {
            text: '销售总量',
            left: 'center',
            top: '55%',
            textStyle: {
              color: '#b2b2b2',
              fontSize:  15,
              align: 'center'
            }
          }
        ],

        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: ['50%', '70%'],

            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      myChart.setOption(option)
    })
  }
}
</script>
<style scoped>
#deviceuseanalysis2 {
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
