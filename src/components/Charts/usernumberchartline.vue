<template>
  <div>
    <chartsname chartsname="新增用户折线图" />

    <div class="chartsbgbox">
      <div class="block" style="padding-top:1vw">
        <span class="demonstration">时段选择</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        />
        <el-button
          @click="search"
          size="mini"
          style="margin-left:1vw;background-color:#15b9bb"
          type="primary"
          icon="el-icon-search"
        >搜索</el-button>
      </div>
      <div id="newuserline" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
import chartsname from '@/components/chartsname'
import request from '@/utils/request'

export default {
  components: {
    chartsname
  },
  data() {
    return {
      time: '',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'time'
        },
        yAxis: {
          minInterval: 1,
          name: '数量',
          type: 'value'
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320
            ],
            type: 'line'
          }
        ]
      }
    }
  },

  created() {
    this.up()
  },
  mounted() {},
  methods: {
    up(a = '', b = '') {
      request(
        '/statistical/customer/increaseNumber?beginTime=' + a + '&endTime=' + b
      ).then(x => {
        this.option.series[0].data = x.data.map(x => [
          x.increaseDate,
          x.increaseCount
        ])
        this.dateupdated()
      })
    },
    dateupdated() {
      this.$nextTick(() => {
        let myChart = echarts.init(document.getElementById('newuserline'))

        myChart.setOption(this.option)
      })
    },
    search() {
      console.log(this.time)
      this.up(this.time[0], this.time[1])
    }
  }
}
</script>
<style scoped>
#newuserline {
  width: 40vw;
  height: 30vw;
}

.chartsbgbox {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}
.timeselection {
  width: 100%;
  height: 20px;
  background-color: #111;
}
</style>
