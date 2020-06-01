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
.xxx {
  font-size: 8px !important;
}
/* chrome element table 不对其 修复 */
body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>