<template>
    <div class="page">
        <div class="box">
            <div v-for="key, value in Object.entries(practice_photosurl)" :class="'boxtest i' + value">
                <div class="keyName">
                    <p>{{ key[0] }}</p>
                </div>
                <div class="siteBox">
                    <div :class="'siteBtn a' + value">
                        <el-button link v-for="site, idx in practice_photosurl[key[0]]"
                            @click="btnClick(key[0], idx, Object.keys(site)[0])">
                            {{ Object.keys(site)[0] }}
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { practice_photosurl } from "../assets/js/photo_url_addpressts";

const router = useRouter()

const btnClick = (key1: string, idx: number, key2: string) => {
    let queryName1: string = key1
    let queryName2: number = idx
    let queryName3: string = key2

    router.push({
        path: '/xiaohongshu',
        query: {
            name1: queryName1,
            name2: queryName2,
            name3: queryName3
        }
    })
}
</script>

<style lang="scss" scoped>
p {
    margin: 0 !important;
}

.page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box {
    width: 97%;
    height: 96%;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(2, 50%);
    justify-content: space-between;
}

.boxtest {
    margin: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 18px;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, .08);
    transition: all .3s cubic-bezier(0, 0, .5, 1);
    overflow: hidden;

    &:hover {
        transform: scale(1.02) translate3d(0, 0, 0);
        transition: all .3s cubic-bezier(0, 0, .5, 1);
    }
}

.boxtest.i0 {
    background-image: url("/gallery/1.JPG");
    background-position: 20% 0%;
    background-size: cover;
}

.boxtest.i1 {
    background-image: url("/gallery/2.jpg");
    background-position: 80% 30%;
    background-size: cover;
}

.boxtest.i2 {
    background-image: url("/gallery/3.jpg");
    background-position: 90% 30%;
    background-size: cover;
}

.boxtest.i3 {
    background-image: url("/gallery/4.jpg");
    background-position: 60% 10%;
    background-size: cover;
}

.boxtest.i4 {
    background-image: url("/gallery/5.jpg");
    background-position: 60% 90%;
    background-size: cover;
}

.boxtest.i5 {
    background-image: url("/gallery/6.jpg");
    background-position: 80% 80%;
    background-size: cover;
}

.boxtest.i6 {
    background-image: url("/gallery/7.jpg");
    background-position: 40% 100%;
    background-size: cover;
}

.boxtest.i1 {
    grid-column-start: span 2;
}

.keyName {
    letter-spacing: 3px;
    font-size: 26px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    justify-content: start;
    margin-left: 35px;
    margin-top: 25px;
}

.siteBox {
    height: 30%;
    width: auto;
    background-color: rgb(255, 255, 255);
    overflow-y: auto;

    .siteBtn {
        display: flex;
        flex-direction: row;
        align-items: start;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 20px;

        :deep(.el-button) {
            font-size: 15px;
            margin-right: 20px;
            margin-bottom: 10px;
        }

        .el-button+.el-button {
            margin: 0;
            margin-right: 20px;
            margin-bottom: 10px;
        }
    }
}
</style>