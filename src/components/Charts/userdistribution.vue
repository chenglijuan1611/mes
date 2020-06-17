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

export default {
  components: {
    chartsname
  },
  mounted() {
    this.$nextTick(() => {
      var myChart = echarts.init(document.getElementById('userdistribution'))
      var mapdata = [
        { name: '北京', value: 177 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 66 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 109 },
        { name: '福建', value: 116 },
        { name: '江西', value: 91 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 125 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 56 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 67 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 }
      ]
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          formatter: function(a) {
            return `${a.data.name} :${a.data.value}`
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
            color: ['#f5f4f3', '#c36851']
          }
        },
        series: [
          {
            name: '数据',
            type: 'map',
            geoIndex: 0,
            data: mapdata
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    })
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