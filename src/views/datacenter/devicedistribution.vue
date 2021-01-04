<template>
  <div>
    <div>
      <div style="height:1px;background-color:#0003" />
      <div class="block">
        <span class="demonstration">设备型号</span>
        <el-cascader
          v-model="code"
          size="mini"
          :options="data"
          :show-all-levels="false"
          :props="{ checkStrictly: true,emitPath:false,expandTrigger:'hover',label:'modelName',value:'deviceModelId' }"
          clearable
        />
        <div style="width:20px" />
        <el-button icon="el-icon-search" size="mini" type="primary">查询</el-button>
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
  data() {
    return {
      code: '',
      data: []
    }
  },
  created() {
    listDeviceModel().then(response => {
      this.data = handleTree(response.data, 'deviceModelId', 'parentId')
    })
  }
}
</script>
<style scoped>
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
