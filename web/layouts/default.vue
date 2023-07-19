<template>
    <el-config-provider>
        <el-container>
            <el-header>
                <LayoutHeader />
            </el-header>
            <el-main class="min-h-[960px]">
                <NuxtPage></NuxtPage>
            </el-main>
            <el-footer>
                <LayoutFooter />
            </el-footer>
        </el-container>
    </el-config-provider>
</template>

<script lang="ts" setup>
import LayoutHeader from "./components/header.vue";
import LayoutFooter from "./components/footer.vue";
</script>

<style lang="scss" scoped>
.el-header {
    padding: 0px;
}
</style>