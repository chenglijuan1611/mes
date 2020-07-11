<template>
  <div>
    <chartsname chartsname="设备分布图" />
    <div class="chartsbgbox">
      <div id="devicedistribution" />
      <i style="opacity:0.5" class="el-icon-circle-plus-outline iconar"></i>
      <i style="opacity:0.5" class="el-icon-remove-outline iconar"></i>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china'

import chartsname from '@/components/chartsname'
import { devicedistributionapi } from '@/api/devicedistribution'
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('echarts/map/js/province', true, /\.js$/)
requireAll(req)

export default {
  components: {
    chartsname
  },
  data() {
    return {
      option: {
        tooltip: {
          formatter: function(a) {
            let temp
            try {
              temp = `${a.name} <br />设备数量：${a.data.value} <br />当前联网数量：${a.data.online}`
            } catch (error) {}
            return temp
          }
        },
        geo: {
          map: '北京',
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        visualMap: {
          realtime: false,
          calculable: true,
          type: 'piecewise',
          left: '8%',
          inRange: {
            color: ['#ded9ea', '#a8a0cc']
          }
        },
        series: [
          {
            name: '数据',
            type: 'map',
            geoIndex: 0,
            data: [
              {
                name: '南昌市',
                value: 10,
                level: 1
              },
              {
                name: '景德镇是',
                value: 12,
                level: 2
              },
              {
                name: '萍乡市',
                value: 11,
                level: 3
              },
              {
                name: '赣州',
                value: 16,
                level: 2
              },
              {
                name: '吉安',
                value: 12,
                level: 1
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    devicedistributionapi().then(x => {
      // let temp = x.data.map(y => {
      //   return {
      //     name: y.province,
      //     value: y.specificCount,
      //     online: y.onlineCount
      //   }
      // })
      // this.option.series[0].data = temp
      this.echartsupdated()
    })
  },
  mounted() {
    // this.echartsupdated()
  },
  methods: {
    echartsupdated() {
      this.$nextTick(() => {
        let myChart = echarts.init(
          document.getElementById('devicedistribution')
        )
        myChart.setOption(this.option)
        myChart.on('click', function(params) {
          console.log(params)
        })
      })
    }
  }
}
</script>
<style scoped>
#devicedistribution {
  width: 600px;
  height: 400px;
}

.chartsbgbox {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.iconar {
  font-size: 40px;
  color: #909090;
  position: relative;
  top: 300px;
  right: 5%;
}
</style>