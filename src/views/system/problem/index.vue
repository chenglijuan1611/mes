<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="auto"
    >
      <el-form-item label="问题标题" prop="problemTitle">
        <el-input
          v-model="queryParams.problemTitle"
          placeholder="请输入问题标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="解决方案" prop="problemSolution">
        <el-input
          v-model="queryParams.problemSolution"
          placeholder="请输入解决方案"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="设备型号" prop="modelCode">
        <el-input
          v-model="queryParams.modelCode"
          placeholder="请输入设备型号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createUser">
        <el-input
          v-model="queryParams.createUser"
          placeholder="请输入创建人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="gmtCreatetime">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="time"
          type="daterange"
          style="width: 200px"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </el-form-item>
      <el-form-item label="修改人" prop="modifyUser">
        <el-input
          v-model="queryParams.modifyUser"
          placeholder="请输入修改人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="修改时间" prop="gmtModifytime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.gmtModifytime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择修改时间"
        ></el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:problem:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:problem:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:problem:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:problem:export']"
          >导出</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="problemList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="常见问题的id" align="center" prop="comproblemId" /> -->
      <el-table-column label="问题标题" align="center" prop="problemTitle" />
      <!-- <el-table-column label="解决方案" align="center" prop="problemSolution" /> -->
      <el-table-column label="设备型号" align="center" prop="modelCode" />
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="gmtCreatetime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改人" align="center" prop="modifyUser" />
      <el-table-column
        label="修改时间"
        align="center"
        prop="gmtModifytime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModifytime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:problem:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:problem:remove']"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="detail(scope.row)"
            v-hasPermi="['system:problem:remove']"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改常见问题对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="问题标题" prop="problemTitle">
          <el-input v-model="form.problemTitle" placeholder="请输入问题标题" />
        </el-form-item>
        <el-form-item label="设备型号" prop="modelCode">
          <template>
            <el-radio v-model="form.isAll" :label="0">适用于型号</el-radio>
            <el-radio v-model="form.isAll" :label="1">适用于所有</el-radio>
          </template>
          <el-input v-show="!form.isAll" v-model="form.modelCode" placeholder="请输入设备型号" />
        </el-form-item>
        <el-form-item label="解决方案" prop="problemSolution">
          <el-input
            type="textarea"
            autosize
            v-model="form.problemSolution"
            placeholder="请输入解决方案"
          />
        </el-form-item>

        <el-form-item v-if="!isadd" label="创建人" prop="createUser">
          <el-input
            disabled
            v-model="form.createUser"
            placeholder="请输入创建人"
          />
        </el-form-item>
        <el-form-item v-if="!isadd" label="创建时间" prop="gmtCreatetime">
          <el-date-picker
            disabled
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtCreatetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="修改人" prop="modifyUser">
          <el-input v-model="form.modifyUser" placeholder="请输入修改人" />
        </el-form-item>
        <el-form-item label="修改时间" prop="gmtModifytime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtModifytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择修改时间"
          ></el-date-picker>
        </el-form-item>-->
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
  listProblem,
  getProblem,
  delProblem,
  addProblem,
  updateProblem,
  exportProblem,
} from "@/api/system/problem";

export default {
  name: "Problem",
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
      // 常见问题表格数据
      problemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        problemTitle: undefined,
        problemSolution: undefined,
        modelCode: undefined,
        createUser: undefined,
        gmtCreatetime: undefined,
        modifyUser: undefined,
        gmtModifytime: undefined,
        beginTime: undefined,
        endTime: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        gmtCreatetime: [
          { required: true, message: "修改人不能为空", trigger: "blur" },
        ],
        gmtModifytime: [
          { required: true, message: "修改人不能为空", trigger: "blur" },
        ],
      },
      isadd: true,
      time: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询常见问题列表 */
    getList() {
      this.loading = true;
      listProblem(this.queryParams).then((response) => {
        this.problemList = response.rows;
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
        comproblemId: undefined,
        problemTitle: undefined,
        problemSolution: undefined,
        modelCode: undefined,
        createUser: undefined,
        gmtCreatetime: undefined,
        modifyUser: undefined,
        gmtModifytime: undefined,
        beginTime: undefined,
        endTime: undefined,
      };
      this.time = null;
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.time !== null) {
        this.queryParams.beginTime = this.time[0];
        this.queryParams.endTime = this.time[1];
      } else {
        this.queryParams.beginTime = undefined;
        this.queryParams.endTime = undefined;
      }
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.beginTime = undefined;
      this.queryParams.endTime = undefined;
      this.time = null;
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.comproblemId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.isadd = true;
      this.reset();
      this.open = true;
      this.title = "添加常见问题";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isadd = false;
      this.reset();
      const comproblemId = row.comproblemId || this.ids;
      getProblem(comproblemId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改常见问题";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.comproblemId != undefined) {
            updateProblem(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addProblem(this.form).then((response) => {
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
      const comproblemIds = row.comproblemId || this.ids;
      console.log(row);
      this.$confirm(
        '是否确认删除常见问题标题为"' + comproblemIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delProblem(comproblemIds);
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
      this.$confirm("是否确认导出所有常见问题数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportProblem(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    detail(a) {
      this.$alert(a.problemSolution || "未查询到", "解决方案", {
        confirmButtonText: "确定",
      });

      console.log(a);
    },
  },
};
</script>
