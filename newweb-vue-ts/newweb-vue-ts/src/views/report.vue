<template>
    <div class="page">
        <div class="report">
            <div class="title">实习报告</div>
            <div class="userInfo">
                <div>姓名：{{ userID }}</div>
                <div>学号：{{ stuID }}</div>
            </div>
            <div class="content">
                <div class="taskPoint">
                    <div>1. 不同实习点的地层地质年代判读</div>
                    <el-input type="textarea" />
                </div>
                <div class="taskPoint">
                    <div>2. 沟谷线流域范围绘制</div>
                    <div class="upload-demo">
                        <el-upload ref="uploadRef" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            :auto-upload="false" multiple>
                            <template #trigger>
                                <el-button type="primary">点击上传</el-button>
                            </template>
                            <!-- <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template> -->
                        </el-upload>
                    </div>

                </div>
                <div class="taskPoint">
                    <div>3. 植被垂直地带性范围</div>
                    <div class="form">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="type" label="类型" width="170" />
                            <el-table-column prop="latl" label="最低海拔(m)" />
                            <el-table-column prop="lath" label="最高海拔(m)" />
                        </el-table>
                    </div>

                    <!-- <div class="form">
                        <div class="formRow Title">
                            <div class="formItem">类型</div>
                            <div class="formItem">最低海拔(m)</div>
                            <div class="formItem">最高海拔(m)</div>
                        </div>
                        <div class="formRow">
                            <div class="formItem">竹林</div>
                            <div class="formItem">
                                <div>{{ vegeList[0] }}</div>
                            </div>
                            <div class="formItem">
                                <div>{{ vegeList[1] }}</div>
                            </div>
                        </div>
                        <div class="formRow">
                            <div class="formItem">常绿阔叶林</div>
                            <div class="formItem">
                                <div>{{ vegeList[2] }}</div>
                            </div>
                            <div class="formItem">
                                <div>{{ vegeList[3] }}</div>
                            </div>
                        </div>
                        <div class="formRow">
                            <div class="formItem">常绿落叶阔叶林</div>
                            <div class="formItem">
                                <div>{{ vegeList[4] }}</div>
                            </div>
                            <div class="formItem">
                                <div>{{ vegeList[5] }}</div>
                            </div>
                        </div>
                        <div class="formRow">
                            <div class="formItem">落叶阔叶林</div>
                            <div class="formItem">
                                <div>{{ vegeList[6] }}</div>
                            </div>
                            <div class="formItem">
                                <div>{{ vegeList[7] }}</div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="taskPoint">
                    <div>4. 植物测试</div>
                    <el-input v-model="part4" type="textarea" />
                </div>
                <div class="taskPoint">
                    <div>5. 土壤实习点与土壤类型的高程关系</div>
                    <el-input v-model="part4" type="textarea" />
                </div>
                <div class="taskPoint">
                    <div>6. 多时相遥感图像判读结果</div>
                    <el-input v-model="part5" type="textarea" />
                </div>
                <div class="taskPoint">
                    <div>7. 土壤剖面观察虚拟仿真操作结果</div>
                    <div class="form">
                        <el-table :data="tableData2" border style="width: 100%">
                            <el-table-column prop="quiz" label="题目" width="320" />
                            <el-table-column prop="answer" label="您的回答" />
                            <el-table-column prop="res" label="正确/错误" />
                        </el-table>
                    </div>
                </div>
                <div class="taskPoint">
                    <div>8. 实验心得</div>
                    <el-input v-model="part7" type="textarea" />
                </div>
                <div style="margin: 20px 0;">
                    <el-button>提交</el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { storedata } from "../store/didaixing";
const data1 = storedata();
const { userID, vegeList } = data1;
const stuID = (userID === '') ? '' : (userID + '的学号')

import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const tableData = [
    {
        type: '竹林',
        latl: vegeList[0],
        lath: vegeList[1],
    },
    {
        type: '常绿阔叶林',
        latl: vegeList[2],
        lath: vegeList[3],
    },
    {
        type: '常绿落叶阔叶林',
        latl: vegeList[4],
        lath: vegeList[5],
    },
    {
        type: '落叶阔叶林',
        latl: vegeList[6],
        lath: vegeList[7],
    },
]

const tableData2 = [
    {
        quiz: '采集纸盒标本时，采集的顺序是',
        answer: '',
        res: '',
    },
    {
        quiz: '观测土壤颜色',
        answer: '',
        res: '',
    },
    {
        quiz: '判断土壤质地',
        answer: '',
        res: '',
    },
    {
        quiz: '判断土壤结构',
        answer: '',
        res: '',
    },
    {
        quiz: '判断土壤松紧度',
        answer: '',
        res: '',
    },
    {
        quiz: '判断土壤干湿度',
        answer: '',
        res: '',
    },
    {
        quiz: '观察每层土壤根系数量',
        answer: '',
        res: '',
    },
    {
        quiz: '测定土壤pH值',
        answer: '',
        res: '',
    },
]
// const submitUpload = () => {
//     uploadRef.value!.submit()
// }

let part4 = ref('')
let part5 = ref('')
let part7 = ref('')

</script>

<style lang="scss" scoped>
:deep(.el-textarea) {
    margin-top: 15px;
    width: 100%;
}

.page {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .report {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 68%;
        background-color: white;

        .title {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 20px;
            margin: 30px 0 20px 0;
        }

        .userInfo {
            width: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            font-size: 18px;
            margin-bottom: 30px;
        }

        .content {
            display: flex;
            flex-direction: column;
            width: 70%;
            height: 100%;

            .taskPoint {
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                align-items: start;

                .form {
                    width: 100%;
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    margin-top: 15px
                }

                // .form {
                //     width: 19vw;
                //     // height: 28.5vh;
                //     top: calc(10vh + 15px);
                //     left: calc(16vw + 65px);
                //     padding: 20px 20px 15px 15px;

                //     display: flex;
                //     flex-direction: column;
                //     justify-content: space-between;
                //     align-items: center;

                //     .formRow {
                //         width: 100%;
                //         display: flex;
                //         flex-direction: row;
                //         // align-content: space-between;
                //         justify-content: space-between;
                //         align-items: center;
                //         font-size: 16px;
                //         padding-bottom: 15px;

                //         .formItem {
                //             width: 33%;

                //             :deep(.el-input) {
                //                 width: 80%;
                //             }
                //         }
                //     }

                //     .formRow.Title {
                //         font-size: 18px;
                //         font-weight: bold;
                //     }
                // }
            }
        }
    }
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.upload-demo {
    width: 100%;
    margin-top: 15px;
    text-align: left;

    button {
        margin-left: 8px;
    }
}
</style>