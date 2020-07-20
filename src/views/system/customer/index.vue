<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="auto">
      <el-form-item label="客户账号" prop="customer">
        <el-input
          v-model="queryParams.customer"
          placeholder="请输入客户账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable size="small">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="省" prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区" prop="district">
        <el-input
          v-model="queryParams.district"
          placeholder="请输入区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="gmtCreatetime">
        <!-- <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.gmtCreatetime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>-->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="time"
          style="width: 240px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </el-form-item>
      <!-- <el-form-item label="修改时间" prop="gmtModifytime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.gmtModifytime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择修改时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item></el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:customer:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:customer:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:customer:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:customer:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="customerList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="客户账号" align="center" prop="customer" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="设备名称" align="center" prop="name" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <!-- <el-table-column label="是否是维修" align="center" prop="isRepair" /> -->
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="district" />
      <!-- <el-table-column label="详细地址" align="center" prop="address" /> -->
      <!-- <el-table-column label="头像" align="center" prop="avatar" /> -->
      <!-- <el-table-column label="是否是测试" align="center" prop="isTest" /> -->
      <el-table-column label="创建时间" align="center" prop="gmtCreatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="gmtModifytime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModifytime) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="openid" align="center" prop="openid" /> -->
      <!-- <el-table-column label="是否登录" align="center" prop="isLogin" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-location"
            @click="detailaddress(scope.row)"
          >详细地址</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-fold"
            @click="bdevicelist(scope.row)"
          >已绑定设备</el-button>
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

    <!-- 添加或修改客户信息对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="是否是维修" prop="isRepair">
          <el-input v-model="form.isRepair" placeholder="请输入是否是维修" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="form.province" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="区" prop="district">
          <el-input v-model="form.district" placeholder="请输入区" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="form.avatar" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="是否是测试" prop="isTest">
          <el-input v-model="form.isTest" placeholder="请输入是否是测试" />
        </el-form-item>
        <el-form-item label="创建时间" prop="gmtCreatetime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.gmtCreatetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间"
          ></el-date-picker>
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
        </el-form-item>
        <el-form-item label="openid" prop="openid">
          <el-input v-model="form.openid" placeholder="请输入openid" />
        </el-form-item>
        <el-form-item label="是否登录" prop="isLogin">
          <el-input v-model="form.isLogin" placeholder="请输入是否登录" />
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
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer,
  exportCustomer,
  CustomerdeviceLiist
} from '@/api/system/customer'

export default {
  name: 'Customer',
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
      // 客户信息表格数据
      customerList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customer: undefined,
        sex: undefined,
        name: undefined,
        phone: undefined,
        isRepair: undefined,
        province: undefined,
        city: undefined,
        district: undefined,
        address: undefined,
        avatar: undefined,
        isTest: undefined,
        gmtCreatetime: undefined,
        gmtModifytime: undefined,
        openid: undefined,
        isLogin: undefined,
        beginTime: undefined,
        endTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      time: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    detailaddress(x) {
      this.$msgbox({
        title: '显示详细地址',
        // x.province+x.city+x.district+x.address
        message: x.province + ' ' + x.city + ' ' + x.district + '  ' + x.address
        // type: 'info'
      })
    },
    // 显示用户设备列表
    bdevicelist(x) {
      CustomerdeviceLiist(x.customer).then(x => {
        console.log(x.data)

        const h = this.$createElement

        let list = x.data.map(y => {
          return h('p', null, [
            h('p', null, '设备型号：' + y.modelCode),
            h('p', null, '设备名称：' + y.name),
            h('p', null, '设备序列号：' + y.serialNumber),
            h('p', null, '设备mac地址：' + y.mac),
            h('br', null, ' ')
          ])
        })
        let node
        if (x.data.length > 0) {
          node = list
        } else {
          node = '未查询到已绑定设备'
        }
        this.$msgbox({
          title: '用户已绑定设备',
          message: h('p', null, node) // type: 'info'
        })
      })
    },
    /** 查询客户信息列表 */
    getList() {
      this.loading = true
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    // cancel() {
    //   this.open = false
    //   this.reset()
    // },
    // 表单重置
    reset() {
      this.form = {
        customer: undefined,
        sex: undefined,
        name: undefined,
        phone: undefined,
        isRepair: undefined,
        password: undefined,
        province: undefined,
        city: undefined,
        district: undefined,
        address: undefined,
        avatar: undefined,
        isTest: undefined,
        gmtCreatetime: undefined,
        gmtModifytime: undefined,
        openid: undefined,
        isLogin: undefined,
        beginTime: undefined,
        endTime: undefined
      }
      this.time = undefined
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.time) {
        this.queryParams.beginTime = this.time[0]
        this.queryParams.endTime = this.time[1]
      }
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.beginTime = undefined
      this.queryParams.endTime = undefined
      this.time = undefined
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    // handleSelectionChange(selection) {
    //   this.ids = selection.map(item => item.customer)
    //   this.single = selection.length != 1
    //   this.multiple = !selection.length
    // },
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset()
    //   this.open = true
    //   this.title = '添加客户信息'
    // },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.isadd = false
    //   this.reset()
    //   const customer = row.customer || this.ids
    //   getCustomer(customer).then(response => {
    //     this.form = response.data
    //     this.open = true
    //     this.title = '修改客户信息'
    //   })
    // },
    /** 提交按钮 */
    // submitForm: function() {
    //   this.$refs['form'].validate(valid => {
    //     if (valid) {
    //       if (this.form.customer != undefined) {
    //         updateCustomer(this.form).then(response => {
    //           if (response.code === 200) {
    //             this.msgSuccess('修改成功')
    //             this.open = false
    //             this.getList()
    //           } else {
    //             this.msgError(response.msg)
    //           }
    //         })
    //       } else {
    //         addCustomer(this.form).then(response => {
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
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const customers = row.customer || this.ids
    //   this.$confirm(
    //     '是否确认删除客户信息编号为"' + customers + '"的数据项?',
    //     '警告',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   )
    //     .then(function() {
    //       return delCustomer(customers)
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
      this.$confirm('是否确认导出所有客户信息数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportCustomer(queryParams)
        })
        .then(response => {
          this.download(response.msg)
        })
        .catch(function() {})
    }
  }
}
</script>