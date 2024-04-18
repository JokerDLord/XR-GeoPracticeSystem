<template>
    <div id="viewDiv">
        <div id="layerList" :style="{ width: '280px', display: divShowList[0] }"></div>
        <div id="basemapGallery" :style="{ width: '280px', display: divShowList[1] }"></div>
        <div id="tab" v-show="tabShow">
            <el-menu class="tabMenu" @select="tabSelect">
                <el-menu-item index="0" class="tabMenuItem" title="图层">
                    <el-icon style="margin: 0;">
                        <CopyDocument />
                    </el-icon>
                </el-menu-item>
                <el-menu-item index="1" class="tabMenuItem" title="底图">
                    <el-icon style="margin: 0;">
                        <Grid />
                    </el-icon>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script setup lang="ts">

import WebScene from '@geoscene/core/WebScene';
import SceneView from '@geoscene/core/views/SceneView';
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery';
import LayerList from '@geoscene/core/widgets/LayerList';
import { Ref, onMounted, ref } from 'vue';
import { CopyDocument, Grid } from '@element-plus/icons-vue'

let customID = 'f1fd55b9163e44f999308958c71a15c5'
const webmap = new WebScene({
    portalItem: {
        id: customID
    }
});

let tabShow = ref(true)
let divShowList: Ref<string[]> = ref(['none', 'none', 'none'])
let switchList: Ref<boolean[]> = ref([false, false, false])

const tabSelect = (index: string) => {
    let flag = switchList.value[Number(index)]
    divShowList.value = ['none', 'none', 'none']
    switchList.value = [false, false, false]
    divShowList.value[Number(index)] = !flag ? 'block' : 'none'
    switchList.value[Number(index)] = !flag
}


onMounted(async () => {
    const view = new SceneView({
        container: "viewDiv",
        map: webmap,
    });
    const layerList = new LayerList({
        view: view,
        container: 'layerList',
        visible: true,
        //图例
        listItemCreatedFunction: function (event) {
            const item = event.item;
            if (item.layer.type != "group") {
                // 确保同组下的图层不会重复显示
                item.panel = {
                    content: "legend",
                    open: false
                };
            }
        },
    });
    view.ui.add(layerList, "top-right");
    // 底图
    let basemapGallery = new BasemapGallery({
        view: view,
        container: "basemapGallery"
    });
    view.ui.add(basemapGallery, "top-right");
})
</script>

<style lang="scss" scoped>
#viewDiv {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    position: relative;
}

#basemapGalleryDiv {
    height: 400px;
    width: 300px;
}

#tab {
    position: absolute;
    z-index: 999;
    width: 32px;
    height: 100px;
    right: 15px;
    top: 15px;
    display: flex;
    flex-direction: column;

    :deep(.el-menu-item.is-active) {
        color: #303133;
    }

    .tabMenu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .tabMenuItem {
        padding: 0;
        margin: 0;
        height: 32px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

#basemapGallery {
    display: flex;
    flex-direction: column;
}

:deep(.geoscene-ui-corner-container) {
    inset: 15px 55px 30px 15px !important;
}
</style>