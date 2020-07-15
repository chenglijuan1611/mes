<template>
  <div>
    <chartsname chartsname="设备分布图" />
    <div class="chartsbgbox">
      <div id="devicedistribution" />
      <i @click="provincedata" style="opacity:0.5" class="el-icon-arrow-left iconar"></i>
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
          map: 'china',
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
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.provincedata()
  },
  mounted() {
    // this.echartsupdated()
  },
  methods: {
    provincedata() {
      devicedistributionapi().then(x => {
        let temp = x.data.map(y => {
          return {
            name: y.province,
            value: y.specificCount,
            online: y.onlineCount
          }
        })
        this.option.series[0].data = temp
        this.option.geo.map = 'china'
        this.echartsupdated()
      })
    },
    echartsupdated() {
      this.$nextTick(() => {
        let myChart = echarts.init(
          document.getElementById('devicedistribution')
        )
        myChart.setOption(this.option, true)

        myChart.on('click', params => {
          this.city(params.name)
        })
      })
    },
    echartsupdated2() {
      this.$nextTick(() => {
        let myChart = echarts.init(
          document.getElementById('devicedistribution')
        )
        myChart.off('click')
        myChart.setOption(this.option, true)
      })
    },
    city(p) {
      devicedistributionapi({ province: p }).then(x => {
        let temp = x.data.map(y => {
          return {
            name: y.city,
            value: y.specificCount,
            online: y.onlineCount
          }
        })
        this.option.geo.map = p
        this.option.series[0].data = temp
        this.echartsupdated2()
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