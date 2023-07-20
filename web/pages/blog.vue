<template>
    <div class="w-full flex justify-center">
        <div class="container flex flex-wrap">
            <template v-for="item in data.data.list" :key="item.id">
                <NuxtLink :to="'/blog-details/' + item.id"
                    class="decoration-none outline-none box-border p-[16px] w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[25%] ">
                    <div class=" shadow-md p-[16px] flex items-start cursor-pointer   w-full box-border !hover:bg-[#eee] transition">
                        <el-image :src="item.cover" v-if="item.cover" class="w-[156px] h-[96px] border-rd-[4px]"></el-image>
                        <div class="w-full flex flex-col h-[96px] text-left box-border pl-[8px] py-[4px]">
                            <el-text class="!self-start font-600 !mb-[8px]">{{ item.title }}</el-text>
                            <el-text class="!self-start !mb-[4px]">发布人：{{ item.createUser.userInfo.nickname }}</el-text>
                            <el-text class="!self-start">发布时间：{{ item.createTime }}</el-text>
                        </div>
                    </div>
                </NuxtLink>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const { data }: any = await useArticleList({ currentPage: 1, pageSize: 5 })
console.log(data);
onMounted(() => {
    console.log('mounted!')
})
</script>
<style lang="scss" scoped></style>