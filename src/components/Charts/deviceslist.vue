<template>
  <div>
    <chartsname chartsname="设备统计" />
    <div class="chartsbgbox">
      <div style="padding:5vw 0">
        <el-form class="elinput" size="mini" :inline="true">
          <el-form-item label="设备型号">
            <el-input v-model="modelCode" placeholder="请输入产品型号">
              <!-- <el-option value label="ETF2300 PF12"></el-option>
              <el-option value label="ETF2300 PF18"></el-option>
              <el-option value label="ETF2300 PF16"></el-option>-->
            </el-input>
          </el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click="search">查询</el-button>
        </el-form>
      </div>

      <div class="userlistbottom">
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">{{ activeCount }}</span>
            <span style="font-size: 1vw;color: #15b9bb;">台</span>
          </div>
          <div>激活数量</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">{{ onlineCount }}</span>
            <span style="font-size: 1vw;color: #15b9bb;">台</span>
          </div>
          <div>今在线数量</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">{{ customerCounts }}</span>
            <span style="font-size: 1vw;color: #15b9bb;">人</span>
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
import { devicecount } from '@/api/deviceuseanalysis'

export default {
  components: {
    chartsname
  },
  data() {
    return {
      modelCode: '',
      activeCount: 0,
      customerCounts: 0,
      onlineCount: 0
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      devicecount().then(x => {
        this.activeCount = x.data.activeCount
        this.onlineCount = x.data.onlineCount
        this.customerCounts = x.data.customerCounts
      })
    },
    search() {
      const data = {
        modelCode: this.modelCode
      }
      devicecount(data).then(x => {
        this.activeCount = x.data.activeCount
        this.onlineCount = x.data.onlineCount
        this.customerCounts = x.data.customerCounts
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
