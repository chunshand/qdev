<template>
    <div class="w-full flex justify-center">
        <div class="container">
            <div class="text-[32px] py-[16px] text-center">
                <p>{{ data.data.title }}</p>
            </div>
            <div class="flex justify-center">
                <el-space>
                    <el-avatar :src="data.data.createUser.userInfo.avatar" :size="24"></el-avatar>
                    <el-text>{{ data.data.createUser.userInfo.nickname }}</el-text>
                    <el-text>{{ data.data.createTime }}</el-text>
                </el-space>
            </div>
            <div class="w-full py-[16px]" v-if="data.data.cover">
                <el-image :src="data.data.cover" class="border-rd-[16px] cursor-pointer"></el-image>
            </div>
            <div class="py-[16px] box-border pt-[56px]">
                <div v-html="data.data.content"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data } = await useArticleDetails({ id: route.params.id });
</script>

<style lang="scss" scoped></style>