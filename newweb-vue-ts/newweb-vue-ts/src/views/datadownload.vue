<template>
  <div id="main">
    <div id="headline">
      <p>数据下载</p>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light-intro">点击下载，进入geoscene源中下载即可</div>
      </el-col>
    </el-row>
    <div></div>
    <!-- <div v-for="(quiz, index) of quizList"> -->
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="table-title grid-content bg-purple">数据</div>
        </el-col>
        <el-col :span="12">
          <div class="table-title grid-content bg-purple-light">Geoscene源</div>
        </el-col>
      </el-row>
    </div>

    <div v-for="datat of state.datalst" style="margin: 10px 0 0 0;">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple table-title">{{ datat.dataname }}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="cursor: pointer;" @click="openWindow(datat.datahref)">下载</div>
        </el-col>
      </el-row>
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
  datalst: [
    { dataname: '地标点', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=0ea768802aab4dc0a00ae06ca6b8e30c' },
    { dataname: '地貌实习点', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=d42fbca6b3fa45bf89f719f2c0e331ce' },
    { dataname: '植被实习点', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=280d0536681b4e15bb62d14f38435e4d' },
    { dataname: '土壤实习点', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=25e6008954a1427d9ca1bbab07f7201e' },
    { dataname: '沟谷线', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=0f9605135d154273b38d7a647bbc197a' },
    { dataname: '等高线', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=e0eb5beb470f4a9e982a6fd494426527' },
    { dataname: '植被分布', datahref: 'https://www.geosceneonline.cn/geoscene/webapps/item?id=14690b81c67947ce8b4d8705ecab62ac' },
  ]
})

const openWindow = (weburl: string) => {
  window.open(weburl)
}

</script>

<style lang="scss" scoped>
// 不规范scss写法 有待更改
* {
  margin: 0;
  padding: 0;
}

#headline {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  letter-spacing: 8px;
  font-weight: bold;
}

#main {
  width: 60%;
  top: 5%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap; */
}

.el-row {
  display: flex;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-purple-light {
  background: #e5e9f2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-purple-light-intro {
  background: #e5e9f2;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  margin: 20px 0 10px 0;
}

.content-down {
  cursor: pointer;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.table-title {
  font-size: 18px;
  font-weight: bold;
}
</style>