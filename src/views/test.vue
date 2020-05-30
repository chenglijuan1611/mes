<template>
  <div>
    <xytable :xdata="data1" :ydata="data2"></xytable>
  </div>
</template>

<script>
import xytable from '../components/Charts/xytable'
export default {
  components: {
    xytable
  }
}
</script>