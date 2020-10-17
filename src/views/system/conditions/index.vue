<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="auto">
      <el-form-item label="设备分类id" prop="deviceModelId">
        <el-input
          v-model="queryParams.deviceModelId"
          placeholder="请输入设备分类id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备型号编码" prop="modelCode">
        <el-input
          v-model="queryParams.modelCode"
          placeholder="请输入设备型号编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="序列号起始位" prop="serialNumStart">
        <el-input
          v-model="queryParams.serialNumStart"
          placeholder="请输入序列号起始位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="序列号结束位" prop="serialNumEnd">
        <el-input
          v-model="queryParams.serialNumEnd"
          placeholder="请输入序列号结束位"
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
          v-hasPermi="['system:conditions:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:conditions:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:conditions:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:conditions:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="conditionsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="设备分类id" align="center" prop="deviceModelId" />
      <el-table-column label="设备型号编码" align="center" prop="modelCode" />
      <el-table-column label="序列号起始位" align="center" prop="serialNumStart">
        <template slot-scope="scope">{{scope.row.serialNumStart}}</template>
      </el-table-column>
      <el-table-column label="序列号结束位" align="center" prop="serialNumEnd">
        <template slot-scope="scope">{{scope.row.serialNumEnd}}</template>
      </el-table-column>
      <el-table-column label="省份" align="center" prop="province">
        <template slot-scope="scope">{{scope.row.province}}</template>
      </el-table-column>
      <el-table-column label="城市" align="center" prop="city">
        <template slot-scope="scope">{{scope.row.city}}</template>
      </el-table-column>
      <el-table-column label="分组类型" align="center" prop="flag">
        <template slot-scope="scope">{{scope.row.flag==1?"区域":scope.row.flag==2?"序列号":""}}</template>
      </el-table-column>
      <el-table-column label=" 范围" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.flag==2"
            @click="showdetail(scope.row)"
            size="mini"
            type="text"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:conditions:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:conditions:remove']"
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
    <!-- 
      查看 序列号范围
    -->
    <el-dialog v-loading="sloading" title="查看序列号分组范围" :visible.sync="seriashow">
      <div class="list">
        <span style="padding:10px" v-for="i in serialist" :key="i">{{i}}</span>
      </div>
    </el-dialog>

    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <!-- <el-form-item label="设备分类id" prop="deviceModelId">
          <el-input v-model="form.deviceModelId" placeholder="请输入设备分类id" />
        </el-form-item>-->
        <el-form-item label="设备型号编码" prop="modelCode">
          <el-input v-model="form.modelCode" placeholder="请输入设备型号编码" />
        </el-form-item>
        <el-form-item label="序列号起始位" prop="serialNumStart">
          <el-input v-model="form.serialNumStart" placeholder="请输入序列号起始位" />
        </el-form-item>
        <el-form-item label="序列号结束位" prop="serialNumEnd">
          <el-input v-model="form.serialNumEnd" placeholder="请输入序列号结束位" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="form.province" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市" />
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
  listConditions,
  getConditions,
  delConditions,
  addConditions,
  updateConditions,
  exportConditions,
} from "@/api/system/conditions";
import request from "@/utils/request";

export default {
  name: "Conditions",
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
      // 【请填写功能名称】表格数据
      conditionsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceModelId: undefined,
        modelCode: undefined,
        serialNumStart: undefined,
        serialNumEnd: undefined,
        province: undefined,
        city: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      seriashow: false,
      serialist: [],
      sloading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查看范围
    showdetail(x) {
      this.sloading = true;
      this.seriashow = true;
      if (x.flag == 2) {
        request
          .get("/system/conditions/findSerialNum", {
            params: {
              ...x,
            },
          })
          .then((x) => {
            this.serialist = x.data;
            this.sloading = false;
          })
          .catch((x) => (this.sloading = false));
      }
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listConditions(this.queryParams).then((response) => {
        this.conditionsList = response.rows;
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
        deviceModelId: undefined,
        modelCode: undefined,
        serialNumStart: undefined,
        serialNumEnd: undefined,
        province: undefined,
        city: undefined,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加分组";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getConditions(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分组";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateConditions(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addConditions(this.form).then((response) => {
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
      this.$confirm('是否确认删除分组编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delConditions(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有分组数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportConditions(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
  },
};
</script>

<style   scoped>
.list {
  display: flex;
  flex-wrap: wrap;
}
</style>