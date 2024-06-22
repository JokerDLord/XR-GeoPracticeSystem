<template>
  <!-- <div>
    这里是平台操作步骤
  </div> -->
  <div style="height: 100%;">
    <iframe src="http://139.9.165.59:8080/ECNUTMS/TMS/src/webapp/operation.html" frameborder="0" height="100%" width="100%" ref="fIframe">
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const fIframe = ref();
</script>

<style scoped></style>