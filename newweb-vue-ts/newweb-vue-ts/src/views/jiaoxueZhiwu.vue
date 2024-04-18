<template>
    <div style="padding: 0 10% 0 10%;">

        <div class="titlemap">
            <basicMap ref="childDom" :params="params"></basicMap>
        </div>
        <div class="title1" style="letter-spacing: 4px;">
            <p><b>—</b>&nbsp;植物实习教学内容&nbsp;<b>—</b></p>
        </div>
        <div id="1" class="bgwhite">
            <div class="title2">象鼻山—植物类型考察</div>
            <div class="content2">
                <div class="text">
                    <p>
                        象鼻山拥有保留比较完好的原生常绿阔叶林，同时保留了地带性的基岩和土壤，优势种（建群种）是青冈。登山沿途可见倒伏之后被村民锯掉，重新从根部萌发的次生林。在山顶可以观察到青冈的自疏现象。实习内容包括了解象鼻山处的环境及植物特点，以及观察与识别蔷薇花园至象鼻山沿途的各类植物，在实习过程中，我们将学习并实践野外识别植物的基本方法“<b>望闻问切法</b>”。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image style="width: 55%;" class="img" src="public/jiaoxueZhiwu/1.jpg" fit="contain"
                        :preview-src-list="Array('public/jiaoxueZhiwu/1.jpg')" />
                </div>
            </div>
        </div>
        <div id="2" class="bgdark">
            <div class="title2">禅源寺—植被样方调查</div>
            <div class="content2">
                <div class="text">
                    <p>
                        样方调查是野外开展植物群落调查的一种常用方法。植物群落样方法实习的第一个地点在天目山禅源寺东南侧的一处常绿阔叶林中，在实习过程中，我们将学习并实践<b>样方法</b>，了解如何适当的设置样方，学会生物多样性和群落组成分析的方法。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image class="img" src="public/jiaoxueZhiwu/2.jpg" fit="contain"
                        :preview-src-list="Array('public/jiaoxueZhiwu/2.jpg')" />
                    <el-image class="img" src="public/jiaoxueZhiwu/3.jpg" fit="contain"
                        :preview-src-list="Array('public/jiaoxueZhiwu/3.jpg')" />
                </div>
            </div>
        </div>
        <div id="3" class="bgwhite">
            <div class="title2">三里亭—植被样方调查</div>
            <div class="content2">
                <div class="text">
                    <p>
                        第二处样方法的实习在天目山三里亭的针阔叶混交林样地中，在实习过程中我们将巩固样方法的植物群落野外调查方法，观察并记录各种群特征，并与禅源寺处的样方作比较，对比两处植物的高度、生长状况等，并分析相关原因。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image class="img" src="public/jiaoxueZhiwu/4.jpg" fit="contain"
                        :preview-src-list="Array('public/jiaoxueZhiwu/4.jpg')" />
                </div>
            </div>
        </div>
        <div id="5">
            <div class="content2" style="background-color: white;padding-left: 80px;font-weight: bold;">
                <div class="text">
                    <p>
                        其他实习任务以老师安排为准。
                    </p>
                </div>
                <div class="imgdiv">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import basicMap from '../components/basicMap.vue';

let params = reactive(['none', 'none'])

const childDom = ref(null)
// console.log(childDom.value)

onMounted(() => {
    childDom.value.dimao()
})


// const res = ref(null)
// // console.log(res)

// // const x = ref('')
// const setMap = (res: { ui: { remove: (arg0: string) => void; }; }) => {
//     res.ui.remove("compass")
//     console.log(res)
// }

</script>

<style lang="scss" scoped>
.title1 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #213547;
    background-color: rgb(219, 219, 219);
    // text-align: left;
    line-height: 2;
    font-size: 44px;
    font-weight: bold;
    // margin-bottom: 30px;
    padding: 0 10%;
    // background-color: rgb(197, 197, 197);
    // background-image: url("public/introdimao/title1.jpg");
    // background-position: 50% 25%;
    // background-size: cover;
    height: 15vh;
}

.titlemap {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // color: white;
    // text-align: left;
    line-height: 2;
    font-size: 40px;
    font-weight: bold;
    // margin-bottom: 30px;
    // padding: 0 10%;
    // background-color: rgb(197, 197, 197);

    height: 35vh;
}

.title11 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    // text-align: left;
    line-height: 2;
    font-size: 40px;
    font-weight: bold;
    // margin-bottom: 30px;
    padding: 0 10%;
    // background-color: rgb(197, 197, 197);
    background-image: url("public/introdimao/title3.jpg");
    background-position: 50% 40%;
    background-size: cover;
    height: 30vh;
}

.bgwhite {
    // margin-bottom: 40px;
    background-color: white;
    padding: 5% 10%;
}

.bgdark {
    // margin-bottom: 40px;
    background-color: rgb(224, 224, 224);;
    padding: 5% 10%;
}

.title2 {
    text-align: left;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 3px;
}

.content1 {
    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
        text-align: justify;
        font-size: 18px;
        text-indent: 2em;
        width: 60%;
        margin-right: 6%;
    }

    .imgdiv {
        flex: 1;

        .img {
            width: 100%;
        }
    }
}

.content2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text {
        text-align: justify;
        font-size: 18px;
        text-indent: 2em;
        width: 100%;
    }

    .imgdiv {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;

        // flex: 1;
        .img {
            width: 45%;
            // width: 60%;
        }
    }
}
</style>