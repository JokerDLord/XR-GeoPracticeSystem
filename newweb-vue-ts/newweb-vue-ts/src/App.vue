<script setup lang="ts">
import {
  Search,
  Compass,
  Ship,
  Guide,
  Grape,
  Menu as IconMenu,
  Location,
  PictureFilled,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside class="main_aside">
          <el-row class="tac">
            <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical"
              text-color="#fff" @open="handleOpen" @close="handleClose">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <location />
                  </el-icon>
                  <span>平台基础信息</span>
                </template>

                <el-menu-item index="/home">平台介绍</el-menu-item>
                <el-menu-item index="/operation">平台操作步骤</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <Search />
                  </el-icon>
                  <span>认识实习区域</span>
                </template>
                <el-menu-item index="2-1">实习区基本情况</el-menu-item>
                <el-menu-item index="2-2">实习点概览</el-menu-item>
                <el-menu-item index="2-3">实习区域漫游</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <Compass />
                  </el-icon>
                  <span>地质与地貌</span>
                </template>
                <el-menu-item index="3-1">地质地貌概况</el-menu-item>
                <el-menu-item index="3-2">杭州市地质图概览</el-menu-item>
                <el-menu-item index="3-3">教学教学内容</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon>
                    <Ship />
                  </el-icon>
                  <span>水文教学</span>
                </template>
                <el-menu-item index="4-1">水文概况</el-menu-item>
                <el-menu-item index="4-2">流域绘制</el-menu-item>
                <el-menu-item index="4-3">流速仪介绍与使用</el-menu-item>
                <el-menu-item index="4-4">实习教学内容</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon>
                    <Guide />
                  </el-icon>
                  <span>土壤教学</span>
                </template>
                <el-menu-item index="5-1">土壤概况</el-menu-item>
                <el-menu-item index="5-2">土壤剖面观察</el-menu-item>
                <el-menu-item index="5-3">实习教学内容</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="6">
                <template #title>
                  <el-icon>
                    <Grape />
                  </el-icon>
                  <span>认识植物</span>
                </template>
                <el-menu-item index="6-1">天目山植物概况</el-menu-item>
                <el-menu-item index="6-2">植被样方调查</el-menu-item>
                <el-menu-item index="/plantquiz">植物小测试</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="7">
                <template #title>
                  <el-icon>
                    <PictureFilled />
                  </el-icon>
                  <span>遥感与GIS教学</span>
                </template>
                <el-menu-item index="7-1">多时相遥感图像</el-menu-item>
                <el-menu-item index="7-2">小程序GIS应用</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="/datadownload">
                <el-icon><icon-menu /></el-icon>
                <span>平台及实习数据下载</span>
              </el-menu-item>
            </el-menu>

          </el-row>
        </el-aside>
        <el-container class="right_aside">
          <el-main class="main_content">
            <router-view />
          </el-main>
          <el-footer class="main_footer">Copyright©️华东师范大学 地理科学学院</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  .el-header {
    width: 100%;
    height: 12vh;
    // position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    background: url(./assets/image/index/logo_white.png) no-repeat transparent;
    z-index: 999;
  }

  .el-container {
    width: 100%;
    // height: 88vh;
    // position: absolute;
    // top: 12vh;
    display: flex;


    .main_aside {
      // color: var(--el-text-color-primary);
      color: $font-color-gray;
      // background: var(--el-color-primary-light-8);
      background: $back-color-gray;
      // position: absolute;
      height: 88vh;
      top: 12vh;
      left: 0;
      width: 16vw;

      .el-menu-vertical {
        position: absolute;
        height: 88vh;
        width: 16vw;
      }
    }

    .right_aside {
      height: 88vh;
      overflow-y: auto;

      .main_content {
        background-color: rgb(229, 229, 229);
        // overflow-y: auto;
        overflow: visible;
        padding: 0;
        margin: 0;
      }

      .main_footer {
        display: flex;
        align-items: center;
        height: 4vh;
        color: rgb(160, 160, 160);
        font-size: 10px;
      }
    }

  }
}
</style>
