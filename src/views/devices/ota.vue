<template>
  <div>
    <div style="height:1px;background-color: #c5c5c5;"></div>
    <!--  选择框    -->
    <div class="seqrch">
      <el-form class="elinput" :inline="true">
        <el-form-item label="选择设备型号">
          <treeselect
            style="width:200px"
            v-model="form.code"
            :options="deviceModelOptions"
            :normalizer="normalizer"
            placeholder="选择型号 全部型号"
          />
        </el-form-item>
        <el-button @click="b1" icon="el-icon-search" type="primary">查询</el-button>
        <!-- <el-button type="primary" icon="el-icon-refresh" style="background-color:#3484fc">更新</el-button> -->
      </el-form>
    </div>
    <!--  选择框    -->
    <div class="mainbox">
      <div class="rightsection">
        <!-- 固件版本图 -->
        <div style="width:82vw">
          <firmwareversion ref="child"></firmwareversion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { listDeviceModel } from '@/api/system/deviceModel'
import { handleTree } from '@/utils/dafeng'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import firmwareversion from '@/components/Charts/firmwareversion'
import chartsname from '@/components/chartsname'
import { firmVerDistribute } from '@/api/system/firmVerDistribute'

export default {
  components: {
    firmwareversion,
    chartsname,
    Treeselect
  },
  data() {
    return {
      form: {},
      deviceModelOptions: []
    }
  },
  created() {
    this.getTreeselect()
  },
  methods: {
    getTreeselect() {
      listDeviceModel().then(response => {
        this.deviceModelOptions = []
        const data = {
          deviceModelId: 0,
          modelCode: '',
          modelName: '全部',
          children: []
        }
        data.children = handleTree(response.data, 'deviceModelId', 'parentId')
        this.deviceModelOptions.push(data)
        console.log(1, this.deviceModelOptions)
      })
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }

      return {
        id: node.modelCode,
        label: node.modelName,
        children: node.children
      }
    },
    b1() {
      let p = { modelCode: this.form.code }
      firmVerDistribute(p).then(x => {
        let data = x.data.map(y => {
          let temp = {}
          temp.name = y.firmVersion
          temp.value = y.count
          return temp
        })
        this.$refs.child.option.series[0].data = data
        this.$refs.child.echartsupdata()
      })
    }
  }
}
</script>
<style  scoped>
.seqrch {
  height: 65px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.elinput {
  padding-left: 60px;
  height: 36px;
}

.leftsection {
  width: 275px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.mainleft {
  background-color: #f5f6fa;
  align-self: flex-start;
  padding-left: 38px;
  padding-top: 30px;
}
.mainbox {
  display: flex;
}
.rightsection {
  margin: 0 auto;
}
.otalist {
  width: 1000px;
  height: 90px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.pagination {
  background-color: #fff;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>