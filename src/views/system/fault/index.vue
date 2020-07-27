<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="auto">
      <el-form-item label="mac地址" prop="device">
        <el-input
          v-model="queryParams.device"
          placeholder="请输入mac地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备型号" prop="modelCode">
        <el-input
          v-model="queryParams.modelCode"
          placeholder="请输入设备型号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障名称" prop="faultName">
        <el-input
          v-model="queryParams.faultName"
          placeholder="请输入故障名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入城市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="当前状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择处理状态" clearable size="small">
          <el-option label="已处理" value="1" />
          <el-option label="未处理" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="漏损预警提示" prop="tip">
        <el-select v-model="queryParams.tip" placeholder="请选择处理状态" clearable size="small">
          <el-option label="已提示" value="1" />
          <el-option label="未提示" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="报警时间" prop="gmtCreate">
        <!-- <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.gmtCreate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="创建时间"
        ></el-date-picker>-->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="dateRange"
          style="width: 240px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </el-form-item>
      <!-- <el-form-item label="修改时间" prop="gmtModified">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.gmtModified"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="修改时间"
        ></el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:fault:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="faultList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />-->
      <el-table-column label="设备Mac地址" align="center" prop="device" />
      <el-table-column label="设备型号" align="center" prop="modelCode" />
      <el-table-column label="故障名称" align="center" prop="faultName" />

      <el-table-column label="故障描述" align="center" prop="faultDescription" />
      <el-table-column label="省份" align="center" prop="province" />
      <el-table-column label="城市" align="center" prop="city" />
      <el-table-column label="当前状态" align="center" prop="state">
        <template slot-scope="scope">
          <span>{{ scope.row.state== 1 ?'已处理':'未处理' }}</span>
        </template>
      </el-table-column>
      <el-table-column label=" 漏损预警提示" align="center" prop="tip">
        <template slot-scope="scope">
          <span>{{ scope.row.tip== 1 ?'已提醒':'未提醒' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报警时间" align="center" prop="gmtCreate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center" prop="gmtModified" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" icon="el-icon-search" size="mini">详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改告警信息对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户账号" prop="customer">
          <el-input v-model="form.customer" placeholder="请输入客户账号" />
        </el-form-item>
        <el-form-item label="设备Mac地址" prop="device">
          <el-input v-model="form.device" placeholder="请输入设备Mac地址" />
        </el-form-item>
        <el-form-item label="故障码" prop="faultcode">
          <el-input v-model="form.faultcode" placeholder="请输入故障码" />
        </el-form-item>
        <el-form-item label="故障是否处理；0代表未处理，1代表处理" prop="state">
          <el-input v-model="form.state" placeholder="请输入故障是否处理；0代表未处理，1代表处理" />
        </el-form-item>
        <el-form-item label="是否为漏损；0代表不是，1代表是" prop="flag">
          <el-input v-model="form.flag" placeholder="请输入是否为漏损；0代表不是，1代表是" />
        </el-form-item>
        <el-form-item label="同一漏损上报的次数" prop="times">
          <el-input v-model="form.times" placeholder="请输入同一漏损上报的次数" />
        </el-form-item>
        <el-form-item label="9分钟之内阀门开关状态有变化为1，否则为0" prop="mode">
          <el-input v-model="form.mode" placeholder="请输入9分钟之内阀门开关状态有变化为1，否则为0" />
        </el-form-item>
        <el-form-item label="设备漏损预警提示标志位，0表示为提醒，1表示已提醒" prop="tip">
          <el-input v-model="form.tip" placeholder="请输入设备漏损预警提示标志位，0表示为提醒，1表示已提醒" />
        </el-form-item>
        <el-form-item label="创建时间" prop="gmtCreate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtCreate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="创建时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间" prop="gmtModified">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtModified"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="修改时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import {
  listFault,
  getFault,
  delFault,
  addFault,
  updateFault,
  exportFault
} from '@/api/system/fault'

export default {
  name: 'Fault',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 告警信息表格数据
      faultList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        device: undefined,
        modelCode: undefined,
        faultName: undefined,
        province: undefined,
        city: undefined,
        state: undefined,
        tip: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      isadd: true,
      dateRange: []
    }
  },
  created() {
    this.getList()
  },

  methods: {
    /** 查询告警信息列表 */
    getList() {
      this.loading = true
      listFault(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.faultList = response.rows
          this.total = response.total
          this.loading = false
        }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        pageNum: 1,
        pageSize: 10,
        device: undefined,
        modelCode: undefined,
        faultName: undefined,
        province: undefined,
        city: undefined,
        state: undefined,
        tip: undefined
      }
      this.dateRange = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    detail(x) {
      const h = this.$createElement
      let time = this.secondToDate(
        (new Date(x.gmtModified).getTime() - new Date(x.gmtCreate).getTime()) /
          1000
      )
      this.$msgbox({
        title: '详细信息',
        message: h('div', null, [
         
          h('p', null, '告警持续时长：'+time),
          h('p', null, '保修时间: '),
          h('p', null, '保修时间: '),
          h('p', null, '保修时间: '),
          h('p', null, '保修时间: '),
          h('p', null, '保修时间: '),
          h('p', null, '保修时间: ')
        ]) // type: 'info'
      })
    },
    // /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset()
    //   this.open = true
    //   this.title = '添加告警信息'
    // },
    // /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset()
    //   const id = row.id || this.ids
    //   getFault(id).then(response => {
    //     this.form = response.data
    //     this.open = true
    //     this.title = '修改告警信息'
    //   })
    // },
    // /** 提交按钮 */
    // submitForm: function() {
    //   this.$refs['form'].validate(valid => {
    //     if (valid) {
    //       if (this.form.id != undefined) {
    //         updateFault(this.form).then(response => {
    //           if (response.code === 200) {
    //             this.msgSuccess('修改成功')
    //             this.open = false
    //             this.getList()
    //           } else {
    //             this.msgError(response.msg)
    //           }
    //         })
    //       } else {
    //         addFault(this.form).then(response => {
    //           if (response.code === 200) {
    //             this.msgSuccess('新增成功')
    //             this.open = false
    //             this.getList()
    //           } else {
    //             this.msgError(response.msg)
    //           }
    //         })
    //       }
    //     }
    //   })
    // },
    // /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids
    //   this.$confirm(
    //     '是否确认删除告警信息编号为"' + ids + '"的数据项?',
    //     '警告',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   )
    //     .then(function() {
    //       return delFault(ids)
    //     })
    //     .then(() => {
    //       this.getList()
    //       this.msgSuccess('删除成功')
    //     })
    //     .catch(function() {})
    // },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有告警信息数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportFault(queryParams)
        })
        .then(response => {
          this.download(response.msg)
        })
        .catch(function() {})
    }
  }
}
</script>