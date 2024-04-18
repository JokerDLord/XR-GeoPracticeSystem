<template>
  <div class="main1">
    <div class="main2" @click.stop="console.log('内层被点击')">
      <Swiper :navigation="true" :loop="true" :modules="modules" :thumbs="{ swiper: thumbsSwiper }" class="slide1">
        <swiper-slide v-for="rec in dataList.slice(Number(props.msg)).concat(dataList.slice(0, Number(props.msg)))"
          class="slide">
          <div class="slider-container">
            <div class="left-container">
              <img :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/' + rec.image" />
            </div>
            <div class="right-container">
              <div class="title">
                <p class="swiper-no-swiping">{{ rec.name }}</p>
              </div>
              <div class="subtitle">
                <p class="swiper-no-swiping">{{ rec.species }}</p>
              </div>
              <div class="intro">
                <p class="swiper-no-swiping">{{ rec.content2 }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </Swiper>

      <Swiper watchSlidesProgress :modules="modules" :slidesPerView="5" :loop="true" :freeMode="true" class="slide2"
        @swiper="setThumbsSwiper" space-between="5">
        <swiper-slide v-for="rec in dataList.slice(Number(props.msg)).concat(dataList.slice(0, Number(props.msg)))" >
          <el-image :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/' + rec.image" loading="lazy"
            style="cursor: pointer;"></el-image>
          <!-- <img :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/' + rec.image" object-fit="cover" /> -->
        </swiper-slide>
      </Swiper>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from "vue";
import { dataList } from '../assets/js/dataList.js';
// import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import 'swiper/css'
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const props = defineProps({
  msg: Number,
})

const thumbsSwiper = ref(null);
const modules = [FreeMode, Navigation, Thumbs]

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

// const getImageUrl = (name:any) => {
//   return new URL(`${name}`, import.meta.url).href
// }


// const cda = (rec:any) => {
//   console.log(dataList.slice(Number(props.msg)).concat(dataList.slice(0,Number(props.msg))))
//   console.log(rec)
//   console.log(props.msg)
// }
</script>

<style lang="scss" scoped>
// style="display: flex;align-items: center;justify-content: space-between;"
// <img :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/' + rec.image" style="margin-left: 3vw;" />
// <p style="color: white;margin-right: 3vw;font-size: 20px;text-align: justify;">{{ rec.content }}</p>
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

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

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

.left-container {
  background-color: rgb(240, 240, 240);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
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
}

.slide2 {
  height: 15vh;
  // padding-bottom: 2px;
  background-color: rgb(247, 247, 247);

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


// .s1 {
//   // height: 75vh;

//   :deep(.swiper-button-prev) {
//     color: white;
//   }

//   :deep(.swiper-button-next) {
//     color: white;
//   }

//   .swiper-slide img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//   }
// }

// .s2 {
//   // margin-top: 2vh;
//   // height: 13vh;

//   .swiper-slide {
//     width: 45%;
//     opacity: 0.3;
//   }

//   .swiper-slide-thumb-active {
//     opacity: 1;
//   }

//   .swiper-slide img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//   }
// }</style>