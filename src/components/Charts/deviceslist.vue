<template>
  <div>
    <chartsname chartsname="设备列表" />
    <div class="chartsbgbox">
      <div style="padding:2vw 0">
        <el-form class="elinput" size="mini" :inline="true">
          <el-form-item label="设备型号">
            <el-select v-model="form.region" placeholder="请选择产品型号">
              <el-option value label="ETF2300 PF12"></el-option>
              <el-option value label="ETF2300 PF18"></el-option>
              <el-option value label="ETF2300 PF16"></el-option>
            </el-select>
          </el-form-item>
          <el-button size="mini" icon="el-icon-search" type="primary">查询</el-button>
        </el-form>
      </div>
      <div class="peoplenumber">
        <span>0000</span>
        <span style="font-size: 1vw;">台</span>
      </div>
      <div style="padding-left: 3vw;">设备总数</div>
      <!-- 占空    -->
      <div style="height:1.5vw" />
      <!-- 占空    -->
      <!-- 用户列表下部 -->
      <div class="userlistbottom">
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">00</span>
            <span style="font-size: 1vw;color: #15b9bb;">台</span>
          </div>
          <div>激活数量</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">00</span>
            <span style="font-size: 1vw;color: #15b9bb;">台</span>
          </div>
          <div>今在线数量</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">00</span>
            <span style="font-size: 1vw;color: #15b9bb;">台</span>
          </div>
          <div>用户数量</div>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>
 <script>
import chartsname from '@/components/chartsname'

export default {
  components: {
    chartsname
  },
  data() {
    return {
      form: {
        region: ''
      }
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
  padding-top: 1vw;
}
.userlistbottom {
  display: flex;
}

.seqrch {
  height: 55px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.elinput {
  padding-left: 3vw;
  height: 20px;
}
</style>