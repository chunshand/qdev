<template>
    <div class="w-full flex justify-center">
        <div class="container flex flex-wrap">
            <template v-for="item in list" :key="item.id">
                <NuxtLink :to="'/blog-details/' + item.id"
                    class="decoration-none outline-none box-border p-[16px] w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[25%] ">
                    <div
                        class=" shadow-md p-[16px] flex items-start cursor-pointer   w-full box-border !hover:bg-[#eee] transition">
                        <el-image :src="item.cover" v-if="item.cover" class="w-[156px] h-[96px] border-rd-[4px]"></el-image>
                        <div class="w-full flex flex-col h-[96px] text-left box-border pl-[8px] py-[4px]">
                            <el-text class="!self-start font-600 !mb-[8px]">{{ item.title }}</el-text>
                            <el-text class="!self-start !mb-[4px]">发布人：{{ item.createUser.userInfo.nickname }}</el-text>
                            <el-text class="!self-start">发布时间：{{ item.createTime }}</el-text>
                        </div>
                    </div>
                </NuxtLink>
            </template>
            <el-empty v-if="total == 0" description="暂无文章" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const useGetList = () => {
    const list = ref<any[]>([])
    const loading = ref<boolean>(false)
    const isEnd = ref<boolean>(false)
    const total = ref(1)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const handleNext = async () => {
        console.log(currentPage.value, loading.value, isEnd.value);

        if (loading.value) {
            return;
        }
        if (isEnd.value) {
            return;
        }
        loading.value = true;
        const { data }: any = await useArticleList({ currentPage: currentPage.value, pageSize: pageSize.value })
        loading.value = false;
        if (data.value.success) {
            list.value.push(...data.value.data.list)
            total.value = data.value.data.total;
            if (list.value.length >= total.value) {
                isEnd.value = true;
            }
            currentPage.value++
        }
    }
    return {
        list,
        total,
        loading,
        handleNext
    }
}
const { list, total, loading, handleNext } = useGetList();
handleNext()
const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let temp = document.documentElement || document.body;
    if (scrollTop + temp.clientHeight >= temp.scrollHeight) {
        console.log('到底了');
        handleNext()
    }
}
onMounted(() => {
    window.addEventListener("scroll", handleScroll)
})
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
})
</script>
<style lang="scss" scoped></style>