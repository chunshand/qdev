<template>
    <div class="fixed bg-white shadow-sm w-full left-0 top-0 z-1">
        <div class="flex items-center justify-center  h-[60px] ">
            <div class="container flex items-center justify-between h-fil">
                <div class="p-[16px] h-full flex items-center flex-shrink-0">
                    <el-button v-if="user" class="!block !md:hidden" :icon="Expand" @click="drawer = true"></el-button>
                    <NuxtLink to="/" class="decoration-none">
                        <el-text class="!pl-[4px]">Qdev Logo</el-text>
                    </NuxtLink>
                </div>
                <el-menu mode="horizontal" :default-active="route.path" @select="handleSelect"
                    class="w-[320px] !hidden !md:block">
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/blog">随笔</el-menu-item>
                    <el-menu-item index="/about">关于</el-menu-item>
                </el-menu>
                <div class="px-16px box-border">
                    <div v-if="!user">
                        <el-space class="!hidden !md:flex">
                            <el-button type="primary" @click="openModalLoginAndReg('login')"
                                v-if="appConfig?.openLogin">登录</el-button>
                            <el-button class="!hidden !md:block" @click="openModalLoginAndReg('reg')"
                                v-if="appConfig?.openReg">注册</el-button>
                        </el-space>
                        <el-button class="!block !md:hidden" :icon="Expand" @click="drawer = true"></el-button>
                    </div>
                    <template v-else>
                        <el-dropdown @command="handleCommand" trigger="click">
                            <el-space class="cursor-pointer">
                                <el-avatar :src="user.avatar ?? ''"></el-avatar>
                                <el-text class="!text-[16px]">{{ user.nickname ?? "" }}</el-text>
                            </el-space>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="userData">个人资料</el-dropdown-item>
                                    <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </div>

            </div>
        </div>
    </div>
    <el-drawer v-model="drawer" :with-header="false" size="auto" direction="ttb" append-to-body>
        <div>
            <NuxtLink to="/" @click="drawer = false" class="p-[16px] h-full flex items-center flex-shrink-0">
                <el-text>Qdev Logo</el-text>
            </NuxtLink>
        </div>
        <div class="w-full py-[16px]">
            <el-menu :default-active="route.path" @select="handleSelect" class="w-full">
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/blog">随笔</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
        </div>
        <div v-if="!user" class="w-full p-[16px]">
            <div class="w-full" v-if="appConfig?.openLogin">
                <el-button class="w-full" type="primary" @click="openModalLoginAndReg('login')" size="large">登录</el-button>
            </div>
            <div class="w-full pt-[16px]" v-if="appConfig?.openReg">
                <el-button class="w-full" @click="openModalLoginAndReg('reg')">注册</el-button>
            </div>
        </div>
    </el-drawer>
    <ModalLoginAndReg ref="ModalLoginAndRegRef" />
</template>

<script lang="ts" setup>
import { Expand } from "@element-plus/icons-vue";
import { onMounted } from "vue"
const route = useRoute()
const user = useUser()
const appConfig = useWebAppConigState()
const drawer = ref(false);

const handleSelect = (index: string) => {
    drawer.value = false;
    navigateTo(index);
}
const ModalLoginAndRegRef = ref()
const openModalLoginAndReg = (state: string) => {
    drawer.value = false;
    ModalLoginAndRegRef.value.open(state)
}
const handleCommand = (command: string) => {
    switch (command) {
        case "userData":
            navigateTo("/personal/userdata")
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