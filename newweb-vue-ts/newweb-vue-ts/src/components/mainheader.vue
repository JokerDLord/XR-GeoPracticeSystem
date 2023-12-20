<template>
    <div class="main_header">
        <div class="ecnu">
            <img src="/mainheader/ecnu.png"/>
        </div>
        <div class="geo">
            <img src="/mainheader/geo.png"/>
        </div>
        <div class="title">
            <img src="/mainheader/title.png"/>
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
</template>

<script setup lang="ts">
    
    // const getImageUrl = (name:any) => {
    //     return new URL(`${name}`, import.meta.url).href
    // }

</script>

<style lang="scss" scoped>
.main_header {
    height: 100%;
    background-color: $header-color-gray;
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

</style>