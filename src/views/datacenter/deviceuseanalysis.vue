<template>
  <div style="margin-left: 20px">
    <div class="chartbox">
      <div style="width: 95%">
        <charts3 />
      </div>
    </div>
    <div class="chartbox">
      <div style="width: 95%">
        <charts2 />
      </div>
    </div>
    <div class="chartbox">
      <div style="width: 95%">
        <charts1 />
      </div>
    </div>
  </div>
</template>
<script>
import charts1 from '@/components/Charts/deviceuseanalysis/withouttable/charts1'
import charts2 from '@/components/Charts/deviceuseanalysis/withouttable/charts2'
import charts3 from '@/components/Charts/deviceuseanalysis/withouttable/charts3'

export default {
  components: {
    charts1,
    charts2,
    charts3
  }
}
</script>
<style scoped>
.chartbox {
  display: flex;
}
</style>
