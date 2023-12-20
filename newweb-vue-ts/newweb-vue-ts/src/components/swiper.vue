<template>
    <Swiper :navigation="true" :loop="true" :modules="modules" :thumbs="{ swiper: thumbsSwiper }" class="s1">
      <swiper-slide v-for="rec in dataList.slice(Number(props.msg)).concat(dataList.slice(0,Number(props.msg)))" style="display: flex;align-items: center;justify-content: space-between;">
        <!-- <el-button style="margin-left: 100px;" @click="cda(rec)"></el-button> -->
        <!-- <p>{{ props.msg }}</p> -->
        <div style="width: 50%;">
          <img :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/'+rec.image" style="margin-left: 3vw;"/>
        </div>
        <div style="width: 45%;">
          <p style="color: white;margin-right: 3vw;font-size: 20px;text-align: justify;">{{ rec.content }}</p>
        </div>
      </swiper-slide>
    </Swiper>
  
    <Swiper watchSlidesProgress :modules="modules" :slidesPerView="6" :loop="true" :freeMode="true" class="s2" @swiper="setThumbsSwiper">
      <swiper-slide v-for="rec in dataList.slice(Number(props.msg)).concat(dataList.slice(0,Number(props.msg)))">
        <img :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/'+rec.image"/>
      </swiper-slide>
    </Swiper>
  
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
  .s1 {
    height: 75vh;
  
    :deep(.swiper-button-prev) {
      color: white;
    }
    :deep(.swiper-button-next) {
      color: white;
    }
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .s2 {
    margin-top: 2vh;
    height: 13vh;
  
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
  </style>