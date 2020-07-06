<template>
  <table style="table-layout:fixed">
    <tr v-for="(y,index) in ydata" :key="index+'A'">
      <td>{{y}}</td>
      <td v-for="(item,index) in xdata[index]" :key="index+'B'">{{item}}</td>
      <template v-if="xdata[index].length<xdata[0].length">
        <td v-for="(i,index) in xdata[0].length-xdata[index].length" :key="index+'C'"></td>
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
      default: () => ['A', 'B', 'C']
    }
  }
}
</script>
<style scoped>
table {
  font-size: 0.6vw;
  color: #686868;
  border-collapse: collapse;
}
td {
  padding: 0.3vw;
  border: solid 1px #c5c5c5;
}
</style>