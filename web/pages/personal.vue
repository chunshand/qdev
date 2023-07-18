<template>
    <div class="w-full flex justify-center ">
        <div class="container flex">
            <div class="w-[240px] py-[16px] px-[24px] box-border flex flex-shrink-0">
                <div class="w-full shadow-md py-[16px] px-[8px]">
                    <div class="w-full h-[32px] flex justify-center items-center cursor-pointer border-rd-[4px] pb-[24px]">
                        <el-text class="!text-[20px] !font-600">个人中心</el-text>
                    </div>
                    <div class="w-full h-[32px] flex justify-center items-center cursor-pointer border-rd-[4px] mb-[16px]"
                        v-for="item in navList" :key="item.path">
                        <el-text class="!text-[16px] hover:text-blue !font-600 " :class="{
                            '!text-blue': route.path == item.path
                        }" @click="handleJump(item)">{{ item.title }}</el-text>
                    </div>
                </div>
            </div>
            <div class="w-full p-[16px]">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const navList = useState("navList", () => [
    {
        title: "个人资料",
        path: "/personal/userdata"
    },
    {
        title: "账号绑定",
        path: "/personal/userbind"
    }
])
const handleJump = (item: any) => {
    navigateTo(item.path)
}
</script>
<style lang="scss" scoped></style>