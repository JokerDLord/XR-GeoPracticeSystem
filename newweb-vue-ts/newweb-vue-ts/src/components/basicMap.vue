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
        <div class="watershedBox" :style="{ display: props.params[1] }">
            <div @click="huizhi()">
                <el-button style="font-size: 17px; height: 40px; width: 106px">
                    {{ drawMeg }}
                </el-button>
            </div>
            <div class="areaBox" v-show="areaBoxShow">
                <p><b>面积</b>&emsp;{{ drawArea }}</p>
                <p><b>单位</b>&emsp;{{ areaUnit }}</p>
            </div>
        </div>
        <div class="megBox" :style="{ display: props.params[0] }">
            <div class="btn1" @click="changeMeg()" :style="{ display: megShowStyle[showFlag] }">
                <el-icon>
                    <ArrowUpBold />
                </el-icon>
            </div>
            <div class="megContent" :style="{ display: megShowStyle[1 ^ showFlag] }">
                <div class="btn2" @click="changeMeg()">
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </div>
                <div class="megText">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import WebScene from "@geoscene/core/WebScene";
import SceneView from "@geoscene/core/views/SceneView";
import LayerList from "@geoscene/core/widgets/LayerList";
import BasemapGallery from "@geoscene/core/widgets/BasemapGallery";
import SketchViewModel from "@geoscene/core/widgets/Sketch/SketchViewModel";
import AreaMeasurementAnalysis from "@geoscene/core/analysis/AreaMeasurementAnalysis";
import GraphicsLayer from "@geoscene/core/layers/GraphicsLayer";

// import { defineEmits } from 'vue';

import { CopyDocument, Grid, ArrowUpBold, ArrowRightBold } from '@element-plus/icons-vue'
import { onMounted } from "vue";
import { ref, Ref } from 'vue'

let tabShow = ref(true)

const dimao = async ()=>{
    view.ui.empty('top-left')
    tabShow.value=false
    console.log(webmap)
    webmap.allLayers.items = webmap.layers.items[1]
    // console.log(webmap.layers.items)
    console.log(webmap.layers.items)

    // webmap.layers.items[4].visible=false
}

const props = defineProps({
    params: Array()
})

let customID = 'd56bbe8e4b5e446da4bc08fcf3d0b1fb'

let divShowList: Ref<string[]> = ref(['none', 'none', 'none'])
let switchList: Ref<boolean[]> = ref([false, false, false])

let showFlag = ref(1)
let megShowStyle: Ref<string[]> = ref(['flex', 'none'])

const changeMeg = () => {
    showFlag.value = 1 ^ showFlag.value
}

const webmap = new WebScene({
    portalItem: {
        id: customID
    }
});

const tabSelect = (index: string) => {
    let flag = switchList.value[Number(index)]
    divShowList.value = ['none', 'none', 'none']
    switchList.value = [false, false, false]
    divShowList.value[Number(index)] = !flag ? 'block' : 'none'
    switchList.value[Number(index)] = !flag
}

let view = ref<any>(new SceneView({}))
let areaMeasurement: any
let gLayer = new GraphicsLayer({})
let sketchVM: SketchViewModel
let drawArea = ref('')
let areaUnit = ref('')
let areaBoxShow = ref(false)
let res: any
let drawMeg = ref('开始绘制')

const huizhi = async () => {
    gLayer.removeAll()
    drawMeg.value = '新绘制'
    drawArea.value = ''
    areaUnit.value = ''
    areaBoxShow.value = true
    sketchVM.create('polygon')
    sketchVM.on("create", async function (event) {
        if (event.state === "complete") {
            areaMeasurement = new AreaMeasurementAnalysis({
                geometry: event.graphic.geometry,
                visible: false
            });
            view.analyses.add(areaMeasurement);
            res = await view.whenAnalysisView(areaMeasurement)
            drawArea.value = res.result.area.value.toString().match(/^\d+(?:\.\d{0,3})?/)[0]
            areaUnit.value = res.result.area.unit
        }
    });
    sketchVM.on("update", async function (event) {
        if (event.toolEventInfo.type === "reshape-stop" || event.toolEventInfo.type === "scale-stop") {
            areaMeasurement = new AreaMeasurementAnalysis({
                geometry: event.graphics[0].geometry,
                visible: false
            });
            view.analyses.add(areaMeasurement);
            let res: any
            res = await view.whenAnalysisView(areaMeasurement)
            drawArea.value = res.result.area.value.toString().match(/^\d+(?:\.\d{0,3})?/)[0]
            areaUnit.value = res.result.area.unit
        }
    });
    sketchVM.on("delete", async function () {
        gLayer.removeAll()
        drawMeg.value = '开始绘制'
        drawArea.value = ''
        areaUnit.value = ''
        areaBoxShow.value = false
    });
}


// const a = ref("fdsafew5785");
defineExpose({
    view,
    dimao
});



// const emit = defineEmits(['getfromchild'])
// emit('getfromchild', view)
// const emit = defineEmits(['sayHello'])
// emit("sayHello",ref('12312321'));
// const emit = defineEmits(['child-click'])
// const ziChuanFu = () => {
//     emit('child-click', 1)
// }

onMounted(async () => {
    view = new SceneView({
        container: "viewDiv",
        map: webmap,
    });
    // 图层
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
    view.ui.remove('attribution')
    gLayer = new GraphicsLayer({
        elevationInfo: {
            mode: "relative-to-ground" // default value
        }
    });

    // const emit = defineEmits<{
    //     (event: 'sayHello', id)
    //     // (event: 'update', id: number): void
    // }>()
    // emit('sayHello', view)
    gLayer.title = "绘制流域范围";
    const blue = [82, 82, 122, 1];
    const white = [255, 255, 255, 0.8];
    const extrudedPolygon = {
        type: "polygon-3d",
        symbolLayers: [
            {
                type: "extrude",
                size: 20, // extrude by 10 meters
                material: {
                    color: white
                },
                edges: {
                    type: "solid",
                    size: "4px",
                    color: blue
                }
            }
        ]
    };
    webmap.layers.add(gLayer);
    sketchVM = new SketchViewModel({
        layer: gLayer,
        view: view,
        polygonSymbol: extrudedPolygon
    });
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

.megBox {
    opacity: 0.8;
    position: absolute;
    z-index: 999;
    right: 2px;
    bottom: 3px;
    // padding: 5px;
    // width: 100px;
    // height: 100px;
    // background-color: rgb(255, 255, 255);

    .btn1 {
        background-color: #d6d6d6;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .megContent {
        // background-color: white;
        display: flex;
        flex-direction: row;
        width: 280px;

        .btn2 {
            background-color: #d6d6d6;
            width: 30px;
            height: 33px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .megText {
            flex: 1;
            background-color: white;
            padding: 10px 18px;
            text-align: justify;

            p {
                margin: 0;
            }
        }

    }
}

.watershedBox {
    position: absolute;
    z-index: 999;
    left: 70px;
    top: 15px;
    display: flex;
    flex-direction: column;
    align-items: start;

    .areaBox {
        p {
            margin: 0;
        }

        padding: 15px 20px;
        margin-top: 15px;
        height: 70px;
        width: 170px;
        background-color: #ffffffe8;
        border-radius: 5px;
        text-align: left;
        line-height: 2em;
    }
}
</style>