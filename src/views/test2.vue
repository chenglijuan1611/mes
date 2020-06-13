<template>
  <div>
    <button @click="c">sss</button>
    <button @click="c2">222</button>
    <xxx :title1="aaa" :flag="flag" :span1="bbb"></xxx>
  </div>
</template>
<script>
import xxx from "../components/Dialog";
export default {
  data() {
    return {
      aaa: "",
      bbb: "",
      flag: false
    };
  },
  components: { xxx },
  methods: {
    c() {
      this.aaa = "www1";
      this.bbb = "dddd1";
      this.flag = !this.flag;
    },
    c2() {
      this.aaa = "www2";
      this.bbb = "dddd2";
      this.flag = !this.flag;
    }
  }
};
</script>
