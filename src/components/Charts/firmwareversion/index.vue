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
import { firmVerDistribute } from '@/api/system/firmVerDistribute'

export default {
  components: {
    chartsname
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: ' {b} : {c}台 ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10'
        },
        series: [
          {
            name: '固件版本图',
            type: 'pie',
            radius: [20, 100],
            roseType: 'area',
            data: [],
            label: {
              formatter: ' {b}  {c}台  {d}%'
            }
          }
        ]
      }
    }
  },
  created() {
    firmVerDistribute().then(x => {
      console.log(x.data)
      let data = x.data.map(y => {
        let temp = {}
        temp.name = y.firmVersion
        temp.value = y.count
        return temp
      })
      this.option.series[0].data = data
      this.echartsupdata()
    })
  },
  mounted() {},
  methods: {
    echartsupdata() {
      this.$nextTick(() => {
        let myChart = echarts.init(document.getElementById('firmwareversion'))
        // var data = [
        //   { value: 400, name: '固件版本1' },
        //   { value: 150, name: '固件版本2' },
        //   { value: 250, name: '固件版本3' },
        //   { value: 200, name: '固件版本4' }
        // ]

        myChart.setOption(this.option)
      })
    }
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
