<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="auto">
      <el-form-item label="产品型号名称" prop="modelName">
        <el-input
          style="width: 240px"
          v-model="queryParams.modelName"
          placeholder="请输入产品型号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="产品型号英文编码" prop="modelEcode">
        <el-input
          style="width: 240px"
          v-model="queryParams.modelEcode"
          placeholder="请输入型号编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品型号编码" prop="modelCode">
        <el-input
          style="width: 240px"
          v-model="queryParams.modelCode"
          placeholder="请输入型号编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备描述" prop="describe">
        <el-input
          style="width: 240px"
          v-model="queryParams.describe"
          placeholder="请输入设备描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="耗材" prop="consumables">
        <el-input
          style="width: 240px"
          v-model="queryParams.consumables"
          placeholder="请输入耗材"
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
          style="width: 240px"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="gmtCreatetime">
        <el-date-picker
          clearable
          style="width: 240px"
          size="small"
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="修改人" prop="modifyUser">
        <el-input
          style="width: 240px"
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
          style="margin-left:100px"
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:deviceModel:add']"
        >新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="deviceModelList"
      row-key="deviceModelId"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="产品型号名称" align="center" prop="modelName" />
      <el-table-column label="设备图片" align="center" prop="picUrl">
        <template slot-scope="scope">
          <img style="width:80px" :src="imgurl(scope)" alt />
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属公司/经销商" align="center" prop="companyCode" /> -->
      <el-table-column label="产品型号英文编码" align="center" prop="modelEcode" />
      <el-table-column label="产品型号编码" align="center" prop="modelCode" />
      <el-table-column label="设备描述" align="center" prop="describe" />
      <el-table-column label="耗材" align="center" prop="consumables" />
      <el-table-column label="固件版本" align="center" prop="firmwareVersion" />
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="创建时间" align="center" prop="gmtCreatetime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改人" align="center" prop="modifyUser" />
      <el-table-column label="修改时间" align="center" prop="gmtModifytime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModifytime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="upimgclick(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >上传图片</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="upfwkclick(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >上传固件</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >修改</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:deviceModel:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改设备分类信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上级设备分类" prop="parentId">
          <treeselect
            v-model="form.parentId"
            :options="deviceModelOptions"
            :normalizer="normalizer"
            placeholder="请选择上级设备分类"
          />
        </el-form-item>
        <el-form-item label="产品型号名称" prop="modelName">
          <el-input v-model="form.modelName" placeholder="请输入产品型号" />
        </el-form-item>
        <el-form-item label="产品型号编码" prop="modelCode">
          <el-input :disabled="editcode" v-model="form.modelCode" placeholder="请输入型号编码" />
        </el-form-item>
        <el-form-item label="产品型号英文编码" prop="modelEcode">
          <el-input :disabled="editcode" v-model="form.modelEcode" placeholder="请输入英文型号编码" />
        </el-form-item>
        <el-form-item label="设备描述" prop="describe">
          <el-input v-model="form.describe" placeholder="请输入设备描述" />
        </el-form-item>
        <el-form-item label="耗材" prop="consumables">
          <el-input v-model="form.consumables" placeholder="请输入耗材" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- // 文件上传 -->
    <el-dialog
      :title="updata.title"
      :visible.sync="updata.dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-upload ref="up" drag :action="updata.url" :limit="limit" :http-request="upfunc">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="upok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listDeviceModel,
  getDeviceModel,
  delDeviceModel,
  addDeviceModel,
  updateDeviceModel,
  exportDeviceModel,
  upfile
} from '@/api/system/deviceModel'
import axios from 'axios'

