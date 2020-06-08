<template>
  <el-table :fit="true" header-cell-class-name="xxx" size="mini" border :data="ydata">
    <el-table-column width="50" v-for="(a,b) in xdata" :key="a" :label="a">
      <template slot-scope="scope">{{scope.row[b]}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    xdata: {
      default: () => [
        '时间 ',
        '00.00',
        '01.00',
        '02.00',
        '03.00',
        '04.00',
        '05.00',
        '06.00',
        '07.00',
        '08.00',
        '09.00',
        '10.00',
        '11.00',
        '12.00',
        '13.00',
        '14.00',
        '15.00',
        '16.00',
        '17.00',
        '18.00',
        '19.00',
        '20.00',
        '21.00',
        '22.00',
        '23.00'
      ]
    },
    ydata: {
      default: () => [['次数'], ['日期']]
    }
  }
}
</script>
<style>
</style>