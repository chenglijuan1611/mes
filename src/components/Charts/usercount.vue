<template>
  <div>
    <chartsname chartsname="用户统计" />
    <div class="chartsbgbox">
      <div class="peoplenumber">
        <span>{{top}}</span>
        <span style="font-size: 1vw;">人</span>
      </div>
      <div style="padding-left: 3vw;">终端用户数量</div>
      <!-- 占空    -->
      <div style="height:3.5vw" />
      <!-- 占空    -->
      <!-- 用户列表下部 -->
      <div class="userlistbottom">
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">{{bnew1}}</span>
            <span style="font-size: 1vw;color: #15b9bb;">人</span>
          </div>
          <div>今日新增人数</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">{{b1}}</span>
            <span style="font-size: 1vw;color: #15b9bb;">人</span>
          </div>
          <div>今日活跃人数</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">{{b7}}</span>
            <span style="font-size: 1vw;color: #15b9bb;">人</span>
          </div>
          <div>过去七天活跃人数</div>
        </div>
      </div>
    </div>

    <div />
  </div>
</template>
 <script>
import chartsname from '@/components/chartsname'
import { userstatistics } from '@/api/deviceuseanalysis'
export default {
  components: {
    chartsname
  },
  data() {
    return {
      top: '0',
      bnew1: '0',
      b1: '0',
      b7: '0'
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      userstatistics().then(x => {
        this.bnew1 = x.data.visit_uv_new
        this.b1 = x.data.visit_uv
        this.b7 = x.data.sevenDaysActive,
        this.top=x.data.customerTotal
      })
    }
  }
}
</script>

<style scoped>
.chartsbgbox {
  height: 300px;
  background-color: #fff;
}

.peoplenumber {
  font-size: 3vw;
  padding-left: 3vw;
  padding-top: 3vw;
}
.userlistbottom {
  display: flex;
}
</style>