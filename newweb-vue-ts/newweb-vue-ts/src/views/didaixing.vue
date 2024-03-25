<template>
    <div class="box">
        <basicMap class="map" :params="params">
            <p>
                实习内容：

                1）显示“植被实习点”图层，点击每个植被实习点，了解实习点的情况，查看实习点的全景图

                2）显示“植被分布”和“等高线”图层，分析实习区的植被垂直地带性分布特征
            </p>
        </basicMap>
        <div class="form">
            <el-form :model="form" label-width="120px" label-position="right">
                <div class="formtitle">
                    <div style="width: 32%;display: flex;justify-content: center;">类型</div>
                    <div style="display: flex;flex-direction: row;flex: 1;justify-content: space-evenly;">
                        <div>最低海拔(m)</div>
                        <div>最高海拔(m)</div>
                    </div>
                </div>
                <el-form-item label="竹林">
                    <el-input v-model="form.A1" />
                    <el-input v-model="form.A2" />
                </el-form-item>
                <el-form-item label="常绿阔叶林">
                    <el-input v-model="form.B1" />
                    <el-input v-model="form.B2" />
                </el-form-item>
                <el-form-item label="常绿落叶阔叶林">
                    <el-input v-model="form.C1" />
                    <el-input v-model="form.C2" />
                </el-form-item>
                <el-form-item label="落叶阔叶林">
                    <el-input v-model="form.D1" />
                    <el-input v-model="form.D2" />
                </el-form-item>
                <div class="btn">
                    <el-button type="primary">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script setup lang="ts">

import basicMap from '../components/basicMap.vue';
import { reactive } from 'vue'

let params = reactive(['block', 'none'])
const form = reactive({
    A1: '',
    A2: '',
    B1: '',
    B2: '',
    C1: '',
    C2: '',
    D1: '',
    D2: '',
})

</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;

    .map {
        height: 100%;
        z-index: 0;
    }

    .form {
        position: fixed;
        z-index: 999;
        width: 18vw;
        height: 28.5vh;
        background-color: #ffffffe8;
        top: calc(10vh + 15px);
        left: calc(16vw + 65px);
        border-radius: 7px;
        padding: 12px 20px 25px 25px;

        .formtitle {
            font-size: 16px;
            color: #606266;
            height: 32px;
            line-height: 32px;
            display: flex;
            flex-direction: row;
            margin-bottom: 10px;
            font-weight: bold;
        }

        :deep(.el-form-item__label) {
            text-align: justify;
            justify-content: center;
        }

        :deep(.el-input) {
            height: 30px;
            width: 75px;
        }

        :deep(.el-form-item__content) {
            justify-content: space-evenly;
        }

        .btn {
            display: flex;
            justify-content: space-evenly;
        }
    }
}
</style>