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
            @click="clickupfirmware(scope.row)"
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
          <el-button size="mini" type="text" @click="serialnumbergroupmanage(scope.row)">分组管理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改设备分类信息
    对话框-->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" label-width="auto">
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
    <!-- 上传图片 -->
    <!-- // 文件上传 -->
    <el-dialog title="上传图片" :visible.sync="imguploadshow" width="30%">
      <el-upload action ref="up" drag :limit="1" :http-request="imgupfunc">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imguploadok">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传固件 -->
    <el-dialog title="上传固件" :visible.sync="upfirmwareshow">
      <el-form :rules="rules" label-width="auto">
        <el-form-item label="固件的版本号" prop="versionchange">
          <el-input v-model="firmVsion" placeholder="请输入版本号 N.N.N" clearable style="width: 240px" />
        </el-form-item>
        <el-form-item label="固件的版本描述">
          <el-input
            autosize
            v-model="vsionDescrip"
            :placeholder="'请输入版本描述  ' "
            clearable
            type="textarea"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="区域选择">
          <div>
            <el-radio v-model="allAreaFlag" :label="0">限定区域</el-radio>
            <el-radio v-model="allAreaFlag" :label="1">不限定区域</el-radio>
          </div>

          <el-cascader
            v-show="allAreaFlag==0"
            filterable
            v-model="areas"
            :options="citydata"
            :props="{
            multiple:true
          }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="序列号选择">
          <div>
            <el-radio v-model="allSerialNumFlag" :label="0">限定序列号</el-radio>
            <el-radio v-model="allSerialNumFlag" :label="1">不限定序列号</el-radio>
          </div>
          <el-checkbox-group v-show="allSerialNumFlag==0" v-model="serialNumScopeIds">
            <el-checkbox
              v-for="i in serialnumbergroup"
              :key="i.id"
              :label="i.id"
            >{{i.serialNumStart+"--"+i.serialNumEnd}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="固件选择">
          <el-upload
            :limit="1"
            ref="versionupload"
            action
            :auto-upload="false"
            :http-request="upfun"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="versionuploadstart"
            >上传到服务器</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 版本管理 -->
    <el-dialog title="版本管理" :visible.sync="versionmanageshow">
      <el-table :data="versionmanagelist" border stripe>
        <el-table-column align="center" prop="modelCode" label="modelCode"></el-table-column>
        <el-table-column align="center" prop="version" label="version"></el-table-column>
        <el-table-column align="center" prop="gmtCreatetime" label="上传时间"></el-table-column>
        <el-table-column align="center" prop="forbidTime" label="禁用时间"></el-table-column>

        <el-table-column align="center" label="版本状态">
          <template slot-scope="scope">
            <span v-show="scope.row.flag==1" style="color:green">正常</span>
            <span v-show="scope.row.flag==0" style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分组信息">
          <template slot-scope="scope">
            <el-button type="text" style="color:green" @click="getgroupdata(scope.row)">分组信息</el-button>
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
            <el-button
              style="margin:0"
              :disabled="scope.row.flag!=0"
              type="text"
              size="default"
              @click="versiontook(scope.row)"
            >启用此版本</el-button>
            <el-button
              style="margin:0"
              :disabled="scope.row.flag==0"
              type="text"
              size="default"
              @click="forceupdate(scope.row)"
            >强制升级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 版本管理内的版本描述 -->
    <el-dialog title="版本描述" :visible.sync="versiondesshow">
      <el-input autosize v-model="versiondesdata.description" clearable type="textarea" />
      <span slot="footer">
        <el-button style="margin:20px" type="success" @click="editFirmVerDesc" size="small">更新描述</el-button>
      </span>
    </el-dialog>
    <!-- 分组管理 -->
    <el-dialog title="分组管理" :visible.sync="serialnumbergroupmanageshow">
      <el-form label-width="auto">
        <el-form-item label="选择序列号">
          <el-row>
            <el-col :span="6" :offset="0">
              <el-input v-model="serialNumStart" placeholder="序列号起始位置" clearable></el-input>
            </el-col>

            <el-col style="display:flex;justify-content:center" :span="1" :offset="0">
              <span>—</span>
            </el-col>

            <el-col :span="6" :offset="0">
              <el-input v-model="serialNumEnd" placeholder="序列号起始位置" clearable></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="操作">
          <el-button @click=" serialnumbergroupsave" size="small">保存此分组</el-button>
        </el-form-item>
        <el-form-item label="分组信息">
          <template>
            <div v-for="i in serialnumbergroup" :key="i.id">
              <div
                v-show="i.serialNumStart && i.serialNumStart!='' && i.serialNumEnd && i.serialNumEnd!=''? true:false"
              >
                {{i.serialNumStart}} -- {{i.serialNumEnd}}
                <a style="margin-left:8px;">
                  <i @click="delserilagroup(i.id)" style="color:red" class="el-icon-delete"></i>
                </a>
              </div>
            </div>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 版本管理内的分组信息 -->
    <el-dialog title="分组信息" :visible.sync="groupinformationshow">
      <!-- <el-form :rules="rules" label-width="auto">
        <el-form-item label="区域选择">
          <div>
            <el-radio v-model="allAreaFlag" :label="0">限定区域</el-radio>
            <el-radio v-model="allAreaFlag" :label="1">不限定区域</el-radio>
          </div>

          <el-cascader
            v-show="allAreaFlag==0"
            filterable
            v-model="areas"
            :options="citydata"
            :props="{
            multiple:true
          }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="序列号选择">
          <div>
            <el-radio v-model="allSerialNumFlag" :label="0">限定序列号</el-radio>
            <el-radio v-model="allSerialNumFlag" :label="1">不限定序列号</el-radio>
          </div>
          <el-checkbox-group v-show="allSerialNumFlag==0" v-model="serialNumScopeIds">
            <el-checkbox
              v-for="i in serialnumbergroup"
              :key="i.id"
              :label="i.id"
            >{{i.serialNumStart+"--"+i.serialNumEnd}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>-->
      <el-form>
        <el-form-item label="区域分组">
          <span v-show="groupinformation.allAreaFlag==1">适用于所有区域</span>
          <span style="margin-left:10px" v-for="i in groupinformation.arealist" :key="i">{{i}}</span>
        </el-form-item>
        <el-form-item label="序列号分组">
          <span v-show="groupinformation.allSerialNumFlag==1">适用于所有序列号</span>
          <span style="margin-left:10px" v-for="i in groupinformation.serialNumlist" :key="i">{{i}}</span>
        </el-form-item>
        <h2>修改分组</h2>
        <el-form>
          <el-form-item label="区域选择">
            <div>
              <el-radio v-model="allAreaFlag" :label="0">限定区域</el-radio>
              <el-radio v-model="allAreaFlag" :label="1">不限定区域</el-radio>
            </div>

            <el-cascader
              v-show="allAreaFlag==0"
              filterable
              v-model="areas"
              :options="citydata"
              :props="{
            multiple:true
          }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="序列号选择">
            <div>
              <el-radio v-model="allSerialNumFlag" :label="0">限定序列号</el-radio>
              <el-radio v-model="allSerialNumFlag" :label="1">不限定序列号</el-radio>
            </div>
            <el-checkbox-group v-show="allSerialNumFlag==0" v-model="serialNumScopeIds">
              <el-checkbox
                v-for="i in serialnumbergroup"
                :key="i.id"
                :label="i.id"
              >{{i.serialNumStart+"--"+i.serialNumEnd}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="修改分组">
            <el-button @click="editgroup">修改分组</el-button>
          </el-form-item>
        </el-form>
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
import qs from "qs";

import { citydata, CodeToText } from "@/utils/city/city";

import { handleTree } from "@/utils/dafeng";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "DeviceModel2",
  components: { Treeselect },

  data() {
    var validatePass = (rule, value, callback) => {
      if (!/^\d\.\d\.\d$/.test(this.firmVsion)) {
        callback(new Error("版本号不合法,格式应为 N.N.N"));
      } else {
        callback();
      }
    };
    return {
      // 遮罩层
      loading: true,
      // 设备分类信息表格数据
      deviceModelList: [],
      // 设备分类信息树选项
      deviceModelOptions: [],
      // 弹出层标题
      title: "",
      Firmshow: false,
      FirmVerDesclist: [{ description: "" }],
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
      rules: {
        versionchange: [{ validator: validatePass, trigger: "blur" }],
      },

      editcode: false,
      dateRange: [],
      // 城市数据
      citydata: citydata,
      // 上传图片
      imguploadshow: false,
      imgupdatatemp: {},

      //  上传固件
      upfirmwareshow: false,
      modelCodetemp: "",
      firmVsion: "",
      vsionDescrip: "",
      fireversionConditionIds: [],
      allAreaFlag: 1,
      allSerialNumFlag: 1,
      areas: [],
      serialNumScopeIds: [],
      // 序列号分组列表
      serialnumbergroup: [],

      // 版本管理
      versionmanageshow: false,
      versionmanagelist: [],
      // 版本管理内的版本描述
      versiondesshow: false,
      versiondesdata: {},
      // 分组管理
      serialnumbergroupmanageshow: false,
      serialNumStart: "",
      serialNumEnd: "",
      serialnumbergrouptemp: {},
      // 版本管理内的分组信息
      groupinformationshow: false,
      groupinformation: {},
      opengroupinformationtemp: {},
    };
  },

  created() {
    this.getList();
  },

  methods: {
    // 点击分组管理
    serialnumbergroupmanage(x) {
      this.serialnumbergrouptemp = {};
      this.serialnumbergrouptemp = x;
      this.serialNumStart = "";
      this.serialNumEnd = "";
      this.serialnumbergroup = [];
      this.getserialnumbergroup();
      this.serialnumbergroupmanageshow = true;
    },
    // 保存此分组
    serialnumbergroupsave() {
      if (parseInt(this.serialNumStart) && parseInt(this.serialNumEnd)) {
        if (
          this.serialNumStart.length != 13 ||
          this.serialNumEnd.length != 13
        ) {
          this.msgError("序列号 应为13位数字");
          return;
        }

        if (this.serialNumStart.slice(0, 3) != this.serialNumEnd.slice(0, 3)) {
          this.msgError("序列号 非同组序列号");
        }

        request
          .post("/system/conditions", {
            deviceModelId: this.serialnumbergrouptemp.deviceModelId,
            modelCode: this.serialnumbergrouptemp.modelCode,
            serialNumStart: this.serialNumStart,
            serialNumEnd: this.serialNumEnd,
            flag: "2",
          })
          .then((x) => {
            this.getserialnumbergroup();
            this.msgSuccess("保存成功");
          });
      } else {
        this.msgError("录入信息不完整");
      }
    },
    // 删除分组
    delserilagroup(x) {
      request.delete("/system/conditions/" + x).then((x) => {
        console.log(x);
        this.getserialnumbergroup();
      });
    },

    // 获取版本描述
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
          this.versiondesshow = true;
          this.versiondesdata = y.data[0];
        });
    },
    // 更新版本描述
    editFirmVerDesc() {
      console.log(this.versiondesdata);
      request
        .post("/system/deviceModel/editFirmVerDesc", this.versiondesdata)
        .then((x) => {
          console.log(x);
          this.msgSuccess(x.msg)
        });
    },
    // 打开版本管理
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
    // 点击打开分组信息
    getgroupdata(x) {
      // 初始化值
      this.serialNumScopeIds = [];
      this.areas = [];
      this.allSerialNumFlag = 1;
      this.allAreaFlag = 1;

      this.opengroupinformationtemp = x;
      this.modelCodetemp = x.modelCode;
      this.getserialnumbergroup();
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
          console.log(y);
          this.groupinformationshow = true;
          this.groupinformation = y.data;
        });
    },
    editgroup() {
      let reqdata = {};
      reqdata.id = this.opengroupinformationtemp.id;
      reqdata.allSerialNumFlag = this.allSerialNumFlag;
      reqdata.allAreaFlag = this.allAreaFlag;

      if (this.allAreaFlag == 0) {
        let data = [];
        this.areas.forEach((x) => {
          data.push({ province: CodeToText[x[0]], city: CodeToText[x[1]] });
        });
        reqdata.areaStr = JSON.stringify(data);
      } else {
        reqdata.areaStr = "[]";
      }
      if (this.allSerialNumFlag == 0) {
        reqdata.serialNumScopeIds = this.serialNumScopeIds.toString();
      }
      request
        .post("/system/deviceModel/editgroup", qs.stringify(reqdata), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((x) => {
          console.log(x);
          request
            .post(
              "/system/deviceModel/lookgroups",
              {},
              {
                params: {
                  ...this.opengroupinformationtemp,
                },
              }
            )
            .then((y) => {
              this.groupinformation = y.data;
            });
          this.msgSuccess("修改成功");
        });
    },
    // 禁用此版本
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
    // 解除禁用
    versiontook(x) {
      request
        .post(
          "/system/deviceModel/removeForbid",
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
    // 强制升级
    forceupdate(x) {
      request.put("/system/deviceModel/enforcement/" + x.id).then((x) => {
        console.log(x);
      });
    },
    // 打开上传固件模态框
    clickupfirmware(x) {
      this.upfirmwareshow = true;
      this.modelCodetemp = x.modelCode;

      this.serialNumScopeIds = [];
      this.areas = [];
      this.vsionDescrip = "";
      this.firmVsion = "";
      if (this.$refs.versionupload) {
        this.$refs.versionupload.clearFiles();
      }

      this.getserialnumbergroup();
    },
    // 固件上传提交
    versionuploadstart() {
      this.$refs.versionupload.submit();
    },
    // 获取序列号分组信息
    getserialnumbergroup() {
      request
        .get("/system/conditions/list?modelCode=" + this.modelCodetemp)
        .then((x) => {
          this.serialnumbergroup = x.rows;
        });
    },
    // 自定义固件上传实现
    upfun(x) {
      let formData = new FormData();
      formData.append("firmwareFile", x.file);
      formData.append("modelCode", this.modelCodetemp);
      formData.append("vsionDescrip", this.vsionDescrip);
      formData.append("firmVsion", "v" + this.firmVsion);
      formData.append("allAreaFlag", this.allAreaFlag);
      formData.append("allSerialNumFlag ", this.allSerialNumFlag);

      if (this.allAreaFlag == 0) {
        let data = [];
        this.areas.forEach((x) => {
          data.push({ province: CodeToText[x[0]], city: CodeToText[x[1]] });
        });
        formData.append("areaStr", JSON.stringify(data));
      } else {
        formData.append("areaStr", JSON.stringify([]));
      }
      if (this.allSerialNumFlag == 0) {
        formData.append(
          "fireversionConditionIds",
          this.fireversionConditionIds.toString()
        );
      }

      upfile("/system/deviceModel/uploadFirmware2", formData, (z) => {
        let p = (z.loaded / z.total) * 100;
        x.onProgress({ percent: p });
      })
        .then((res) => {
          x.onSuccess();
          console.log(res);
          this.msgSuccess(res.msg);
          this.$refs.versionupload.clearFiles();

          this.upfirmwareshow = false;

          this.getList();
        })
        .catch((err) => {
          this.$refs.versionupload.clearFiles();
          this.msgError("上传出现错误 :" + err);
        });
    },
    // 点击图片上传
    upimgclick(x) {
      this.imgupdatatemp = x;
      this.imguploadshow = true;
    },
    // 自定义图片上传实现
    imgupfunc(x) {
      let formData = new FormData();
      formData.append("picture", x.file);
      formData.append("modelCode", this.imgupdatatemp.modelCode);

      upfile("/system/deviceModel/uploadPicture", formData, (z) => {
        let p = (z.loaded / z.total) * 100;
        x.onProgress({ percent: p });
      })
        .then((res) => {
          x.onSuccess();
          this.getList();
        })
        .catch((err) => {
          x.onError();
          this.$alert(err, "上传出现错误", {
            confirmButtonText: "确定",
          });
        });
    },
    // 关闭图片上传模态框
    imguploadok() {
      this.imguploadshow = false;
      this.$refs.up.clearFiles();
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
  },
};
</script>