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
        <el-button icon="el-icon-aim" size="mini" @click="countcilck"
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
      <h3 class="titlecolor">本周用水量详情</h3>
      <div class="daily">
        <div
          class="weekitem"
          v-for="(i, index) in info.week"
          :key="index + 'w'"
        >
          {{ weekshow(index + 1) }}:<span> {{ i }}</span>
        </div>
      </div>
      <h3 class="titlecolor">当月用水量详情</h3>
      <div class="daily">
        <div
          class="monthitem"
          v-for="(i, index) in info.month"
          :key="index + 'm'"
        >
          {{ index + 1 }}天:<span> {{ i }}</span>
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
      loading: true,
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
      info: {},
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
      this.info = {};
      listDuration(this.queryParams).then((response) => {
        this.durationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      this.getdetail();
    },

    // 点击统计
    countcilck() {
      if (
        this.queryParams.mac == "" ||
        this.queryParams.mac == undefined ||
        this.queryParams.openTime == undefined ||
        this.queryParams.openTime == ""
      ) {
        this.$notify({
          title: "错误",
          message: "需要Mac地址于开始时间作为统计参数",
          type: "error",

          showClose: "true",
        });
        return;
      }

      this.analysisshow = true;
    },

    // 日
    getdetail() {
      if (
        this.queryParams.mac == "" ||
        this.queryParams.mac == undefined ||
        this.queryParams.openTime == undefined ||
        this.queryParams.openTime == ""
      ) {
        return;
      }
      requestnoau
        .get("/app/statiscal/daily", {
          params: {
            mac: this.queryParams.mac,
            currentDay: this.queryParams.openTime,
          },
        })
        .then((x) => {
          this.info.daily = x.data.own;
        });
      requestnoau
        .get("/app/statiscal/week", {
          params: {
            mac: this.queryParams.mac,
            endTime: this.queryParams.openTime,
          },
        })
        .then((x) => {
          this.info.week = x.data.own;
        });
      requestnoau
        .get("/app/statiscal/month", {
          params: {
            mac: this.queryParams.mac,
            whichyear: this.queryParams.openTime.slice(0, 4),
            monthInYear: this.queryParams.openTime.slice(5, 7),
          },
        })
        .then((x) => {
          this.info.month = x.data.own;
        });
    },
    weekshow(x) {
      if (x == "1") {
        return "周一";
      }
      if (x == "2") {
        return "周二";
      }
      if (x == "3") {
        return "周三";
      }
      if (x == "4") {
        return "周四";
      }
      if (x == "5") {
        return "周五";
      }
      if (x == "6") {
        return "周六";
      }
      if (x == "7") {
        return "周日";
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
  width: 70px;
  font-weight: bold;
  text-align: start;
}
.weekitem {
  width: 70px;
  font-weight: bold;
  text-align: center;
}
.monthitem {
  width: 70px;
  font-weight: bold;
  text-align: start;
}
.titlecolor {
  color: brown;
}
</style>