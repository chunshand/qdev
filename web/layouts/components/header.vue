<template>
    <div class="fixed bg-white shadow-sm w-full left-0 top-0">
        <div class="flex items-center justify-center  h-[60px] ">
            <div class="container flex items-center justify-between h-fil">
                <el-text>Qdev Logo</el-text>
                <el-menu mode="horizontal" :default-active="active_path" @select="handleSelect" class="w-[320px]">
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/blog">博客</el-menu-item>
                    <el-menu-item index="/about">关于</el-menu-item>
                </el-menu>
                <el-space v-if="!user">
                    <el-button type="primary" @click="openModalLoginAndReg('login')">登录</el-button>
                    <el-button @click="openModalLoginAndReg('reg')">注册</el-button>
                </el-space>
                <el-space v-else>
                    <el-avatar :src="user?.avatar"></el-avatar>
                </el-space>
            </div>
        </div>
    </div>
    <ModalLoginAndReg ref="ModalLoginAndRegRef" />
</template>

<script lang="ts" setup>
const route = useRoute()
const user = useUser()

const active_path = route.path
const handleSelect = (index: string) => {
    navigateTo(index);
}
const ModalLoginAndRegRef = ref()
const openModalLoginAndReg = (state: string) => {
    console.log("open");
    ModalLoginAndRegRef.value.open(state)
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
    border-bottom: none;
}
</style>