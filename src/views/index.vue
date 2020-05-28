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
      <div class="dashboardchartbig">
        <deviceuseanalysis1 />
      </div>
      <div class="dashboardchartbig">
        <deviceuseanalysis2 />
      </div>
    </div>
  </div>
</template>

<script>
 
import devicedistribution from '../components/Charts/devicedistribution'
import userdistribution from '../components/Charts/userdistribution'
import usercount from '../components/Charts/usercount'
import usernumberchartline from '../components/Charts/usernumberchartline'
import deviceuseanalysis1 from '../components/Charts/deviceuseanalysis/charts1'
import deviceuseanalysis2 from '../components/Charts/deviceuseanalysis/charts2'
export default {
  name: 'Dashboard',
  components: {
    devicedistribution,
    userdistribution,
    usercount,
    usernumberchartline,
    deviceuseanalysis1,
    deviceuseanalysis2
  },
 
}
</script>

<style lang="scss" scoped>
.charts {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.dashboardchart {
  width: 40vw;
  padding: 10px;
}
.dashboardchartbig {
  width: 80vw;
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
