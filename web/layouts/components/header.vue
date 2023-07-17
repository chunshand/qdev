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
                        <el-menu mode="horizontal" class="border-none flex-shrink-0">
                            <el-menu-item index="home">首页</el-menu-item>
                            <el-menu-item index="blog">博客</el-menu-item>
                            <el-menu-item index="about">关于</el-menu-item>
                        </el-menu>
                        <el-space>
                            <el-button type="primary">登录</el-button>
                            <el-button>注册</el-button>
                        </el-space>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
    border-bottom: none;
}
</style>