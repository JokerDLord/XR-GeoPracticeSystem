<template>
  <div style="height: 100%;">
    <iframe :src="`/static/introduction.html`" frameborder="0" height="100%" width="100%" ref="fIframe">
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const fIframe = ref();
</script>

<style scoped></style>