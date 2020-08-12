<template>
  <div>
    <div>
      <div style="height:1px;background-color:#0003"></div>
      <div class="block">
        <span class="demonstration">设备型号</span>
        <el-cascader
          size="mini"
          v-model="code"
          :options="data"
          :show-all-levels="false"
          :props="{ checkStrictly: true,emitPath:false,expandTrigger:'hover',label:'modelName',value:'deviceModelId' }"
          clearable
        ></el-cascader>
        <div style="width:20px"></div>
        <el-button size="mini"   icon="el-icon-search" type="primary">查询</el-button>
      </div>
    </div>
    <devicedistribution />
  </div>
</template>
<script>
import devicedistribution from '@/components/Charts/devicedistribution'
import { listDeviceModel } from '@/api/system/deviceModel'
import { handleTree } from '@/utils/dafeng'
export default {
  components: {
    devicedistribution
  },
  created() {
    listDeviceModel().then(response => {
      this.data = handleTree(response.data, 'deviceModelId', 'parentId')
    })
  },
  data() {
    return {
      code: '',
      data: []
    }
  }
}
</script>
<style   scoped>
.demonstration {
  font-weight: 700;
  margin: 0 10px;
}
.block {
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
</style>