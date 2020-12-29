<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="auto"
    >
      <el-form-item label="mac地址" prop="mac">
        <el-input
          v-model="queryParams.mac"
          placeholder="请输入mac地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="openTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.openTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="closeTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.closeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间"
        >
        </el-date-picker>
      </el-form-item>
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
        <el-button
          type="warning"
          icon="el-icon-aim"
          size="mini"
          @click="countcilck"
          >统计</el-button
        >
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="durationList">
      <el-table-column label="mac地址" align="center" prop="mac" />
      <el-table-column label="本次用水开始时间" align="center" prop="openTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.openTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本次用水结束时间" align="center" prop="closeTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.closeTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单次用水量"
        align="center"
        prop="waterConsumption"
        width="100"
      />
      <el-table-column
        width="100"
        label="单次用水时长"
        align="center"
        prop="usingLength"
      />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- <div class="info">
      <table>
        <tr>
          <td v-for="i in 24" :key="i">{{ i }}时</td>
        </tr>
        <tr>
          <td v-for="i in info.daily" :key="i + 'daily'">{{ i }}</td>
        </tr>
      </table>
    </div> -->
    <el-dialog title="统计分析" :visible.sync="analysisshow">
      <div v-loading="dialogloading">
        <div style="color: black">
          <h3 class="titlecolor">设备信息</h3>
          <h3>
            mac:{{ this.queryParams.mac }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间:{{
              this.queryParams.openTime
            }}
          </h3>
        </div>
        <h3 class="titlecolor">当日用水量详情</h3>
        <div class="daily">
          <div
            class="dailyitem"
            v-for="(i, index) in info.daily"
            :key="index + 'h'"
          >
            {{ index + 1 }}时:<span> {{ i }}</span>
          </div>
        </div>
        <h3 class="titlecolor">七日内水量详情</h3>
        <div class="daily">
          <div
            class="weekitem"
            v-for="(i, index) in info.week"
            :key="index + 'w'"
          >
            {{ weekshow(index + 1) }}: {{ i }}
          </div>
        </div>
        <h3 class="titlecolor">当月用水量详情</h3>
        <div class="daily">
          <div
            class="monthitem"
            v-for="(i, index) in info.month"
            :key="index + 'm'"
          >
            {{ index + 1 }}日:<span> {{ i }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDuration, exportDuration } from "@/api/system/duration";
import requestnoau from "@/utils/requestnoau";

export default {
  name: "Duration",
  data() {
    return {
      // 遮罩层
      loading: false,
      dialogloading: false,
      durationList: [],
      total: 0,
      // 用户用水统计表格数据

      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mac: "",
        openTime: "",
        closeTime: undefined,
      },
      info: {
        week: [],
        daily: [],
        month: [],
      },
      analysisshow: false,
    };
  },

  created() {
    this.getList();
  },
  methods: {
    /** 查询用户用水统计列表 */
    getList() {
      this.loading = true;
      listDuration(this.queryParams).then((response) => {
        this.durationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 点击统计按钮
    countcilck() {
      if (
        this.queryParams.mac == "" ||
        this.queryParams.mac == undefined ||
        this.queryParams.openTime == undefined ||
        this.queryParams.openTime == ""
      ) {
        this.$notify({
          title: "错误",
          message: "需要 Mac地址 与 开始时间 作为统计参数",
          type: "error",
          showClose: "true",
        });
        return;
      }
      this.getdetail();
    },

    // 显示统计信息 弹框
    getdetail() {
      //  判断参数
      if (
        this.queryParams.mac == "" ||
        this.queryParams.mac == undefined ||
        this.queryParams.openTime == undefined ||
        this.queryParams.openTime == ""
      ) {
        return;
      }
      // 重置信息
      this.info = {
        week: [],
        daily: [],
        month: [],
      };
      this.dialogloading = true;
      Promise.all([
        requestnoau.get("/app/statiscal/daily", {
          params: {
            mac: this.queryParams.mac,
            currentDay: this.queryParams.openTime,
          },
        }),
        requestnoau.get("/app/statiscal/week", {
          params: {
            mac: this.queryParams.mac,
            endTime: this.queryParams.openTime,
          },
        }),
        requestnoau.get("/app/statiscal/month", {
          params: {
            mac: this.queryParams.mac,
            whichyear: this.queryParams.openTime.slice(0, 4),
            monthInYear: this.queryParams.openTime.slice(5, 7),
          },
        }),
      ])
        .then((x) => {
          let a, b, c;
          [a, b, c] = x;
          this.info.daily = a.data.own;
          this.info.week = b.data.own;
          this.info.month = c.data.own;
        })
        .finally((x) => {
          this.dialogloading = false;
        });
      this.analysisshow = true;
    },
    //  时间格式化
    format(date) {
      var date = new Date(date);
      var YY = date.getFullYear();
      var MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      return YY + "年" + MM + "月" + DD + "日";
    },
    weekshow(x) {
      let n = new Date(this.queryParams.openTime).getTime();

      if (x == "1") {
        return this.format(n - 86400000 * 6);
      }
      if (x == "2") {
        return this.format(n - 86400000 * 5);
      }
      if (x == "3") {
        return this.format(n - 86400000 * 4);
      }
      if (x == "4") {
        return this.format(n - 86400000 * 3);
      }
      if (x == "5") {
        return this.format(n - 86400000 * 2);
      }
      if (x == "6") {
        return this.format(n - 86400000 * 1);
      }
      if (x == "7") {
        return this.format(n);
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        mac: undefined,
        openTime: undefined,
        closeTime: undefined,
        gmtCreatetime: undefined,
        waterConsumption: undefined,
        usingLength: undefined,
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

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有用户用水统计数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportDuration(queryParams);
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
.daily {
  display: flex;
  flex-wrap: wrap;
}
.dailyitem {
  width: 80px;
  font-weight: bold;
  text-align: start;
}
.weekitem {
  font-weight: bold;
  text-align: start;
  margin-right: 20px;
}
.monthitem {
  width: 80px;
  font-weight: bold;
  text-align: start;
}
.titlecolor {
  color: brown;
}
</style>