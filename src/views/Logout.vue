<template>
    <h1>正在退出系统... </h1>
</template>

<script>
export default {
    created(){
        localStorage.clear('token');//清除本地存储的token
        localStorage.clear('id');//清除本地存储的id
        localStorage.clear('name');
        this.$router.push('/');//跳转至登录页面
    }
}
</script>