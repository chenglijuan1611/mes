<template>
  <div>
    <chartsname chartsname="用户统计" />
    <div class="chartsbgbox">
      <div class="peoplenumber">
        <span>0000</span>
        <span style="font-size: 1vw;">人</span>
      </div>
      <div style="padding-left: 3vw;">
        终端用户数量
      </div>
      <!-- 占空    -->
      <div style="height:3.5vw" />
      <!-- 占空    -->
      <!-- 用户列表下部 -->
      <div class="userlistbottom">
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">00</span>
            <span style="font-size: 1vw;color: #15b9bb;">人</span>
          </div>
          <div>今日新增人数</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">00</span>
            <span style="font-size: 1vw;color: #15b9bb;">人</span>
          </div>
          <div>今日活跃人数</div>
        </div>
        <div style="width:0.2vw;height:5vw;background-color: #ebeef6;" />
        <div style="padding:0 3vw">
          <div>
            <span style="font-size: 3vw;color: #15b9bb;">00</span>
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
import chartsname from "@/components/chartsname";

export default {
  components: {
    chartsname
  }
};
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
.userlistbottom{
  display: flex;
}
</style>