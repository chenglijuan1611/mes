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
      <el-form-item label="设备型号" prop="modelCode">
        <el-input
          v-model="queryParams.modelCode"
          placeholder="请输入设备型号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维保用户" prop="maintenanceUser">
        <el-input
          v-model="queryParams.maintenanceUser"
          placeholder="请输入维保用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保修时间" prop="maintenanceTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.maintenanceTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择保修时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态" prop="dealStatus">
        <el-select v-model="queryParams.dealStatus" placeholder="请选择处理状态" clearable size="small">
          <el-option label="已处理" value="1" />
          <el-option label="未处理" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="处理时间" prop="dealTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.dealTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理人" prop="dealUser">
        <el-input
          v-model="queryParams.dealUser"
          placeholder="请输入处理人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:maintenance:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:maintenance:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:maintenance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:maintenance:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="maintenanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="mac地址" align="center" prop="mac" />
      <el-table-column label="设备型号" align="center" prop="modelCode" />
      <el-table-column label="维保用户" align="center" prop="maintenanceUser" />
      <el-table-column label="联系电话" align="center" prop="phone" />
      <el-table-column label="保修内容" align="center" prop="maintenanceContent" />
      <el-table-column label="保修时间" align="center" prop="maintenanceTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.maintenanceTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center" prop="dealStatus" />
      <el-table-column label="处理时间" align="center" prop="dealTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dealTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理人" align="center" prop="dealUser" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:maintenance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:maintenance:remove']"
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

    <!-- 添加或修改维保信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="mac地址" prop="mac">
          <el-input v-model="form.mac" placeholder="请输入mac地址" />
        </el-form-item>
        <el-form-item label="设备型号" prop="modelCode">
          <el-input v-model="form.modelCode" placeholder="请输入设备型号" />
        </el-form-item>
        <el-form-item label="维保用户" prop="maintenanceUser">
          <el-input v-model="form.maintenanceUser" placeholder="请输入维保用户" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="保修内容" prop="maintenanceContent">
          <el-input v-model="form.maintenanceContent" placeholder="请输入保修内容" />
        </el-form-item>
        <el-form-item label="保修时间" prop="maintenanceTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.maintenanceTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择保修时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-radio-group v-model="form.dealStatus">
            <el-radio label="1">已处理</el-radio>
            <el-radio label="0">未处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理时间" prop="dealTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.dealTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择处理时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理人" prop="dealUser">
          <el-input v-model="form.dealUser" placeholder="请输入处理人" />
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
import { listMaintenance, getMaintenance, delMaintenance, addMaintenance, updateMaintenance, exportMaintenance } from "@/api/system/maintenance";

export default {
  name: "Maintenance",
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
      // 维保信息表格数据
      maintenanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mac: undefined,
        modelCode: undefined,
        maintenanceUser: undefined,
        phone: undefined,
        maintenanceContent: undefined,
        maintenanceTime: undefined,
        dealStatus: undefined,
        dealTime: undefined,
        dealUser: undefined
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
    /** 查询维保信息列表 */
    getList() {
      this.loading = true;
      listMaintenance(this.queryParams).then(response => {
        this.maintenanceList = response.rows;
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
        id: undefined,
        mac: undefined,
        modelCode: undefined,
        maintenanceUser: undefined,
        phone: undefined,
        maintenanceContent: undefined,
        maintenanceTime: undefined,
        dealStatus: "0",
        dealTime: undefined,
        dealUser: undefined
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加维保信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMaintenance(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改维保信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateMaintenance(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addMaintenance(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除维保信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMaintenance(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有维保信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMaintenance(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>