<template>
    <div class="Box">
        <video src="../assets/video/landuse_change.mp4" controls>您的浏览器不支持。</video>

        <!--<button type="button" style="text-align: center;" onclick="launchFullScreen(document.getElementById('video'))">全屏</button>-->
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.Box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
        width: 65%;
    }
}
</style>