<template>
    <div class="headerBox">
        <div class="main_header">
            <div class="ecnu">
                <img src="/mainheader/ecnu.png" />
            </div>
            <div class="geo">
                <img src="/mainheader/geo.png" />
            </div>
            <div class="title">
                <img src="/mainheader/title.png" />
            </div>
            <div class="txt">
                地理学野外综合实习教学辅助平台
            </div>
            <!-- <el-row :gutter="8" style="margin-right: 0;">
            <el-col :span="1">
                <el-image src="/mainheader/ecnu.png"/>
            </el-col>
            <el-col :span="1">
                <el-image src="/mainheader/geo.png"/>
            </el-col>
            <el-col :span="4">
                <el-image src="/mainheader/title.png"/>
            </el-col>
            <el-col :span="6">
                <el-text>地理学野外综合实习教学辅助平台</el-text>
            </el-col>
        </el-row> -->
        </div>
        <div class="loginBox">
            <!-- <div>
                <button @click="login()">
                    登录
                </button>
            </div> -->
            <div class="touxiang">
                <img src="public\bgimg\touxiang.jpg">
                <div>mayflies</div>
            </div>
            <!-- <div>
                <router-link tag="a" target="_blank" to="/login">第一种新窗口打开页面</router-link>
            </div> -->
        </div>
    </div>

</template>

<script setup lang="ts">

// const getImageUrl = (name:any) => {
//     return new URL(`${name}`, import.meta.url).href
// }

import { useRouter } from "vue-router"
const router = useRouter()

const login = () => {
    router.push({
        path: '/login',
    })
}


</script>

<style lang="scss" scoped>
.headerBox {
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: $header-color-gray;

    .main_header {
        height: 100%;
        width: 88%;
        padding-left: 1.5vw;

        display: flex;
        justify-content: start;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
        }

        .ecnu {
            height: 8.7vh;
        }

        .geo {
            height: 12vh;
        }

        .title {
            width: 15vw;
            margin-left: 0.5vw;
        }

        .txt {
            color: rgb(0, 0, 0);
            font-size: 1.2vw;
            margin-top: 2vh;
            letter-spacing: 0.1vw;
            margin-left: 1vw;
        }

        // .el-col {
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;

        //     .el-text {
        //         color: rgb(0, 0, 0);
        //         font-size: 1.5vw;
        //         margin-top: 2vh;
        //         letter-spacing: 0.1vw;
        //     }
        // }

    }

    .loginBox {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        color: rgb(16, 16, 39);

        .touxiang {
            width: 100%;
            // height: 70%;
            // border-radius: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;

            img {
                width: 30%;
                // height: 100%;
                border-radius: 50%;
                border: 2px solid rgb(35, 45, 78);
                object-fit: cover;
            }
        }
    }
}
</style>