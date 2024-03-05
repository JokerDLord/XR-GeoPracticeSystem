<template>
    <div class="pageBox">
        <div v-for="key, value in Object.entries(practice_photosurl)" :class="'keyBox' + value % 2">
            <div class="keyName">
                <p>{{ key[0] }}</p>
            </div>
            <div class="siteBox">
                <div class="siteBtn">
                    <el-button v-for="site, idx in practice_photosurl[key[0]]"
                        @click="btnClick(key[0], idx, Object.keys(site)[0])">
                        {{ Object.keys(site)[0] }}
                    </el-button>
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
    margin: 0;
    padding: 0;
}

.pageBox {
    display: flex;
    align-items: center;
    flex-direction: column;

    .keyBox0 {
        padding-bottom: 30px;
        background-color: white;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .keyName {
            display: flex;
            align-items: start;
            width: 70%;
            line-height: 2;
            letter-spacing: 2px;
            font-size: 28px;
            font-weight: bold;
            margin-top: 30px;
        }

        .siteBox {
            display: flex;
            align-items: start;
            width: 70%;

            .siteBtn {
                display: inline-block;
                text-align: justify;

                :deep(.el-button) {
                    font-size: 16px;
                    padding: 0;
                    margin-right: 25px;
                    --el-button-bg-color: none;
                    --el-button-hover-bg-color: none;
                    --el-button-text-color: rgb(179, 179, 179);
                    --el-button-hover-text-color: rgb(58, 58, 58);
                    border: none;
                }

                .el-button+.el-button {
                    margin: 0;
                    margin-right: 25px;
                }
            }
        }
    }

    .keyBox1 {
        padding-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .keyName {
            display: flex;
            align-items: start;
            width: 70%;
            line-height: 2;
            letter-spacing: 2px;
            font-size: 28px;
            font-weight: bold;
            margin-top: 30px;
        }

        .siteBox {
            display: flex;
            align-items: start;
            width: 70%;

            .siteBtn {
                display: inline-block;
                text-align: justify;

                :deep(.el-button) {
                    font-size: 16px;
                    padding: 0;
                    margin-right: 25px;
                    --el-button-bg-color: none;
                    --el-button-hover-bg-color: none;
                    --el-button-hover-text-color: rgb(173, 173, 173);
                    border: none;
                }

                .el-button+.el-button {
                    margin: 0;
                    margin-right: 25px;
                }
            }
        }
    }
}
</style>