<template>
  <el-table size="mini" border :data="ydata">
    <el-table-column v-for="(a,b) in xdata" :key="a" :label="a">
      <template slot-scope="scope">{{scope.row[b]}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    xdata: {
      default: [
        '时间 ',
        '00.00',
        '01.00',
        '02.00',
        '03.00',
        '04.00',
        '05.00',
        '00.00',
        '01.00',
        '02.00',
        '03.00',
        '04.00',
        '05.00',
        '00.00',
        '01.00',
        '02.00',
        '03.00',
        '04.00',
        '05.00',
        '00.00',
        '01.00',
        '02.00',
        '03.00',
        '04.00',
        '05.00'
      ]
    },
    ydata: {
      default: [['次数'], ['日期']]
    }
  }
}
</script>
<style scoped>
</style>