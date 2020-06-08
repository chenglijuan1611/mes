<template>
  <table style="table-layout:fixed">
    <tr v-for="(y,index) in ydata">
      <td>{{y}}</td>
      <td v-for="item in xdata[index]">{{item}}</td>
      <template v-if="xdata[index].length<xdata[0].length">
        <td v-for="i in xdata[0].length-xdata[index].length"></td>
      </template>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    xdata: {
      default: () => [
        [
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
        ],
        [1, 2, 3, 4, 5],
        ['aa', 'ss']
      ]
    },
    ydata: {
      default: () => ['时间', '次数', '日期']
    }
  }
}
</script>
<style>
table {
  font-size: 12px;
  color: #686868;
  border-collapse: collapse;
}
td {
  padding: 5px;
  border: solid 1px #c5c5c5;
}
</style>