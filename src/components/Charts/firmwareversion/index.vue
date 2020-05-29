<template>
  <div>
    <chartsname chartsname="固件版本图" />
    <div class="chartsbgbox">
      <div id="firmwareversion" />
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
      var myChart = echarts.init(document.getElementById('firmwareversion'))
      var data = [
        { value: 400, name: '固件版本1' },
        { value: 150, name: '固件版本2' },
        { value: 100, name: '固件版本3' },
        { value: 250, name: '固件版本4' }
      ]
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: data.value,

          selected: data.name
        },
        series: [
          {
            name: '数据',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data,
            label: {
              normal: {
                formatter: '{c}台 {d}%  ',
 
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
#firmwareversion {
  width: 800px;
  height: 300px;
}

.chartsbgbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
}
</style>
