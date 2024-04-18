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
            <div class="formRow Title">
                <div class="formItem">类型</div>
                <div class="formItem">最低海拔(m)</div>
                <div class="formItem">最高海拔(m)</div>
            </div>
            <div class="formRow">
                <div class="formItem">竹林</div>
                <div class="formItem">
                    <el-input v-model="inputList[0]"/>
                </div>
                <div class="formItem">
                    <el-input v-model="inputList[1]"/>
                </div>
            </div>
            <div class="formRow">
                <div class="formItem">常绿阔叶林</div>
                <div class="formItem">
                    <el-input v-model="inputList[2]"/>
                </div>
                <div class="formItem">
                    <el-input v-model="inputList[3]"/>
                </div>
            </div>
            <div class="formRow">
                <div class="formItem">常绿落叶阔叶林</div>
                <div class="formItem">
                    <el-input v-model="inputList[4]"/>
                </div>
                <div class="formItem">
                    <el-input v-model="inputList[5]"/>
                </div>
            </div>
            <div class="formRow">
                <div class="formItem">落叶阔叶林</div>
                <div class="formItem">
                    <el-input v-model="inputList[6]"/>
                </div>
                <div class="formItem">
                    <el-input v-model="inputList[7]"/>
                </div>
            </div>
            <div class="formRow Bottom">
                <el-button type="primary" @click="uploadvege()">确定</el-button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { storedata } from "../store/didaixing";
const data1 = storedata();
let { vegeList } = storeToRefs(data1)

const uploadvege = () => {
    data1.vegeList = inputList
}

import basicMap from '../components/basicMap.vue';
import { reactive, ref } from 'vue'

let inputList = ref(['','','','','','','',''])

let params = reactive(['block', 'none'])

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
        width: 19vw;
        // height: 28.5vh;
        background-color: #ffffffe8;
        top: calc(10vh + 15px);
        left: calc(16vw + 65px);
        border-radius: 7px;
        padding: 20px 20px 15px 15px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .formRow {
            width: 100%;
            display: flex;
            flex-direction: row;
            // align-content: space-between;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            margin-bottom: 15px;

            .formItem {
                width: 33%;

                :deep(.el-input) {
                    width: 80%;
                }
            }
        }

        .formRow.Title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .formRow.Bottom {
            margin-bottom: 0;
            display: flex;
            justify-content: center;
        }
    }
}
</style>