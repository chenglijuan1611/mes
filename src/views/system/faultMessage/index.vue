<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="mac地址" prop="mac">
        <el-input
          v-model="queryParams.mac"
          placeholder="请输入设备mac地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="告警编码" prop="faultCode">
        <el-input
          v-model="queryParams.faultCode"
          placeholder="请输入告警编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入处理状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="告警时间" prop="gmtCreatetime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.gmtCreatetime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择告警时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理时间" prop="gmtModifytime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.gmtModifytime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:faultMessage:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:faultMessage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:faultMessage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:faultMessage:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="faultMessageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="告警id" align="center" prop="faultMessageId" />
      <el-table-column label="设备mac地址" align="center" prop="mac" />
      <el-table-column label="告警编码" align="center" prop="faultCode" />
      <el-table-column label="处理状态" align="center" prop="state" />
      <el-table-column label="告警名称" align="center" prop="faultName" />
      <el-table-column label="设备型号" align="center" prop="deviceModel" />
      <el-table-column label="告警时间" align="center" prop="gmtCreatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center" prop="gmtModifytime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModifytime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:faultMessage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:faultMessage:remove']"
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

    <!-- 添加或修改告警详情信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备的mac地址" prop="mac">
          <el-input v-model="form.mac" placeholder="请输入设备的mac地址" />
        </el-form-item>
        <el-form-item label="告警编码" prop="faultCode">
          <el-input v-model="form.faultCode" placeholder="请输入告警编码" />
        </el-form-item>
        <el-form-item label="告警是否已处理" prop="state">
          <el-input v-model="form.state" placeholder="请输入告警是否已处理" />
        </el-form-item>
        <el-form-item label="创建时间" prop="gmtCreatetime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.gmtCreatetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间" prop="gmtModifytime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.gmtModifytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择修改时间">
          </el-date-picker>
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
import { listFaultMessage, getFaultMessage, delFaultMessage, addFaultMessage, updateFaultMessage, exportFaultMessage } from "@/api/system/faultMessage";

export default {
  name: "FaultMessage",
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
      // 告警详情信息表格数据
      faultMessageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mac: undefined,
        faultCode: undefined,
        state: undefined,
        gmtCreatetime: undefined,
        gmtModifytime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询告警详情信息列表 */
    getList() {
      this.loading = true;
      listFaultMessage(this.queryParams).then(response => {
        this.faultMessageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        faultMessageId: undefined,
        mac: undefined,
        faultCode: undefined,
        state: undefined,
        gmtCreatetime: undefined,
        gmtModifytime: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.faultMessageId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加告警详情信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const faultMessageId = row.faultMessageId || this.ids
      getFaultMessage(faultMessageId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改告警详情信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.faultMessageId != undefined) {
            updateFaultMessage(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addFaultMessage(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const faultMessageIds = row.faultMessageId || this.ids;
      this.$confirm('是否确认删除告警详情信息编号为"' + faultMessageIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFaultMessage(faultMessageIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有告警详情信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFaultMessage(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>