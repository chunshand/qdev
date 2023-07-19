<template>
    <div class="w-full flex justify-center">
        <div class="container">
            <div class=" shadow-md p-[16px] flex items-start cursor-pointer hover:-translate-y-[8px] transition transform-gpu" v-for="item in data.data.list" :key="item.id">
                <el-image :src="item.cover" v-if="item.cover" class="w-[120px] h-[96px]"></el-image>
                <div class="w-full flex flex-col h-[96px] text-left box-border pl-[8px] py-[4px]">
                    <el-text class="!self-start font-600 !mb-[8px]">{{item.title}}</el-text>
                    <el-text class="!self-start !mb-[4px]">发布人：{{item.createUser.userInfo.nickname}}</el-text>
                    <el-text class="!self-start">发布时间：{{item.createTime}}</el-text>
                </div>
            </div>
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
<style lang="scss" scoped>

</style>