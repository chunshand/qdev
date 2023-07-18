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
                    <el-button type="primary" @click="openModalLoginAndReg('login')" v-if="appConfig?.openLogin">登录</el-button>
                    <el-button @click="openModalLoginAndReg('reg')" v-if="appConfig?.openReg">注册</el-button>
                </el-space>
                <template v-else>
                    <el-dropdown @command="handleCommand">
                        <el-space class="cursor-pointer">
                            <el-avatar :src="user.avatar ?? ''"></el-avatar>
                            <el-text class="text-2">{{ user.nickname ?? "" }}</el-text>
                        </el-space>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
                                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </div>
        </div>
    </div>
    <ModalLoginAndReg ref="ModalLoginAndRegRef" />
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
const route = useRoute()
const user = useUser()
const appConfig = useWebAppConigState()

const active_path = route.path
const handleSelect = (index: string) => {
    navigateTo(index);
}
const ModalLoginAndRegRef = ref()
const openModalLoginAndReg = (state: string) => {
    console.log("open");
    ModalLoginAndRegRef.value.open(state)
}
const handleCommand = (command: string) => {
    switch (command) {
        case "userInfo":

            break;
        case "loginOut":
            useLoginOut();
            break;
        default:
            break;
    }
}
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
    border-bottom: none;
}
</style>