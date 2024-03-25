<template>
    <el-image-viewer v-if="imgViewerVisible" @close="imgClose()" :url-list="imgList" />
    <div class="main1">
        <div class="main2">
            <Swiper :navigation="true" :loop="false" :modules="modules" :thumbs="{ swiper: thumbsSwiper }"
                class="slide1">
                <swiper-slide v-for="site in props.content" class="slide">
                    <div class="slider-container">
                        <div class="left-container">
                            <el-image :src="'http://139.9.165.59:8080/tms/photos-2023/' + site.photourl_compressed"
                                fit="contain" loading="lazy" style="width: 100%; height: 100%;cursor: pointer;"
                                @click="imgZoom(site)">
                                <template #placeholder>
                                    <div class="image-slot">
                                        <!-- <el-image src="../assets/image/loading.png"></el-image> -->
                                    </div>
                                </template>
                            </el-image>
                        </div>
                        <div class="right-container">
                            <div class="title">
                                <p class="swiper-no-swiping">{{ site.title }}</p>
                            </div>
                            <div class="subtitle">
                                <p class="swiper-no-swiping">{{ site.subtitle }}</p>
                            </div>
                            <div class="intro">
                                <p class="swiper-no-swiping">{{ site.intro }}</p>
                            </div>
                            <div class="timestamp">
                                <p class="swiper-no-swiping">{{ site.photo_time }}</p>
                            </div>
                            <div class="extraInfo">
                                <el-link :underline="false" :href="site.extrainfo" :disabled="site.extrainfo == ''"
                                    target="_blank">了解更多</el-link>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </Swiper>
            <div class="thumb-container">
                <Swiper watchSlidesProgress :modules="modules" :slidesPerView="4" :loop="false" :freeMode="true"
                    class="slide2" @swiper="setThumbsSwiper" space-between="7">
                    <swiper-slide v-for="site in props.content">
                        <el-image :src="'http://139.9.165.59:8080/tms/photos-2023/' + site.photourl_compressed"
                            loading="lazy" style="cursor: pointer;"></el-image>
                    </swiper-slide>
                </Swiper>
                <!-- <p>这是缩略图</p> -->
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { practice_photosurl } from "../assets/js/photo_url";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// import { defineProps } from 'vue';

import 'swiper/css'
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

let imgViewerVisible = ref(false)
let imgList = ref(Array())

const imgZoom = (site: any) => {
    imgViewerVisible.value = true
    imgList.value = Array('http://139.9.165.59:8080/tms/photos-2023/' + site.photourl_compressed)
    // imgRaw.value = 'http://139.9.165.59:8080/tms/photos-2023/' + site.photourl;
    // zoomIf.value = true;

};

const imgClose = () => {
    imgViewerVisible.value = false
};

const props = defineProps({
    content: null,
})

const modules = [FreeMode, Navigation, Thumbs]

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper;
};

// const getImageUrl = (name:any) => {
//     return new URL(`${name}`, import.meta.url).href
// }
</script>

<style lang="scss" scoped>
.imgZoom {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(44, 44, 44, 0.756);
    display: flex;
    justify-content: center;
    align-items: center;
}

// :deep(.swiper-wrapper) {
//     transform: none !important;
// }

.main1 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main2 {
    // background-color: rgb(68, 9, 9);
    border-radius: 20px;
    overflow: hidden;
    width: 70%;
    height: 75vh;
}

.slide1 {
    height: 60vh;

    :deep(.swiper-button-prev) {
        color: rgb(0, 0, 0);
    }

    :deep(.swiper-button-next) {
        color: rgb(0, 0, 0);
    }

    :deep(.swiper-button-prev:after) {
        font-size: 22px !important;
    }

    :deep(.swiper-button-next:after) {
        font-size: 22px !important;
    }

    :deep(.swiper-button-prev.swiper-button-disabled) {
        opacity: 0;
    }

    :deep(.swiper-button-next.swiper-button-disabled) {
        opacity: 0;
    }

    :deep(.swiper-button-next) {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        background-color: #d0d0d097;

        &:hover {
            background-color: #d0d0d0f1;
        }
    }

    :deep(.swiper-button-prev) {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        background-color: #d0d0d0a9;

        &:hover {
            background-color: #d0d0d0f1;
        }
    }
}

.slider-container {
    height: 100%;
    background-color: rgb(41, 94, 76);
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    // width: 50vw;
    // height: 70vh;
}

:deep(.el-image__wrapper) {
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-container {
    background-color: rgb(240, 240, 240);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65%;

    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        background-image: url(../assets/image/loading.png);
        background-size: cover;

        // transform:rotate(360deg);
        // transition:transform 1s linear;
        animation: changeright 3.5s linear infinite;
    }
}

.right-container {
    p {
        margin: 0;
    }

    width: 35%;
    background-color: rgb(250, 250, 250);
    display: flex;
    flex-direction: column;
    align-items: start;
    // justify-content: center;

    .title {
        font-weight: 600;
        font-size: 20px;
        margin-left: 1.5vw;
        margin-right: 1.5vw;
        margin-top: 3vh;
    }

    .subtitle {
        font-size: 17px;
        margin-left: 1.5vw;
        margin-right: 1.5vw;
        margin-top: 0.8vh;
    }

    .intro {
        font-size: 14px;
        margin-right: 1.5vw;
        margin-left: 1.5vw;
        margin-top: 3vh;
        text-align: justify;
    }

    .timestamp {
        font-size: 12px;
        margin-right: 1.5vw;
        margin-left: 1.5vw;
        margin-top: 0.5vh;
        line-height: 200%;
        color: rgba(51, 51, 51, 0.6);
    }

    .extraInfo {
        margin-left: 1.5vw;
        line-height: 120%;
        position: absolute;
        bottom: 1.5vh;
        right: 1.5vw;

        :deep(.el-link) {
            font-size: 12px;
            --el-link-text-color: #1f59bc;
            --el-link-hover-text-color: rgb(155, 155, 155);
        }
    }
}

.thumb-container {
    height: 15vh;
    padding-top: 0.8vh;
    padding-bottom: 0.8vh;
    // padding: 1vh;
    background-color: rgb(39, 39, 39);
}

.slide2 {
    height: 13.4vh;

    .swiper-slide {
        width: 45%;
        opacity: 0.3;
    }

    .swiper-slide-thumb-active {
        opacity: 1;
    }

    .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}


@keyframes changeright {

    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>