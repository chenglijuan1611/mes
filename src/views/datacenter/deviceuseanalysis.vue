<template>
  <div>
    <charts1 />
    <charts2 />
    <charts3 />
  </div>
</template>
<script>
import charts1 from "@/components/Charts/deviceuseanalysis/charts1";
import charts2 from "@/components/Charts/deviceuseanalysis/charts2";
import charts3 from "@/components/Charts/deviceuseanalysis/charts3";
export default {
  components: {
    charts1,
    charts2,
    charts3,
  }
};
</script>