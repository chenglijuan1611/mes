<template>
  <div>
    <div class="chartsname">
      <div class="greenline" />
      <div>{{ chartsname }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["chartsname"]
};
</script>
<style scoped>
.chartsname {
  padding: 10px;
  display: flex;
  /* font-size: small; */
}
.greenline {
  margin-left: 10px;
  margin-right: 10px;
  width: 5px;
  height: 18px;
  background-color: #60c0c1;
}
</style>