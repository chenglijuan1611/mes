<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      v-for="(item) in tablename"
      :key="item.key"
      :prop="item.key"
      :label="item.name"
    ></el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tablename: [
        { name: '日期', key: 'date' },
        { name: '姓名', key: 'name' },
        { name: '地址', key: 'address' }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '李小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '张小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>