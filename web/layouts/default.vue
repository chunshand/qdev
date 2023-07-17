<template>
    <el-config-provider>
        <el-container>
            <el-header>
                <LayoutHeader />
            </el-header>
            <el-main>
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :offset="6">
                        <div class="w-full py-2">
                            <NuxtPage></NuxtPage>
                        </div>
                    </el-col>
                </el-row>
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

<style lang="scss" scoped></style>