<template>
    <!-- <router-view style="position: absolute;z-index: 99;width: 80vw;height: 80vh;background-color: white;"/> -->
    <!-- <swiper2 :siteIntro="siteIntro"></swiper2> -->
    <div style="display: flex;flex-direction: column;">
        <el-button v-for="site in Object.entries(practice_photosurl)" @click="btnClick(site[0])">{{ site[0] }}</el-button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from "vue-router"
    // import { ref } from 'vue'
    // import { ref } from "vue";
    import { practice_photosurl } from "../assets/js/photo_url_addpressts";
    // import swiper2 from '../components/swiper2.vue';
    // const url='chanyuansi'
    const router = useRouter()
    // let siteIntro = ref(null)

    // let boxShow = ref(false)
    const btnClick = (res : string) => {
        let queryName:string = res
        router.push({
            path: '/xiaohongshu',
            query: {
                name: queryName
            }
        })
        // boxShow.value = !boxShow.value
        // siteIntro.value = res
        // console.log(res)
    }
</script>

<style lang="scss" scoped>

</style>