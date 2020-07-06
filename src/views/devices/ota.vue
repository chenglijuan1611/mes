<template>
  <div>
    <div style="height:1px;background-color: #c5c5c5;"></div>
    <!--  选择框    -->
    <div class="seqrch">
      <el-form class="elinput" size="mini" inline="true">
        <el-form-item label="产品型号">
          <el-select v-model="form.region" placeholder="请选择产品型号">
            <el-option label="型号" value="shanghai"></el-option>
            <el-option label="型号二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="mini" icon="el-icon-search" type="primary">查询</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-refresh"
          style="background-color:#3484fc"
        >更新</el-button>
      </el-form>
    </div>
    <!--  选择框    -->
    <div class="mainbox">
      <div class="leftsection" style>
        <el-input
          size="mini"
          style="width:200px;margin-top:40px"
          placeholder="请输入产品分类"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
        <el-tree
          class="mainleft"
          :data="data"
          default-expand-all
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="rightsection">
        <!-- 固件版本图 -->
        <div style="width:700px">
          <firmwareversion></firmwareversion>
        </div>
        <!-- 固件版本图 -->

        <!-- 设备ota 列表 -->
        <div>
          <chartsname chartsname="设备OTA列表" />
          <div class="otalist">
            <!-- button  -->
            <div style="width:30px">
              <!-- 占空 -->
            </div>
            <el-button type="primary" icon="el-icon-s-promotion">推送</el-button>
            <el-button type="warning" icon="el-icon-video-pause">暂停</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </div>
          <!-- 
              多选表单
          -->
          <div class="otalistform">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column label="序号" width="80">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column prop="type" label="设备类型" width="100"></el-table-column>
              <el-table-column prop="address" label="mac地址" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="name" label="设备名称" width="150"></el-table-column>
              <el-table-column prop="status" label="设备状态" width="80"></el-table-column>
              <el-table-column prop="updatestatus" label="升级状态" width="150"></el-table-column>
              <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-s-promotion"
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    style="color:#5397fc"
                  >推送</el-button>
                  <el-button
                    icon="el-icon-video-pause"
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    style="color:#f89616"
                  >暂停</el-button>
                  <el-button
                    icon="el-icon-delete"
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    style="color:#fe787a"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              pager-count="4"
              background
              class="elpagination"
              layout="prev, pager, next"
              :total="100"
            >sss</el-pagination>&nbsp; &nbsp;&nbsp;
            <span>共有80条信息，共有6页，当前第1页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firmwareversion from '@/components/Charts/firmwareversion'
import chartsname from '@/components/chartsname'
export default {
  components: {
    firmwareversion,
    chartsname
  },
  data() {
    return {
      form: {
        region: ''
      },
      data: [
        {
          label: '全线产品',
          children: [
            {
              label: '家用全系列',
              children: [
                {
                  label: '三级 1-1-1',
                  children: [
                    {
                      label: '家用全系列',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    },
                    {
                      label: '工商案例',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    },
                    {
                      label: '商用案例',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: '工商案例',
              children: [
                {
                  label: '三级 1-1-1',
                  children: [
                    {
                      label: '家用全系列',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    },
                    {
                      label: '工商案例',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    },
                    {
                      label: '商用案例',
                      children: [
                        {
                          label: '三级 1-1-1'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: '商用案例',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [
        {
          date: '1',
          type: 'ABCDEFG',
          address: '1231231231231231',
          name: 'EFLKSKSLFJFJ',
          status: '在线',
          updatestatus: '当前是最新版本'
        },
        {
          date: '2',
          type: 'ABCDEFG',
          address: '1231231231231231',
          name: '设备名称1',
          status: '离线',
          updatestatus: '当前是最新版本'
        },
        {
          date: '3',
          type: 'ABCDEFG',
          address: '1231231231231231',
          name: '设备名称1',
          status: '在线',
          updatestatus: '当前是最新版本'
        },
        {
          date: '4',
          type: 'ABCDEFG',
          address: '1231231231231231',
          name: '设备名称1',
          status: '在线',
          updatestatus: '当前是最新版本'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {}
}
</script>
<style  scoped>
.seqrch {
  height: 55px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.elinput {
  padding-left: 3vw;
  height: 20px;
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