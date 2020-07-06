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
import request from '@/utils/request'

export default {
  components: {
    chartsname
  },
  data() {
    return {
      count: 0,
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10
        },
        title: [
          {
            text: '',
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
            type: 'pie',
            radius: ['45%', '60%'],
            data: [
              { value: 90, name: '0-30分钟' },
              { value: 60, name: '30-60分钟' },
              { value: 114, name: '60-90分钟' },
              { value: 36, name: '90分钟以上' }
            ],
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
    }
  },
  created() {
    request('/statistical/customer/waterRatio').then(x => {
      let temp = x.data.map((y, index) => {
        let name
        this.count = this.count + y.counts
        if (index == 0) name = '90分钟以上'
        if (index == 1) name = '0-30分钟'
        if (index == 2) name = '30-60分钟'
        if (index == 3) name = '60-90分钟'
        return {
          name,
          value: y.counts
        }
      })
      this.option.title[0].text = this.count
      this.option.series[0].data = temp
      this.echartsupdated()
    })
  },
  mounted() {
    this.echartsupdated()
  },
  methods: {
    echartsupdated() {
      this.$nextTick(() => {
        let myChart = echarts.init(
          document.getElementById('deviceuseanalysis2')
        )

        myChart.setOption(this.option)
      })
    }
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
