<template>
    <div style="padding: 0 10% 0 10%;">

        <div class="titlemap">
            <basicMap ref="childDom" :params="params"></basicMap>
        </div>
        <div class="title1" style="letter-spacing: 4px;">
            <p><b>—</b>&nbsp;地质地貌实习教学内容&nbsp;<b>—</b></p>
        </div>
        <div id="1" class="bgwhite">
            <div class="title2">河流阶地与河流地貌</div>
            <div class="content2">
                <div class="text">
                    <p>
                        分水江河流阶地位于分水江水文站附近，该地由于村民采石，露出了河流阶地的剖面，因此可以在此地通过测量河岸中砾石的产状确定河流的大致流向。
                    </p>
                    <p>
                        洪水期早期，河流冲蚀岩石，形成冲蚀面。当洪水能量减弱时，河流带下的大量粗砂和砾石在此堆积。随着洪水能量进一步的减弱，带下的颗粒物的粒径递减，形成了下粗上细的结构。在大的颗粒物之间，由于水的流动，细小物质会进行填充。该地河流阶地剖面呈现出三个二元结构，由上到下依次为泥沙、小砾石、泥沙、小砾石、泥沙、小砾石、大砾石。由此可以推断该阶地形成过程中经历过三次大的洪水期。其中，最下面一层的砾石分选度较差，砾石直径大多2-5cm到10-15cm，呈现次棱角状，磨圆度差，并填充有少量泥沙。这种现象说明了此地砾石的搬运距离比较短，距离洪水发生的源头较近。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image style="width: 55%;" class="img" src="public/jiaoxueDimao/1.png" fit="contain"
                        :preview-src-list="Array('public/jiaoxueDimao/1.png')" />
                </div>
            </div>
        </div>
        <div id="2" class="bgdark">
            <div class="title2">河流阶地与河流地貌</div>
            <div class="content1">
                <div class="text">
                    <p>
                        九溪十八涧是一个包括集水盆、沟谷、冲积扇的完整小流域。九溪十八涧的形成是由于在它的源头龙井村一带形成了一个面积巨大的漏斗状盆地。在源头处有一集水盆，在坡面径流和重力的作用下，周壁不断遭到冲刷而后退，范围也随之扩大，经过溯源侵蚀到泥盆纪的石英砂岩。
                    </p>
                    <p>
                        沟谷主干规模较小，也以紫红色石英砂岩为主，溪流在谷地的左侧和右侧来回变动，主要是受到岩性和断裂构造的影响可以看到溪流从集水盆流出后经过月桂风，天马山，棋盘山等地断裂带的走向发生了剧烈的变化，溪流随着断裂带的走向流出，就形成了九溪十八涧左右摆动，蜿蜒曲折的格局。同时在某些地方还有跌水发育。九溪十八涧由南往北流入钱塘江，长约5千米，九溪之水发源于杨梅岭，途中汇集九条溪流，在溪中溪与十八涧汇合，整体呈
                        Y 字形。
                    </p>
                    <p>
                        在九溪十八涧河流地貌实习中，我们将沿着河流记录河流流向的改变，观察砾石磨圆度、分选度等特征变化。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image class="img" src="public/jiaoxueDimao/2.png" fit="contain"
                        :preview-src-list="Array('public/jiaoxueDimao/2.png')" />
                </div>
            </div>
        </div>
        <div id="3" class="bgwhite">
            <div class="title2">天目山岩性与地质构造考察</div>
            <div class="content1">
                <div class="text">
                    <p>
                        朱陀岭是九狮湖西侧的一处隆起，我们将测量朱陀岭东西两侧的产状，记录两处不同的岩层倾向。
                    </p>
                    <p>
                        第一处位于朱陀岭西侧，岩层走向为南西，为奥陶纪泥质灰岩，呈现灰黑色。点位周围存在沟谷，表明可能有断层。这是由于断层线周边的岩石相较于其它区域更为破碎，更容易被侵蚀，从而形成沟谷。
                    </p>
                    <p>
                        第二处位于朱陀岭东侧，朱陀岭水库附近，岩层走向为北西，为寒武纪西阳山组灰岩，主要为坚硬、抗风化能力强的硅质灰岩。厚的灰岩和薄的破碎的泥质灰岩以及黄色的泥岩周期排列，反映出晚寒武世海侵海退以及深水浅水沉积环境的反复交替。该剖面和另一侧的剖面倾向相差90°，属于走滑旋转断层，朱陀山属于单斜山。（仅供参考，具体情况以老师讲授及自己测量结果为准）
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image class="img" src="public/jiaoxueDimao/3.png" fit="contain"
                        :preview-src-list="Array('public/jiaoxueDimao/3.png')" />
                </div>
            </div>
        </div>
        <div id="4" class="bgdark">
            <div class="title2">喀斯特地貌</div>
            <div class="content2">
                <div class="text">
                    <p>
                        灵栖洞天位于浙江省杭州市建德市内，是一组奇丽的石灰岩溶洞景观，被誉为“地下艺术宫殿”。它地处浙西褶皱带的石屏向斜区内，由12个溶洞组成，对外开放了3个洞穴：灵泉洞、清风洞和霭云洞。其中灵泉洞位于底层，是一个正在发育的喀斯特水平地下洞穴，经历过一次构造抬升，是两层洞穴。在灵栖洞实习过程中，我们将观察丰富多样的喀斯特地貌，包括地下堆积地貌，如石钟乳、石笋、石幔、鹅管等，以及地表喀斯特地貌，并分析其形成过程。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image class="img" src="public/jiaoxueDimao/4.jpg" fit="contain"
                        :preview-src-list="Array('public/jiaoxueDimao/4.jpg')" />
                    <el-image class="img" src="public/jiaoxueDimao/5.jpg" fit="contain"
                        :preview-src-list="Array('public/jiaoxueDimao/5.jpg')" />
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
    background-color: rgb(224, 224, 224);
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