import { handleTree } from '@/utils/dafeng'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'DeviceModel',
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      limit: 1,
      loading: true,
      // 设备分类信息表格数据
      deviceModelList: [],
      // 设备分类信息树选项
      deviceModelOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        parentId: undefined,
        ancestors: undefined,
        category: undefined,
        modelName: undefined,
        picUrl: undefined,
        companyCode: undefined,
        modelCode: undefined,
        describe: undefined,
        consumables: undefined,
        firmwareCategory: undefined,
        createUser: undefined,
        gmtCreatetime: undefined,
        modifyUser: undefined,
        gmtModifytime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      editcode: false,

      updata: {
        dialogVisible: false,
        url: '',
        title: '',
        name: '',
        modelEcode: '',
        modelCode: ''
      },
      dateRange: []
    }
  },

  created() {
    this.getList()
  },
  computed: {},
  methods: {
    /** 查询设备分类信息列表 */
    getList() {
      this.loading = true
      listDeviceModel(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.deviceModelList = handleTree(
            response.data,
            'deviceModelId',
            'parentId'
          )
          this.loading = false
        }
      )
    },
    /** 转换设备分类信息数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deviceModelId,
        label: node.modelName,
        children: node.children
      }
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listDeviceModel().then(response => {
        this.deviceModelOptions = []
        const data = {
          deviceModelId: 0,
          modelCode: '主类目',
          modelName: '主类目',
          modelEcode: '主类目',
          children: []
        }
        data.children = handleTree(response.data, 'deviceModelId', 'parentId')
        this.deviceModelOptions.push(data)
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 添加修改 的表单重置
    reset() {
      this.form = {
        deviceModelId: undefined,
        parentId: undefined,
        ancestors: undefined,
        category: undefined,
        modelName: undefined,
        picUrl: undefined,
        companyCode: undefined,
        modelCode: undefined,
        modelEcode: undefined,
        describe: undefined,
        consumables: undefined,
        firmwareCategory: undefined,
        createUser: undefined,
        gmtCreatetime: undefined,
        modifyUser: undefined,
        gmtModifytime: undefined
      }
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
    /** 新增按钮操作 */
    handleAdd() {
      this.editcode = false
      this.reset()
      this.getTreeselect()

      this.open = true
      this.title = '添加设备分类信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.editcode = true
      this.getTreeselect()
      if (row != undefined) {
        this.form.parentId = row.deviceModelId
      }
      getDeviceModel(row.deviceModelId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改设备分类信息'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        console.log(this.form)

        if (valid) {
          if (this.form.deviceModelId != undefined) {
            updateDeviceModel(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addDeviceModel(this.form).then(response => {
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
      this.$confirm(
        '是否确认删除设备分类名称为   ' + row.modelName + '  的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delDeviceModel(row.deviceModelId)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function() {
          x => console.log(x)
        })
    },
    //  图片地址
    imgurl(a) {
      return process.env.VUE_APP_BASE_API + a.row.picUrl
    },
    // // 上传图片操作
    upimgclick(x) {
      this.updata.url = '/system/deviceModel/uploadPicture'
      this.updata.dialogVisible = true
      this.updata.name = 'picture'
      this.updata.modelCode = x.modelCode
      this.updata.title = '上传设备图片   编码为' + this.updata.modelCode
    },

    // 上传固件操作
    upfwkclick(a) {
      this.updata.url = '/system/deviceModel/uploadFirmware2'
      this.updata.dialogVisible = true
      this.updata.name = 'firmwareFile'
      this.updata.modelCode = a.modelCode
      this.updata.title = '上传设备固件  编码为' + this.updata.modelCode
    },

    // 清理文件列表
    upok() {
      this.resetQuery()
      this.updata.dialogVisible = false
      this.$refs.up.clearFiles()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.up.clearFiles()
          this.resetQuery()
          done()
        })
        .catch(_ => {})
    },
    upfunc(x) {
      let formData = new FormData()
      formData.append(this.updata.name, x.file)
      formData.append('modelCode', this.updata.modelCode)

      upfile(this.updata.url, formData, z => {
        let p = (z.loaded / z.total) * 100
        x.onProgress({ percent: p })
      })
        .then(res => {
          x.onSuccess()
        })
        .catch(err => {
          x.onError()
          this.$alert(err, '上传出现错误', {
            confirmButtonText: '确定'
          })
        })
    }
  }
}
</script>