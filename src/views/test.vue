<template>
  <div>
    <div class="chartsbgbox">
      <xytable></xytable>
    </div>
  </div>
</template>
<script>
import xytable from '@/components/Charts/xytabletest'

export default {
  components: {
    xytable
  }
}
</script>
<style scoped>
#deviceuseanalysis1 {
  width: 100%;
  height: 60%;
}
.chartsbgbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  height: 500px;
  align-items: flex-start;
}
</style>
