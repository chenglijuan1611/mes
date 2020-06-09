<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
/* .xxx {
  font-size: 8px !important;
} */
/* chrome element table 不对其 修复 */
/* body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
} */
/* /定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸/ */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #dcdcdc;
}
/* /定义滚动条轨道 内阴影+圆角/ */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}
/* /定义滑块 内阴影+圆角/ */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #3484fc;
}
</style>