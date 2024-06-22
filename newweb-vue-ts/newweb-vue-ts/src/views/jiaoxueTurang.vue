<template>
    <div style="padding: 0 10% 0 10%;">
        <div class="title1" style="letter-spacing: 4px;">
            <p><b>—</b>&nbsp;土壤实习教学内容&nbsp;<b>—</b></p>
        </div>
        <div class="bgwhite">
            <div class="title2">土壤野外实习</div>
            <div class="content2">
                <div class="text">
                    <p>
                        土壤地理野外实习是土壤地理教学环节中的重要组成部分，本地区的土壤实习的主要内容包括：了解中亚热带<b>土壤的形成、性质及分布规律</b>、学习和掌握<b>土壤剖面</b>的选点、观察、描述、记载以及土壤标本与样品的采集，调查总结杭州地区土壤资源类型、利用现状以及问题分析。其中土壤调查与剖面观察方法是实习的重点内容，我们将学习并掌握剖面选取与挖掘的原则与方法，学会野外土壤剖面观察与记录的重点特征，掌握<b>土壤特征与理化性质</b>（包括分层、颜色、质地、结构、松紧度、干湿度、侵入体等等）的判断方法并准确描述与记录。
                    </p>
                    <p>
                        本实习的土壤剖面主要包括画眉山庄、红庙、开山老殿三处。
                    </p>
                </div>
                <div class="imgdiv">
                    <el-image style="width: 40%;" class="img" src="http://139.9.165.59:8080/ECNUTMS_newnew/dist/jiaoxueTurang/1.jpg" fit="contain"
                        :preview-src-list="Array('http://139.9.165.59:8080/ECNUTMS_newnew/dist/jiaoxueTurang/1.jpg')" />
                </div>
            </div>
        </div>
        <div>
            <div class="content2" style="background-color: rgb(224, 224, 224);padding-left: 80px;font-weight: bold;">
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
    // background-image: url("/introdimao/title1.jpg");
    // background-position: 50% 25%;
    // background-size: cover;
    height: 15vh;
}

.bgwhite {
    // margin-bottom: 40px;
    background-color: white;
    padding: 5% 10%;
}

.bgdark {
    // margin-bottom: 40px;
    background-color: rgb(224, 224, 224);
    ;
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
        width: 65%;
        margin-right: 5%;
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
            width: 50%;
            // width: 60%;
        }
    }
}
</style>