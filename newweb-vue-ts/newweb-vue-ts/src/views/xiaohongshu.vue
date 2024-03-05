<template>
    <swiper2 :content="content"></swiper2>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { practice_photosurl } from "../assets/js/photo_url_addpressts";
import swiper2 from '../components/swiper2.vue';

const route = useRoute()
let name1 = route.query.name1
let name2 = route.query.name2
let name3 = route.query.name3
// @ts-ignore
const content = practice_photosurl[name1][name2][name3]

console.log(content)
</script>

<style lang="scss" scoped></style>