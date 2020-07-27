<template>
  <div class="app-container">
    <el-form label-width="auto" :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
      <el-form-item label="mac地址" prop="mac">
        <el-input
          v-model="queryParams.mac"
          placeholder="请输入设备的mac地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="序列号" prop="serialNumber">
        <el-input
          v-model="queryParams.serialNumber"
          placeholder="请输入序列号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!-- <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

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

      <el-form-item label="mac地址" prop="mac">
        <el-input
          v-model="queryParams.mac"
          placeholder="请输入地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!-- <el-form-item label="添加时间" prop="gmtCreatetime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.gmtCreatetime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择添加时间"
        ></el-date-picker>
      </el-form-item>-->

      <el-form-item label="购买时间" prop="purchaseTime">
        <el-date-picker
          clearable
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="保修时间" prop="warrantyTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.warrantyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择保修时间"
        ></el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button
          style="margin-left:30px"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:device:export']"
        >导出</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="deviceList" @selection-change="handleSelectionChange">
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="设备型号" align="center" prop="modelCode" />
      <el-table-column label="设备mac地址" align="center" prop="mac" />

      <el-table-column label="序列号" align="center" prop="serialNumber" />
      <!-- <el-table-column label="手机号" align="center" prop="phone" /> -->
      <el-table-column label="省份(ip)" align="center" prop="province" />
      <el-table-column label="城市(ip)" align="center" prop="city" />
      <!-- <el-table-column label="地址" align="center" prop="address" /> -->
      <el-table-column label="固件版本" align="center" prop="firmwareVersion" />
      <el-table-column label="是否在线" align="center">
        <template slot-scope="scope">吧
          <span v-if="scope.row.isOnline==1">在线</span>
          <span v-if="!scope.row.isOnline==1">不在线</span>
        </template>
      </el-table-column>
      
      <!-- <el-table-column label="添加时间" align="center" prop="gmtCreatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreatetime) }}</span>
        </template>
      </el-table-column>-->

      <el-table-column label="购买时间" align="center" prop="purchaseTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.purchaseTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-more" @click="more(scope.row)">其他信息</el-button>
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
    <!-- 添加或修改设备信息表对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备的mac地址" prop="mac">
          <el-input v-model="form.mac" placeholder="请输入设备的mac地址" />
        </el-form-item>
        <el-form-item label="设备的mac地址" prop="installerId">
          <el-input v-model="form.installerId" placeholder="请输入设备的mac地址" />
        </el-form-item>
        <el-form-item label="销售编码" prop="salerCode">
          <el-input v-model="form.salerCode" placeholder="请输入销售编码" />
        </el-form-item>
        <el-form-item label="销售编码" prop="controllerCode">
          <el-input v-model="form.controllerCode" placeholder="请输入销售编码" />
        </el-form-item>
        <el-form-item label="设备型号编码" prop="modelCode">
          <el-input v-model="form.modelCode" placeholder="请输入设备型号编码" />
        </el-form-item>
        <el-form-item label="序列号" prop="serialNumber">
          <el-input v-model="form.serialNumber" placeholder="请输入序列号" />
        </el-form-item>
        <el-form-item label="是否授权" prop="isAuth">
          <el-input v-model="form.isAuth" placeholder="请输入是否授权" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model="form.country" placeholder="请输入国家" />
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-input v-model="form.region" placeholder="请输入地区" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="form.province" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-input v-model="form.area" placeholder="请输入地区" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="现城市" prop="currentCity">
          <el-input v-model="form.currentCity" placeholder="请输入现城市" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="经度" prop="gpsLng">
          <el-input v-model="form.gpsLng" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="gpsLat">
          <el-input v-model="form.gpsLat" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="纬度" prop="source">
          <el-input v-model="form.source" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="创建人" prop="createUser">
          <el-input v-model="form.createUser" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建人" prop="gmtCreatetime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtCreatetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建人"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" prop="modifyUser">
          <el-input v-model="form.modifyUser" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="gmtModifytime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtModifytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="购买时间" prop="purchaseTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.purchaseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择购买时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="保修时间" prop="warrantyTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.warrantyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择保修时间"
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
  listDevice,
  getDevice,
  delDevice,
  addDevice,
  updateDevice,
  exportDevice
} from '@/api/system/device'

export default {
  name: 'Device',
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
      // 设备信息表表格数据
      deviceList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mac: undefined,
        salerCode: undefined,
        modelCode: undefined,
        serialNumber: undefined,
        isAuth: undefined,
        name: undefined,
        phone: undefined,
        country: undefined,
        region: undefined,
        province: undefined,
        area: undefined,
        city: undefined,
        currentCity: undefined,
        address: undefined,
        createUser: undefined,
        gmtCreatetime: undefined,
        modifyUser: undefined,
        gmtModifytime: undefined,
        purchaseTime: undefined,
        warrantyTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      dateRange: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询设备信息表列表 */
    getList() {
      this.loading = true
      listDevice(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.deviceList = response.rows
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
        id: undefined,
        mac: undefined,
        installerId: undefined,
        salerCode: undefined,
        controllerCode: undefined,
        modelCode: undefined,
        serialNumber: undefined,
        isAuth: undefined,
        name: undefined,
        phone: undefined,
        country: undefined,
        region: undefined,
        province: undefined,
        area: undefined,
        city: undefined,
        currentCity: undefined,
        address: undefined,
        gpsLng: undefined,
        gpsLat: undefined,
        source: undefined,
        createUser: undefined,
        gmtCreatetime: undefined,
        modifyUser: undefined,
        gmtModifytime: undefined,
        purchaseTime: undefined,
        warrantyTime: undefined
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加设备信息表'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDevice(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改设备信息表'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateDevice(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addDevice(this.form).then(response => {
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
        '是否确认删除设备信息表编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delDevice(ids)
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
      this.$confirm('是否确认导出所有设备信息表数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportDevice(queryParams)
        })
        .then(response => {
          this.download(response.msg)
        })
        .catch(function() {})
    },
    //  详细信息
    more(x) {
      const h = this.$createElement
      this.$msgbox({
        title: '其他信息',
        message: h('p', null, [
          h('p', null, '详细地址:' +  x.address ),
          h('p', null, '添加时间:' + this.parseTime(x.gmtCreatetime)),
          h('p', null, '保修时间: ' + this.parseTime(x.warrantyTime))
        ]) // type: 'info'
      })
    }
  }
}
</script>