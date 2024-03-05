<template>
  <div>
    <div id="headline">
      <p>天目山植物小测试</p>
    </div>
    <div id="main">
      <div v-for="(quiz, index) of state.quizList">
        <el-row>
          <p class="quizTitle">{{ index + 1 }}. {{ quiz.Q }}</p>
        </el-row>
        <el-radio-group v-model="state.radioList[index]" @input="select(index, $event, quiz.A)" class="quizTable">
          <el-row>
            <el-radio :disabled="indexCheck[index]" label="0"
              :class="{ answerRight: indexCheck[index] && quizCheck[index], answerWrong: indexCheck[index] && !quizCheck[index] }">{{
                quiz.O1 }}</el-radio>
          </el-row>
          <el-row>
            <el-radio :disabled="indexCheck[index]" label="1"
              :class="{ answerRight: indexCheck[index] && quizCheck[index], answerWrong: indexCheck[index] && !quizCheck[index] }">{{
                quiz.O2 }}</el-radio>
          </el-row>
          <el-row>
            <el-radio :disabled="indexCheck[index]" label="2" :class="{
              answerRight: indexCheck[index] && quizCheck[index], answerWrong: indexCheck[index] && !quizCheck[index]
            }">{{
  quiz.O3 }}</el-radio>
          </el-row>
          <el-row>
            <el-radio :disabled="indexCheck[index]" label="3"
              :class="{ answerRight: indexCheck[index] && quizCheck[index], answerWrong: indexCheck[index] && !quizCheck[index] }">{{
                quiz.O4 }}</el-radio>
          </el-row>
        </el-radio-group>
        <el-row>
          <p class="answerHint" v-show="indexCheck[index]">正确答案: {{ optionList[Number(quiz.A)] }}</p>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { quizList } from '../assets/js/quizList.js'
import { Ref, reactive, ref } from 'vue'

// 这里只是用ts的写法限制一下quiz数组中元素的类型 
type quiztype = {
  Q: string;
  O1: string;
  O2: string;
  O3: string;
  O4: string;
  A: string;
}

let idxList: number[] = []
let quizList2: quiztype[] = []
while (idxList.length < 5) {
  let randomNum = Math.floor(Math.random() * 10)
  if (!idxList.includes(randomNum)) {
    idxList.push(randomNum)
    quizList2.push(quizList[randomNum])
  }
}

//数据用ref或者reactive都行 这里只是两种都试一试
const indexCheck: Ref<boolean[]> = ref([false, false, false, false, false])
const quizCheck: Ref<boolean[]> = ref([false, false, false, false, false])
const optionList = ref(['A', 'B', 'C', 'D'])

const state = reactive({
  radioList: ['', '', '', '', ''],
  quizList: quizList2,
})

const select = (quizIdx: number, optionIdx: any, A: string):void => {
  indexCheck.value[quizIdx] = true
  quizCheck.value[quizIdx] = (optionIdx.target._value == A)
  console.log(optionIdx);
  console.log(A);
}

</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

#headline {
  margin-top: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  letter-spacing: 8px;
  font-weight: bold;
}

#main {
  margin-left: 24%;
  margin-right: 24%;
  // width: 70%;
  // left: 50%;
  // transform: translateX(-50%);
  margin-bottom: 40px;

  /* 题目 */
  .quizTitle {
    font-size: 22px;
    letter-spacing: 1px;
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: justify;
  }

  /* 选项 */
  .quizTable {
    margin-left: 15px;
  }

  /* 提示 */
  .answerHint {
    font-size: 18px;
    color: green;
    letter-spacing: 1px;
    margin-left: 35px;
    margin-top: 3px;
    margin-bottom: 2px;
  }
}

:deep(.el-radio) {
  margin-bottom: 5px;
}

:deep(.el-radio-group) {
  display: table-row-group;
}

:deep(.el-radio .el-radio__inner) {
  width: 20px;
  height: 20px;
}

:deep(.el-radio .el-radio__inner::after) {
  width: 6px;
  height: 6px;
}

:deep(.el-radio__input.is-disabled.is-checked .el-radio__inner::after) {
  background-color: white;
}

:deep(.el-radio .el-radio__label) {
  font-size: 20px;
  padding-left: 14px;
  letter-spacing: 1px;
}

/* 正确答案 */
:deep(.el-radio.answerRight.is-checked .el-radio__label) {
  color: green !important;
}

:deep(.el-radio.answerRight.is-checked .el-radio__inner) {
  border-color: green !important;
  background-color: green !important;
}

/* 错误答案 */
:deep(.el-radio.answerWrong.is-checked .el-radio__label) {
  color: red !important;
}

:deep(.el-radio.answerWrong.is-checked .el-radio__inner) {
  border-color: red !important;
  background-color: red !important;
}
</style>