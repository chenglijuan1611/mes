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
        { value: 90, name: '0-30分钟' },
        { value: 60, name: '30-60分钟' },
        { value: 114, name: '60-90分钟' },
        { value: 36, name: '90分钟以上' }
      ]
      var option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10
        },
        title: [
          {
            text: '300',
            left: 'center',
            top: '40%',
            textStyle: {
              color: '#323232',
              fontSize: 36,
              align: 'center'
            }
          },
          {
            text: '销售总量',
            left: 'center',
            top: '55%',
            textStyle: {
              color: '#b2b2b2',
              fontSize: 15,
              align: 'center'
            }
          }
        ],

        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: ['45%', '60%'],
            data,
            label: {
              formatter: '{d}%'
            },
            // 高亮区域样式
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
