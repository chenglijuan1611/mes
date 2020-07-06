<template>
  <div>
    <chartsname chartsname="用户分布图" />
    <div class="chartsbgbox">
      <div id="userdistribution" />
      <i style="opacity:0.5" class="el-icon-circle-plus-outline iconar"></i>
      <i style="opacity:0.5" class="el-icon-remove-outline iconar"></i>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
import chartsname from '@/components/chartsname'
import { userdistributionapi } from '@/api/userdistribution'

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
              temp = `${a.name} :${a.data.value ? a.data.value : ''}`
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
          pieces: [
            { min: 1000 }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 500, max: 999 },
            { min: 100, max: 499 },
            { min: 10, max: 99 },
            { min: 1, max: 9 },
            { value: 0 } // 表示 value 等于 123 的情况。
            // { max: 5 } // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          type: 'piecewise',
          left: '8%',
          inRange: {
            color: ['#f5f4f3', '#c36851']
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
    userdistributionapi().then(x => {
      let temp = x.data.map(y => {
        return {
          name: y.province,
          value: y.specificCount
        }
      })
      this.option.series[0].data = temp
      this.echartsupdated()
    })
  },
  mounted() {
    // this.echartsupdated()
  },
  methods: {
    echartsupdated() {
      this.$nextTick(() => {
        let myChart = echarts.init(document.getElementById('userdistribution'))
        myChart.setOption(this.option)
      })
    }
  }
}
</script>
<style scoped>
#userdistribution {
  width: 600px;
  height: 400px;
}
.chartsname {
  display: flex;
  padding-bottom: 10px;
  /* font-size: small; */
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