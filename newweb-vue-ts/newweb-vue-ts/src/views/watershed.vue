<template>
    <basicMap class="map" :params="params">
        <p>
            实习内容：

            1）显示“沟谷线”图层，分析实习区域的沟谷分布特征

            2）绘制流经开山老殿—禅源寺—天目村的沟谷线流域范围，绘制结果截图拷贝粘贴到实验报告中
        </p>
    </basicMap>
</template>
  
<script setup lang="ts">

import basicMap from '../components/basicMap.vue';
import { reactive } from 'vue'

let params = reactive(['block', 'flex'])


</script>
  
<style lang="scss" scoped>
.map {
    height: 100%;
}
</style>