<template>
    <div class="pageBox">
      <div class="items">
        <div class="megText">
          <p>
            实习内容：
  
            1）通过比对或卷帘方式分析不同年份、相同季节（如1990年10月和2005年10月）遥感图像上土地覆盖的变化，并在实验报告中填写。
  
            2）通过比对或卷帘方式分析同一年份、不同季节（如2019年5月和2019年12月）遥感图像上土地覆盖的变化，并在实验报告中填写。
          </p>
        </div>
        <div class="wayChange">
          <el-button type="danger" :plain="swipePlain" @click="change2swipe()">卷帘式</el-button>
          <el-button type="danger" :plain="secPlain" @click="change2sec()">对照式</el-button>
        </div>
        <div class="checkList">
          <el-select placeholder="1990年10月" v-model="valueleft" size="large" @change="timeChange()">
            <el-option v-for="item in timeSeries" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select placeholder="1990年10月" v-model="valueright" size="large" @change="timeChange()">
            <el-option v-for="item in timeSeries" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="mapBox">
        <div class="swipe" :style="{ display: mapShow[mapFlag] }">
          <div id="viewDiv"></div>
        </div>
        <div class="sec" :style="{ display: mapShow[mapFlag^1] }">
          <div id="viewDivLeft"></div>
          <div id="viewDivRight"></div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  
  import { onMounted, ref, Ref } from 'vue'
  import Map from "@geoscene/core/Map";
  import MapView from "@geoscene/core/views/MapView";
  import ImageryLayer from "@geoscene/core/layers/ImageryLayer";
  import Swipe from "@geoscene/core/widgets/Swipe";
  
  let mapFlag = ref(0)
  let mapShow: Ref<string[]> = ref(['flex', 'none'])
  
  let map = new Map();
  let view = new MapView();
  let viewLeft = new MapView();
  let viewRight = new MapView();
  
  let valueleft = ref('e85dfd664c7b4b7db47a49a9bef5abb9')
  let valueright = ref('e85dfd664c7b4b7db47a49a9bef5abb9')
  
  let leftfrared
  let rightInfrared
  let swipe
  
  const timeSeries = [
    {
      label: '1990年10月',
      value: 'e85dfd664c7b4b7db47a49a9bef5abb9'
    },
    {
      label: '1995年01月',
      value: '4b191ac1ca3d437d87e3a426ba96ba88'
    },
    {
      label: '2000年07月',
      value: '98dd57f868a5453482d5d362074450dd'
    },
    {
      label: '2005年10月',
      value: 'd291d689abb24a42bae88bff59642138'
    },
    {
      label: '2010年05月',
      value: 'bae059053a844d22a62a433e566aeb86'
    },
    {
      label: '2015年10月',
      value: '6a8fe8bbf66843d48d69e8cfdef79fdd'
    },
    {
      label: '2019年04月',
      value: 'acdc191ce8b94256a6e196f85f8617a1'
    },
    {
      label: '2019年05月',
      value: 'b6012b9ff9da46a9bc65fe342e658e46'
    },
    {
      label: '2019年10月',
      value: '2033b6a5118741478c6205a7f471c43b'
    },
    {
      label: '2019年12月',
      value: 'e32fcc6d029646e9be35b7f368f4e905'
    },
    {
      label: '2020年02月',
      value: 'd9f146b647f7454ea2cd31e9c439e30e'
    }
  ]
  
  const timeChange = () => {
    if (mapFlag.value === 0) {
      initswipemap()
    } else {
      initsecmap()
    }
  }
  
  let swipePlain = ref(false)
  let secPlain = ref(true)
  
  const change2swipe = () => {
    if (swipePlain.value != false) {
      swipePlain.value = false
      secPlain.value = true
      mapFlag.value = 1 ^ mapFlag.value
      valueleft = ref('e85dfd664c7b4b7db47a49a9bef5abb9')
      valueright = ref('e85dfd664c7b4b7db47a49a9bef5abb9')
      initswipemap()
    }
  }
  
  const change2sec = () => {
    if (secPlain.value != false) {
      swipePlain.value = true
      secPlain.value = false
      mapFlag.value = 1 ^ mapFlag.value
      valueleft = ref('e85dfd664c7b4b7db47a49a9bef5abb9')
      valueright = ref('e85dfd664c7b4b7db47a49a9bef5abb9')
      initsecmap()
    }
  }
  
  const initswipemap = () => {
    map = new Map({});
    view = new MapView({
      container: "viewDiv",
      map: map,
      center: [119.43099, 30.327],
      scale: 50000
    });
    view.ui.remove('attribution')
    leftfrared = new ImageryLayer({
      portalItem: {
        id: valueleft.value
      },
    });
    map.add(leftfrared)
    rightInfrared = new ImageryLayer({
      portalItem: {
        id: valueright.value
      },
    });
    map.add(rightInfrared)
    swipe = new Swipe({
      leadingLayers: [leftfrared,],
      trailingLayers: [rightInfrared,],
      position: 50,
      view: view
    });
    view.ui.add(swipe);
  }
  
  const initsecmap = () => {
    const imgLeft = new ImageryLayer({
      portalItem: {
        id: valueleft.value
      }
    });
    const imgRight = new ImageryLayer({
      portalItem: {
        id: valueright.value
      }
    });
  
    viewLeft = new MapView({
      container: "viewDivLeft",
      map: new Map({
        layers: [imgLeft]
      }),
      center: [119.43099, 30.327],
      scale: 50000
    });
    viewLeft.ui.remove('attribution')
    viewRight = new MapView({
      container: "viewDivRight",
      map: new Map({
        layers: [imgRight]
      }),
      center: [119.43099, 30.327],
      scale: 50000
    });
    viewRight.ui.remove('attribution')
  }
  
  
  onMounted(async () => {
    initswipemap()
  })
  </script>
  
  <style lang="scss" scoped>
  p {
    padding: 0;
    margin: 0;
  }
  
  .pageBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  
    .items {
      height: 5%;
      padding: 20px;
      display: flex;
      justify-content: center;
  
      .checkList {
        width: 45vw;
        display: flex;
        justify-content: space-between;
      }
  
      .megText {
        left: calc(16vw + 20px);
        width: 13vw;
        text-align: justify;
        background-color: rgb(255, 255, 255);
        padding: 15px 25px;
        position: absolute;
        z-index: 999;
        border-radius: 8px;
      }
  
      .wayChange {
        position: absolute;
        z-index: 999;
        left: calc(16vw + 20px);
        bottom: calc(4vh + 25px);
        display: flex;
        justify-content: space-evenly;
        width: calc(13vw + 50px);
  
        .el-button {
          height: 40px;
          width: 100px;
          font-size: 16px;
          letter-spacing: 3px;
          --el-button-hover-bg-color: #f56c6c;
          --el-button-hover-border-color: #f56c6c;
        }
  
        .el-button+.el-button {
          margin-left: 0;
        }
      }
    }
  
    .mapBox {
      flex: 1;
      padding-bottom: 10px;
      height: 100%;
      width: 45vw;
  
      .swipe {
        box-sizing: border-box;
        border: solid #ff0000;
        height: 100%;
        width: 100%;
  
        #viewDiv {
          height: 100%;
          width: 100%;
        }
      }
  
      .sec {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border: solid #ff0000;
  
        #viewDivLeft {
          height: 100%;
          width: 100%;
        }
  
        #viewDivRight {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  </style>

  