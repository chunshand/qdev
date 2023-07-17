<template>
    <el-row class="“" justify="center">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-row>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <div class="w-full h-full flex flex-items-center">
                        <el-text>Qdev</el-text>
                    </div>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <div class="w-full h-full flex flex-items-center flex-justify-between">
                        <el-menu mode="horizontal" :default-active="active_path" class="border-none flex-shrink-0 w-xl"
                            @select="handleSelect">
                            <el-menu-item index="/">首页</el-menu-item>
                            <el-menu-item index="/blog">博客</el-menu-item>
                            <el-menu-item index="/about">关于</el-menu-item>
                        </el-menu>
                        <el-space>
                            <el-button type="primary" @click="handleLoginAndReg">登录</el-button>
                            <el-button @click="handleLoginAndReg">注册</el-button>
                        </el-space>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <modal-login-and-reg></modal-login-and-reg>
</template>

<script lang="ts" setup>
const route = useRoute()
const active_path = route.path
const handleSelect = (index: string) => {
    navigateTo(index);
}
/**
 * 打开登录注册弹窗
 */
const handleLoginAndReg = () => {

}
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
    border-bottom: none;
}
</style>