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
      <el-table-column label="crc16" align="center" prop="crc16" />
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
      <el-table-column label="上传" align="center">
        <template slot-scope="scope">
          <el-button
            style="margin-left:10px"
            size="mini"
            type="text"
            @click="upimgclick(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >上传图片</el-button>
          <el-button
            size="mini"
            type="text"
            @click="upfont(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >上传字库</el-button>
          <el-button
            size="mini"
            type="text"
            @click="upfwkclick(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >上传固件</el-button>

          <el-button
            size="mini"
            type="text"
            @click="showversionmanage(scope.row)"
            v-hasPermi="['system:deviceModel:edit']"
          >版本管理</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
          <el-button size="mini" type="text" @click="FirmVerDesc(scope.row)">版本描述</el-button>
          <el-button size="mini" type="text" @click="doclass(scope.row)">分组管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 版本管理 -->
    <el-dialog title="版本管理" :visible.sync="versionmanageshow">
      <el-table :data="versionmanagelist" border stripe>
        <el-table-column align="center" prop="modelCode" label="modelCode"></el-table-column>
        <el-table-column align="center" prop="version" label="version"></el-table-column>
        <el-table-column align="center" label="版本状态">
          <template slot-scope="scope">
            <span v-show="scope.row.flag==1" style="color:green">正常</span>
            <span v-show="scope.row.flag==0" style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分组信息">
          <template slot-scope="scope">
            <el-button type="text" style="color:green" @click="showclassmsg(scope.row)">查看分组</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="版本描述">
          <template slot-scope="scope">
            <el-button type="text" size="default" @click="showversiondes(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.flag==0"
              type="text"
              size="default"
              @click="versiontono(scope.row)"
            >禁用此版本</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加或修改设备分类信息
    对话框-->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
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

    <!-- 固件上传 -->
    <el-dialog :title="updata.title" :before-close="handleClose" :visible.sync="versionup">
      <el-form label-width="auto">
        <el-form-item label="固件的版本号">
          <el-input v-model="versiondata.txt" placeholder="请输入版本号" clearable style="width: 240px" />
        </el-form-item>
        <el-form-item label="固件的版本描述">
          <div v-for="(item ,index) in versiondata.msg.length+1" :key="item+index">
            <el-input
              @input="xxx"
              v-model="versiondata.msg[index]"
              :placeholder="'请输入版本描述  '+(index+1)"
              clearable
              style="width: 240px;margin:5px"
            />
          </div>
        </el-form-item>
        <el-form-item label="选择适用范围">
          <el-radio-group v-model="isApplytoAll" size="small">
            <el-radio label="1">适用于全部</el-radio>
            <el-radio label="0">适用于选择分组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="isApplytoAll==0" label="分组信息">
          <template>
            <el-checkbox-group v-model="fireversionConditionIds1">
              <el-checkbox
                v-show="i.province && i.province!='' && i.city && i.city!=''? true:false"
                v-for="i in hadclass"
                :key="i.id + 'province'"
                :label="i.id"
              >{{i.province}} -- {{i.city}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="fireversionConditionIds2">
              <el-checkbox
                v-show="i.serialNumStart && i.serialNumStart!='' && i.serialNumEnd && i.serialNumEnd!=''? true:false"
                v-for="i in hadclass"
                :key="i.id + 'serial'"
                :label="i.id"
              >{{i.serialNumStart}} -- {{i.serialNumEnd}}</el-checkbox>
            </el-checkbox-group>
            <!-- <div v-for="i in hadclass" :key="i.id + 'province'">
              <div
                v-show="i.province && i.province!='' && i.city && i.city!=''? true:false"
              >{{i.province}} -- {{i.city}}</div>
            </div>-->
            <!-- <div v-for="i in hadclass" :key="i.id + 'serialNumStart'">
              <div
                v-show="i.serialNumStart && i.serialNumStart!='' && i.serialNumEnd && i.serialNumEnd!=''? true:false"
              >{{i.serialNumStart}} -- {{i.serialNumEnd}}</div>
            </div>-->
          </template>
        </el-form-item>
      </el-form>

      <el-upload :limit="1" ref="versionupload" action :auto-upload="false" :http-request="upfunc2">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="versionuploadstart"
        >上传到服务器</el-button>
      </el-upload>
    </el-dialog>
    <!-- 版本描述 -->
    <el-dialog title="固件版本描述" :before-close="handleClose" :visible.sync="Firmshow">
      <el-form size="mini" label-width="auto">
        <el-form-item
          style="width:70%"
          v-for="(item ,index) in FirmVerDesclist "
          :key="index"
          :label="index+1+''"
        >
          <el-input style="margin-bottom:10px" type="textarea" v-model="item.description"></el-input>

          <el-button type="success" @click="savedesc(item,index)">保存</el-button>
          <el-button type="danger" @click="deldesc(item,index)">删除</el-button>
        </el-form-item>
      </el-form>

      <!-- <div v-for="(item ,index) in FirmVerDesclist" :key="item+index">
        {{index}}
        <el-input
          v-model="item.description"
          :placeholder="'请输入版本描述  '+(index+1)"
          clearable
          type="textarea"
          style="width: 240px;margin:5px"
        />
      </div>-->
    </el-dialog>
    <!-- /  分类管理 -->

    <el-dialog width="600" title="分组管理" :visible.sync="doclassshow">
      <el-form label-width="auto">
        <el-form-item label="选择">
          <el-button :disabled="secflag" type="info" @click="changesecflag(true)" size="small">选择区域</el-button>
          <el-button
            :disabled="!secflag"
            type="info"
            @click="changesecflag(false)"
            size="small"
          >选择序列号</el-button>
        </el-form-item>
        <el-form-item v-if="secflag" label="选择区域">
          <el-cascader style="width:330px" clearable filterable :options="options" v-model="city"></el-cascader>
        </el-form-item>
        <el-form-item v-if="!secflag" label=" 序列号 ">
          <el-row>
            <el-col :span="6" :offset="0">
              <el-input v-model="serialNumStart " placeholder="序列号起始位置" clearable></el-input>
            </el-col>

            <el-col style="display:flex;justify-content:center" :span="1" :offset="0">
              <span>—</span>
            </el-col>

            <el-col :span="6" :offset="0">
              <el-input v-model="serialNumEnd " placeholder="序列号起始位置" clearable></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="当前选择">
          <span v-show="cityshow=='' && serialshow==''">未选择</span>
          <span v-if="secflag">{{ cityshow}}</span>
          <span v-if="!secflag">{{serialshow}}</span>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="doclasssave" size="small">保存此分组</el-button>
        </el-form-item>
        <el-form-item label="分组信息">
          <template>
            <div v-for="i in hadclass" :key="i.id">
              <div
                v-show="i.province && i.province!='' && i.city && i.city!=''? true:false"
              >{{i.province}} -- {{i.city}}</div>
              <div
                v-show="i.serialNumStart && i.serialNumStart!='' && i.serialNumEnd && i.serialNumEnd!=''? true:false"
              >{{i.serialNumStart}} -- {{i.serialNumEnd}}</div>
            </div>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增分类 -->
    <el-dialog title="新增分类" :visible.sync="addclassshow">
      <el-form label-width="auto">
        <el-form-item label="选择适用范围">
          <el-radio-group v-model="isApplytoAll" size="small">
            <el-radio label="1">适用于全部</el-radio>
            <el-radio label="0">适用于选择分组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="isApplytoAll==0" label="分组信息">
          <template>
            <el-checkbox-group v-model="fireversionConditionIds1">
              <el-checkbox
                v-show="i.province && i.province!='' && i.city && i.city!=''? true:false"
                v-for="i in hadclass"
                :key="i.id + 'city'"
                :label="i.id"
              >{{i.province}} -- {{i.city}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="fireversionConditionIds2">
              <el-checkbox
                v-show="i.serialNumStart && i.serialNumStart!='' && i.serialNumEnd && i.serialNumEnd!=''? true:false"
                v-for="i in hadclass"
                :key="i.id + 'serial'"
                :label="i.id"
              >{{i.serialNumStart}} -- {{i.serialNumEnd}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="操作">
          <el-button
            v-loading="addclassbutton"
            :disabled="addclassbutton"
            @click="versionaddclasssave"
          >保存</el-button>
        </el-form-item>
      </el-form>
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
  upfile,
} from "@/api/system/deviceModel";
import request from "@/utils/request";
import { citydata, CodeToText } from "@/utils/city/city";

import { handleTree } from "@/utils/dafeng";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "DeviceModel",
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
      title: "",
      Firmshow: false,
      FirmVerDesclist: [{ description: "" }],
      no: "",
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
        gmtModifytime: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      editcode: false,

      updata: {
        dialogVisible: false,
        url: "",
        title: "",
        name: "",
        modelEcode: "",
        modelCode: "",
      },
      dateRange: [],
      versionup: false,
      versiondata: {
        text: "",
        msg: [],
      },

      //   分类管理
      doclassshow: false,
      options: citydata,
      city: [],
      serialNumStart: "",
      serialNumEnd: "",
      secflag: true,
      doclasstemp: null,
      hadclass: "",
      isApplytoAll: null,
      fireversionConditionIds1: [],
      fireversionConditionIds2: [],

      // 版本管理
      versionmanageshow: false,
      versionmanagelist: [],
      // 新增分类
      addclassshow: false,
      addclasslist: [],
      addclasstemp: {},
      isaddfromno: false,
      addclassbutton: false,
    };
  },
  computed: {
    cityshow() {
      if (this.city.length < 2) {
        return "";
      }
      return (
        CodeToText[this.city[0]] + " - - " + CodeToText[this.city[1]] + " "
      );
    },
    serialshow() {
      if (this.serialNumStart != "" && this.serialNumEnd != "") {
        return " " + this.serialNumStart + " - - " + this.serialNumEnd;
      }
      return "";
    },
  },
  created() {
    this.getList();
  },

  methods: {
    savedesc(x) {
      console.log(x);
      request
        .post(
          "/system/deviceModel/editFirmVerDesc",
          {},
          {
            params: { id: x.id, description: x.description },
          }
        )
        .then((Z) => {
          this.msgSuccess(Z.msg);
        });
    },
    deldesc(x, y) {
      console.log(x);
      request
        .post(
          "/system/deviceModel/delFirmVerDesc",
          {},
          {
            params: { id: x.id },
          }
        )
        .then(this.FirmVerDesclist.splice(y, 1));
    },
    /** 查询设备分类信息列表 */
    getList() {
      this.loading = true;
      listDeviceModel(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.deviceModelList = handleTree(
            response.data,
            "deviceModelId",
            "parentId"
          );
          this.loading = false;
        }
      );
    },
    FirmVerDesc(x) {
      request
        .post(
          "/system/deviceModel/lookFirmVerDesc",
          {},
          {
            params: {
              version: x.firmwareVersion,
              modelCode: x.modelCode,
            },
          }
        )
        .then((x) => {
          if (x.data.length === 0) {
            this.msgError("当前没有版本描述");
            return;
          }
          this.Firmshow = true;
          this.FirmVerDesclist = x.data;
          console.log(x.data);
        });
    },
    /** 转换设备分类信息数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deviceModelId,
        label: node.modelName,
        children: node.children,
      };
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listDeviceModel().then((response) => {
        this.deviceModelOptions = [];
        const data = {
          deviceModelId: 0,
          modelCode: "主类目",
          modelName: "主类目",
          modelEcode: "主类目",
          children: [],
        };
        data.children = handleTree(response.data, "deviceModelId", "parentId");
        this.deviceModelOptions.push(data);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
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
        gmtModifytime: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.editcode = false;
      this.reset();
      this.getTreeselect();

      this.open = true;
      this.title = "添加设备分类信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.editcode = true;
      this.getTreeselect();
      if (row != undefined) {
        this.form.parentId = row.deviceModelId;
      }
      getDeviceModel(row.deviceModelId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改设备分类信息";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        console.log(this.form);

        if (valid) {
          if (this.form.deviceModelId != undefined) {
            updateDeviceModel(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addDeviceModel(this.form).then((response) => {
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
      this.$confirm(
        "是否确认删除设备分类名称为   " + row.modelName + "  的数据项?",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delDeviceModel(row.deviceModelId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
          (x) => console.log(x);
        });
    },
    //  图片地址
    imgurl(a) {
      return process.env.VUE_APP_BASE_API + a.row.picUrl;
    },
    // // 上传图片操作
    upimgclick(x) {
      this.upclear();
      this.updata.url = "/system/deviceModel/uploadPicture";
      this.updata.dialogVisible = true;
      this.updata.name = "picture";
      this.updata.modelCode = x.modelCode;
      this.updata.title = "上传设备图片   编码为" + this.updata.modelCode;
    },

    // 上传固件操作
    upfwkclick(a) {
      this.doclasstemp = {};
      this.doclasstemp = a;
      this.isApplytoAll = null;
      this.fireversionConditionIds1 = [];
      this.fireversionConditionIds2 = [];
      this.versionup = true;
      this.upclear();
      this.hadclass = [];
      this.getclassdata();
      this.updata.url = "/system/deviceModel/uploadFirmware2";
      this.updata.name = "firmwareFile";
      this.updata.modelCode = a.modelCode;
      this.updata.title = "上传设备固件  编码为" + this.updata.modelCode;
      this.versiondata = {
        text: "",
        msg: [],
      };
    },
    // 上传字库
    upfont(a) {
      this.upclear();
      this.updata.url = "/system/deviceModel/uploadFile";
      this.updata.dialogVisible = true;
      this.updata.name = "file";
      this.updata.modelCode = a.modelCode;
      this.updata.title = "上传字库  编码为" + this.updata.modelCode;
    },
    upclear() {
      this.updata.url = "";
      this.updata.dialogVisible = false;
      this.updata.name = "";
      this.updata.modelCode = "";
      this.updata.title = "";
    },
    // 清理文件列表
    upok() {
      this.resetQuery();
      this.updata.dialogVisible = false;
      this.$refs.up.clearFiles();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.hadclass = [];
          this.doclasstemp = {};
          this.isApplytoAll = null;
          this.fireversionConditionIds1 = [];
          this.fireversionConditionIds2 = [];
          try {
            this.$refs.up.clearFiles();
          } catch (error) {}
          try {
            this.$refs.versionupload.clearFiles();
          } catch (error) {}

          this.resetQuery();
          done();
        })
        .catch((x) => {
          console.log(x);
        });
    },
    upfunc(x) {
      let formData = new FormData();
      formData.append(this.updata.name, x.file);
      formData.append("modelCode", this.updata.modelCode);

      upfile(this.updata.url, formData, (z) => {
        let p = (z.loaded / z.total) * 100;
        x.onProgress({ percent: p });
      })
        .then((res) => {
          x.onSuccess();
        })
        .catch((err) => {
          x.onError();
          this.$alert(err, "上传出现错误", {
            confirmButtonText: "确定",
          });
        });
    },
    //点击版本 上传
    versionuploadstart() {
      this.$refs.versionupload.submit();
    },

    // 去除空白
    xxx() {
      this.versiondata.msg = this.versiondata.msg.filter((x) => {
        if (x != "") return x;
      });
    },
    upfunc2(x) {
      if (!/v\d\.\d\.\d/.test(this.versiondata.txt)) {
        this.msgError("不合法的版本号");
        return;
      }
      if (this.versiondata.msg.length == 0) {
        this.msgError("未录入 固件版本描述");
        return;
      }
      if (this.isApplytoAll == null) {
        this.msgError("未选择适用范围");
        return;
      }

      let formData = new FormData();
      formData.append(this.updata.name, x.file);
      formData.append("modelCode", this.updata.modelCode);
      formData.append("vsionDescrip", this.versiondata.msg);
      formData.append("firmVsion", this.versiondata.txt);
      formData.append("isApplytoAll", this.isApplytoAll);

      if (this.isApplytoAll == 0) {
        if (
          this.fireversionConditionIds1.length == 0 ||
          this.fireversionConditionIds2.length == 0
        ) {
          this.msgError("需同时录入 区域和 序列号 的分组信息");
          return;
        }
        formData.append("fireversionConditionIds", [
          ...this.fireversionConditionIds1,
          ...this.fireversionConditionIds2,
        ]);
      }
      upfile(this.updata.url, formData, (z) => {
        let p = (z.loaded / z.total) * 100;
        x.onProgress({ percent: p });
      })
        .then((res) => {
          x.onSuccess();
          console.log(res);
          this.msgSuccess(res.msg);
          this.$refs.versionupload.clearFiles();

          this.versiondata = {
            text: "",
            msg: [],
          };
          this.versionup = false;
        })
        .catch((err) => {
          this.$refs.versionupload.clearFiles();
          this.msgError("上传出现错误 :" + err);
        });
    },
    //  分类管理
    doclass(x) {
      this.doclasstemp = {};
      this.doclasstemp = x;

      this.city = [];
      this.serialNumStart = "";
      this.serialNumEnd = "";
      this.doclassshow = true;
      this.secflag = true;
      this.hadclass = [];
      this.getclassdata();
    },
    changesecflag(x) {
      if (x) {
        this.serialNumStart = "";
        this.serialNumEnd = "";
      } else {
        this.city = [];
      }
      this.secflag = x;
    },

    getclassdata() {
      request
        .get("/system/conditions/list?modelCode=" + this.doclasstemp.modelCode)
        .then((x) => {
          this.hadclass = x.rows;
        });
    },
    //  处理省名称
    donamemap() {
      console.log(" 市： " + CodeToText[this.city[0]]);
      let s = CodeToText[this.city[0]];
      if (s == undefined) return null;
      if (s.slice(-1) == "省") return s.slice(0, -1);
      switch (s) {
        case "广西壮族自治区":
          return "广西";
        case "内蒙古自治区":
          return "内蒙古";
        case "西藏自治区":
          return "西藏";

        case "宁夏回族自治区":
          return "宁夏";
        case "新疆维吾尔自治区":
          return "新疆";
        case "香港特别行政区":
          return "香港";
        case "澳门特别行政区":
          return "澳门";
        default:
          return s;
      }
    },
    //  保存分类
    doclasssave() {
      if (
        (parseInt(this.serialNumStart) && parseInt(this.serialNumEnd)) ||
        (CodeToText[this.city[0]] && CodeToText[this.city[1]])
      ) {
        if (CodeToText[this.city[0]] == "") {
          if (
            this.serialNumStart.length != 13 ||
            this.serialNumEnd.length != 13
          ) {
            this.msgError("序列号 应为13位数字");
            return;
          }
        }
        if (CodeToText[this.city[0]] == "") {
          if (
            this.serialNumStart.slice(0, 3) != this.serialNumEnd.slice(0, 3)
          ) {
            this.msgError("序列号 非同组序列号");
          }
        }

        request
          .post("/system/conditions", {
            deviceModelId: this.doclasstemp.deviceModelId,
            modelCode: this.doclasstemp.modelCode,
            serialNumStart: this.serialNumStart,
            serialNumEnd: this.serialNumEnd,
            province: this.donamemap(CodeToText[this.city[0]]),
            city: CodeToText[this.city[1]],
            flag: this.secflag ? "1" : "2",
          })
          .then((x) => {
            this.getclassdata();
            this.msgSuccess("保存成功");
          });
      } else {
        this.msgError("录入信息不完整");
      }
    },

    // 版本管理
    showversionmanage(x) {
      this.versionmanageshow = true;
      request
        .post(
          "/system/deviceModel/lookHistoryFirmversion?modelCode=" + x.modelCode
        )
        .then((z) => {
          this.versionmanagelist = z.data;
        });
    },
    // 查看 历史 版本描述
    showversiondes(x) {
      request
        .post(
          "/system/deviceModel/lookFirmVerDesc",
          {},
          {
            params: {
              ...x,
            },
          }
        )
        .then((y) => {
          if (y.data.length < 1) {
            this.msgError("没有版本描述");
            return;
          }
          let html = "";
          for (let i of y.data) {
            html = html + "<p>" + i.description + "</p>";
          }
          this.$alert(html, {
            title: x.version + "的 版本描述",
            dangerouslyUseHTMLString: true,
          });
        });
    },
    versiontono(x) {
      request
        .post(
          "/system/deviceModel/setHistoryFirmversion",
          {},
          {
            params: {
              ...x,
            },
          }
        )
        .then((z) => {
          this.msgSuccess("操作成功");
          this.showversionmanage(x);
        });
    },
    // 查看历史版本
    // 新增分组
    showclassmsg(x) {
      this.isaddfromno = false;
      request
        .post(
          "/system/deviceModel/lookgroups",
          {},
          {
            params: {
              ...x,
            },
          }
        )
        .then((y) => {
          if (y.data.length < 1) {
            this.msgError("此版本没有分组信息");
            this.isaddfromno = true;
          }
          if (y.data.length == 1 && y.data[0] == "1") {
            this.$alert(" 此版本 适用于此型号所有设备 ", {
              title: x.version + "的 分组信息",
            });
            return;
          }
          
          let html = "";
          for (let i of y.data) {
            html = html + "<p>" + i.replace(",", "---") + "</p>";
          }
          if (html == "") {
            html = "<p>无</p>";
          }
          return this.$msgbox({
            message: html,
            title: x.version + "的 分组信息",
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: "新增分组",
          });
        })
        .then((_x) => {
          console.log(_x);
          if (_x == "confirm") {
            this.addclasstemp = x;
            return request.get("/system/conditions/list", {
              params: {
                modelCode: x.modelCode,
                id: x.id,
              },
            });
          }
        })
        // 初始化值
        .then((x3) => {
          this.isApplytoAll = null;
          this.fireversionConditionIds1 = [];
          this.fireversionConditionIds2 = [];
          this.hadclass = x3.rows;
          console.log(this.hadclass);
          this.addclassshow = true;
        });
    },
    // 新增分类保存
    versionaddclasssave() {
      this.addclassbutton = true;
      if (this.isaddfromno) {
        if (
          this.fireversionConditionIds1.length < 1 ||
          this.fireversionConditionIds2.length < 1
        ) {
          this.msgError("从无新增同时需要地区和序列号");
          this.addclassbutton = false;
          return;
        }
      }

      let data = {
        firmVsion: this.addclasstemp.version,
        modelCode: this.addclasstemp.modelCode,
        firmwareVersionId: this.addclasstemp.id,
        isApplytoAll: this.isApplytoAll,
        fireversionConditionIds: [
          ...this.fireversionConditionIds1,
          ...this.fireversionConditionIds2,
        ].toString(),
      };

      request
        .post(
          "/system/deviceModel/addgroup",
          {},
          {
            params: data,
          }
        )
        .then((x) => {
          this.addclassbutton = false;
          this.msgSuccess("保存成功");
          this.addclassshow = false;
        })
        .catch((x) => {
          this.addclassbutton = false;
        });
    },
  },
};
</script>