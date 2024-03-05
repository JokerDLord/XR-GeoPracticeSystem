<template>
  <div style="background-color: rgba(53, 53, 53, 0.966);position: absolute;z-index: 99;width: 84vw;height: 90vh;" v-if="boxShow">
    <el-button style="position: absolute;z-index: 999;right: 5px;top: 5px;padding: 10px;" @click="boxClose">
      <el-icon size="20">
        <Close />
      </el-icon>
    </el-button>
    <swiper :msg="MSG"></swiper>
  </div>
  <div class="header">
    <p class="headline">
      天目山主要植物介绍
    </p>
    <p class="mainintro">
      天目山地处中亚热带北缘向北亚热带的过渡边缘，气候温暖湿润，雨量充沛，自然条件优越，拥有区系成分复杂、种群丰富的生物资源和独特的环境资源，形成了较为稳定的自然生态系统。其植被类型垂直分布明显，海拔由低到高依次为常绿阔叶林、常绿落叶阔叶混交林、高大柳杉林、山顶矮林，此外还有竹林和人工杉木林在此分布。实习过程中着重观察了阔叶林、针阔叶混交林、针叶林、竹林、竹阔混交林以及落叶矮林。
    </p>
  </div>
  <el-container>
    <el-header>
      <el-select placeholder="搜索" filterable v-model="selectText" @change="changeSelect">
        <el-option-group v-for="group in selectOption" :label="group.label">
          <el-option v-for="item in group.options" :label="item.name" :value="item.id"></el-option>
        </el-option-group>
      </el-select>
    </el-header>
    <el-main>
      <div v-cloak class="listTable" v-for="listColIdx in listCol" v-show="tableShow || listColIdx == nowIdx">
        <el-table :data="dataList.filter((i) => (i.id - listColIdx + 1) % listCol === 0)" :row-class-name="tableRowClassName">
          <el-table-column>
            <template #default="scope">
              <div @click="boxClick(scope.row)">
                <img v-for="pic in scope.row.image" :src="'http://139.9.165.59:8080/wjk/植物图片/plantintro/'+pic" style="width: 100%;height: 100%;object-fit: contain;">
                <p style="margin: 20px;">{{ scope.row.content }}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>

      </div>
      
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { selectOption } from '../assets/js/selectOption.js'
import { dataList } from '../assets/js/dataList.js'

import swiper from '../components/swiper.vue';

import { onMounted, ref } from 'vue'

import { Close } from '@element-plus/icons-vue'
let selectText = ref('')
const listCol = ref(3)
const loading = ref(true)
let tableShow = ref(true)
let nowIdx = ref(0)
let boxShow = ref(false)
let MSG = ref(0)

const changeSelect = () => {
  tableShow.value = (Number(selectText.value) == -1)
  nowIdx.value = Number(selectText.value) % 3 + 1
  console.log(nowIdx.value)
  console.log(tableShow.value)
  console.log(selectText.value)
}

const tableRowClassName = (row: any) => {
  if ((row.row.id != selectText.value) && (Number(selectText.value) != -1) && (String(selectText.value).length != 0)) {
      return 'hidden_row'
  }
  return ''
}

const boxClick = (res:any) => {
  boxShow.value = true
  MSG.value = Number(res.id)
  // console.log(res.id)
}

const boxClose = () => {
  boxShow.value = false
}

onMounted(()=>{
  setTimeout(() => {
    loading.value = false
    
  }, 1000);
})

</script>

<style lang="scss" scoped>
.header {
  width: 64vw;
  margin: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .headline {
    margin-top: 40px;
    margin-bottom: 35px;
    font-size: 34px;
    letter-spacing: 8px;
    font-weight: bold;
  }
  .mainintro {
    text-align: justify;
    line-height: 28px;
    font-size: 20px;
    letter-spacing: 0.5px;
    color: #405061;
  }
}

.el-container {
  width: 64vw;
  margin-left: 10vw;

  .el-header {
    margin-top: 10px;
    text-align: left;
    padding: 0;

    :deep(.el-select) {
      .el-input {
        font-size: 16px;
      }
      .el-input__wrapper {
        padding: 0 15px;
        height: 4.5vh;
        width: 8vw;
      }
    }
  }

  .el-main {
    padding: 0;
    display: flex;
    justify-content: space-between;

    .listTable {
      width: 31%;
    }

    :deep(.el-table) {
      --el-table-border: 0;
      --el-table-border-color: none;
      --el-table-bg-color: #e5e5e5;

      .el-table__body {
        --el-table-row-hover-bg-color: #e5e5e5;
        -webkit-border-vertical-spacing: 3vh;
      }

      .el-table__header-wrapper {
        height: 0;
      }

      .el-table__cell {
        padding: 0;
        cursor: pointer;

        .cell {
          padding: 0;
        }
      }

      .hidden_row {
        display: none;
      }
    }
  }
}

// .el-main {
//   padding: 0;
//   width: 66vw;
//   // margin-left: 8vw;
//   display: flex;
//   flex-direction: row;

//   // .listTable {
//   //   margin-left: 2vw;
//   // }

//   :deep(.el-table) {

//     .hidden_row {
//       display: none;
//     }
    
//     .el-table__header-wrapper {
//       height: 0;
//     }
//   }
//   .listTable {
//     width: 30%;
//   }
// }
</style>