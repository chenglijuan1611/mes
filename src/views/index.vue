<template>
  <div class="dashboard-container">
    <div class="charts">
      <div class="dashboardchart">
        <usercount />
      </div>
      <div class="dashboardchart">
        <usernumberchartline />
      </div>
      <div class="dashboardchart">
        <userdistribution />
      </div>
      <div class="dashboardchart">
        <devicedistribution />
      </div>
      <div class="dashboardchart">
        <deviceslist />
      </div>
      <div class="dashboardchart">
        <deviceuseanalysis2 />
      </div>
      <div class="dashboardchartbig">
        <deviceuseanalysis1 />
      </div>

      <div class="dashboardchartbig">
        <deviceuseanalysis3 />
      </div>
    </div>
  </div>
</template>

<script>
import devicedistribution from '../components/Charts/devicedistribution'
import userdistribution from '../components/Charts/userdistribution'
import usercount from '../components/Charts/usercount'
import deviceslist from '../components/Charts/deviceslist'
import usernumberchartline from '../components/Charts/usernumberchartline'
import deviceuseanalysis1 from '../components/Charts/deviceuseanalysis/charts1'
import deviceuseanalysis2 from '../components/Charts/deviceuseanalysis/charts2'
import deviceuseanalysis3 from '../components/Charts/deviceuseanalysis/charts3'
import xytable from '../components/Charts/xytable'

export default {
  name: 'Dashboard',
  components: {
    devicedistribution,
    userdistribution,
    usercount,
    deviceslist,
    usernumberchartline,
    deviceuseanalysis1,
    deviceuseanalysis2,
    deviceuseanalysis3,
    xytable
  }
}
</script>

<style lang="scss" scoped>
.charts {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.dashboardchart {
  width: 41vw;
  padding-right: 1vw;
}
.dashboardchartbig {
  width: 81vw;
}

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
