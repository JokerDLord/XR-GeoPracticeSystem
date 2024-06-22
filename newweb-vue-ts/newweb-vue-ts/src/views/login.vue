<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="header">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="用户名" class="input-item" v-model="id">
                <input type="password" name="password" placeholder="密码" class="input-item" v-model="psw">
                <div class="btn" @click="login()">登录</div>
                <!-- <router-link tag="a" target="_blank" to="/test">第一种新窗口打开页面</router-link> -->
            </div>
            <div class="msg">
                没有帐户？
                <a href="#">去注册</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

// import { storeToRefs } from 'pinia';
import { storedata } from "../store/didaixing";
const data1 = storedata();
// let { userID, userPSW } = storeToRefs(data1)

const router = useRouter()

let id = ref('')
let psw = ref('')


const login = () => {
    if (id.value === '' || psw.value === '') {
        ElMessage.error('用户名和密码不能为空！')
    }
    else {
        data1.userID = id.value
        data1.userPSW = psw.value
        router.push({
            path: '/test'
        })
    }
}
</script>

<style lang="scss" scoped>
/* 更多请关注CSDN博主-拄杖盲学轻声码 */
* {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
}

body {
    height: 100%;
}

.container {
    height: 100%;
    background-image: url("/bgimg/tms.png");
    background-position: 50% 50%;
    background-size: cover;
    // background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.login-wrapper {
    background-color: #ffffffe5;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item:placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #8ab88c, #c5c49f);
    color: #fff;
    cursor: pointer;
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}
</style>