<template>
  <div style="margin-left:20px">
    <div class="chartbox">
      <div style="width:65%">
        <charts1 />
      </div>
      <div class="righttable">
        <div style="width:80%">
          <el-table height="250" :data="tableData">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="num" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="chartbox">
      <div style="width:65%">
        <charts2 />
      </div>
      <div class="righttable">
        <div style="width:80%">
          <el-table height="250" :data="tableData">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="num" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="chartbox">
      <div style="width:65%">
        <charts3 />
      </div>
      <div class="righttable">
        <div style="width:80%">
          <el-table height="250" :data="tableData">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="num" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import charts1 from '@/components/Charts/deviceuseanalysis/withouttable/charts1'
import charts2 from '@/components/Charts/deviceuseanalysis/charts2'
import charts3 from '@/components/Charts/deviceuseanalysis/withouttable/charts3'
export default {
  components: {
    charts1,
    charts2,
    charts3
  },
  data() {
    return {
      tableData: [
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        },
        {
          date: '0-100',
          num: '40',
          address: '20%'
        }
      ]
    }
  }
}
</script>
<style  scoped>
.chartbox {
  display: flex;
}
.righttable {
  width: 30%;
  height: 300px;
  margin-top: 40px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>