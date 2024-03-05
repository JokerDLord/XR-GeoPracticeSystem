<template>
    <div class="box1">
        <div class="intro">
            这里是教学内容文字介绍部分
            <p>1</p>
            <p>2</p>
            <p>3</p>
        </div>
        <basicMap class="map" :params="params">
            <p>
                实习内容：

                1）显示“地貌实习点”图层，点击每个地貌实习点，了解实习点的情况，查看实习点的全景图

                2）分析实习区的地貌特征，并在实验报告中填写
            </p>
        </basicMap>
    </div>
</template>
  
<script setup lang="ts">

import basicMap from '../components/basicMap.vue';
import { reactive } from 'vue'

let params = reactive(['block', 'none'])


</script>
  
<style lang="scss" scoped>
.box1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    .intro {
        width: 50%;
    }

    .map {
        flex: 1;
        height: 100%;
        border-color: black;
        box-sizing: border-box;
        border: solid #535353 thin;
    }
}
</style>