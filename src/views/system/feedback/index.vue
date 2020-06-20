<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="mac地址" prop="mac">
        <el-input
          v-model="queryParams.mac"
          placeholder="请输入mac地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈人" prop="feedbackUser">
        <el-input
          v-model="queryParams.feedbackUser"
          placeholder="请输入反馈人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈时间" prop="feedbackTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.feedbackTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择反馈时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态" prop="dealStatus">
        <el-select v-model="queryParams.dealStatus" placeholder="请选择处理状态" clearable size="small">
          <el-option label="已处理" value="1" />
          <el-option label="未处理" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="处理时间" prop="dealTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.dealTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="处理意见" prop="dealIdea">
        <el-input
          v-model="queryParams.dealIdea"
          placeholder="请输入处理意见"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈内容" prop="feedbackContent">
        <el-input
          v-model="queryParams.feedbackContent"
          placeholder="请输入反馈内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:feedback:export']"
        >导出</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5"> -->
      <!-- <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:feedback:add']"
      >新增</el-button>-->
      <!-- </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:feedback:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:feedback:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5"></el-col>
    </el-row>

    <el-table v-loading="loading" :data="feedbackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="mac地址" align="center" prop="mac" />
      <el-table-column label="反馈人" align="center" prop="feedbackUser" />
      <el-table-column label="反馈内容" align="center" prop="feedbackContent" />
      <el-table-column label="反馈时间" align="center" prop="feedbackTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.feedbackTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center" prop="dealStatus">
        <template slot-scope="scope">
          <span>{{ scope.row.dealStatus==='1'?'已处理':'未处理' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center" prop="dealTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dealTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理意见" align="center" prop="dealIdea" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:feedback:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:feedback:remove']"
          >删除</el-button>
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

    <!-- 添加或修改意见反馈对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="mac地址" prop="mac">
          <el-input disabled v-model="form.mac" placeholder="请输入mac地址" />
        </el-form-item>
        <el-form-item label="反馈人" prop="feedbackUser">
          <el-input disabled v-model="form.feedbackUser" placeholder="请输入反馈人" />
        </el-form-item>
        <el-form-item label="反馈内容" prop="feedbackContent">
          <el-input disabled v-model="form.feedbackContent" placeholder="请输入反馈内容" />
        </el-form-item>
        <!-- <el-form-item label="反馈时间" prop="feedbackTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.feedbackTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择反馈时间"
          ></el-date-picker>
        </el-form-item>-->
        <el-form-item label="处理状态">
          <el-radio-group v-model="form.dealStatus">
            <el-radio label="1">已处理</el-radio>
            <el-radio label="0">未处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="处理时间" prop="dealTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.dealTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择处理时间"
          ></el-date-picker>
        </el-form-item>-->
        <el-form-item label="处理意见" prop="dealIdea">
          <el-input v-model="form.dealIdea" placeholder="请输入处理意见" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listFeedback,
  getFeedback,
  delFeedback,
  addFeedback,
  updateFeedback,
  exportFeedback
} from '@/api/system/feedback'

export default {
  name: 'Feedback',
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
      // 意见反馈表格数据
      feedbackList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mac: undefined,
        feedbackUser: undefined,
        feedbackTime: undefined,
        dealStatus: undefined,
        dealTime: undefined,
        dealIdea: undefined,
        feedbackContent: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询意见反馈列表 */
    getList() {
      this.loading = true
      listFeedback(this.queryParams).then(response => {
        this.feedbackList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        mac: undefined,
        feedbackUser: undefined,
        feedbackTime: undefined,
        dealStatus: '0',
        dealTime: undefined,
        dealIdea: undefined,
        feedbackContent: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加意见反馈'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getFeedback(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改意见反馈'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateFeedback(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addFeedback(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除意见反馈编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delFeedback(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有意见反馈数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportFeedback(queryParams)
        })
        .then(response => {
          this.download(response.msg)
        })
        .catch(function() {})
    }
  }
}
</script>