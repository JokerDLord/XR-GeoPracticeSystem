<template>
    <swiper2 :content="content"></swiper2>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router"
    import { practice_photosurl } from "../assets/js/photo_url_addpressts";
    import swiper2 from '../components/swiper2.vue';

    const route = useRoute()
    let name = route.query.name
    // @ts-ignore
    const content = practice_photosurl[name]
    // console.log(practice_photosurl)
</script>

<style lang="scss" scoped></style>