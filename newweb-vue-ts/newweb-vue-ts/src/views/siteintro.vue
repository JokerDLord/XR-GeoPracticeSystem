<template>
    <div style="height: 100%;width: 100%;">
        <basicMap style="height: 100%;width: 100%;" :params="params"></basicMap>
    </div>
</template>
  
<script setup lang="ts">

import basicMap from '../components/basicMap.vue';

import { reactive } from 'vue'

let params = reactive(['none','none'])

</script>
  
<style scoped></style>