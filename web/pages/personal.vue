<template>
    <div class="w-full flex justify-center ">
        <div class="container flex">
            <div class="w-[320px] py-[16px] px-[8px] box-border flex">
                <div class="w-full shadow-md py-[16px] px-[8px] ">
                    <div
                        class=" w-full h-[32px]  flex justify-center items-center cursor-pointer border-rd-[4px] pb-[16px]">
                        <el-text class="!text-[16px]">个人中心</el-text>
                    </div>
                    <div class=" w-full h-[32px] mt-2 flex justify-center items-center cursor-pointer border-rd-[4px]"
                        v-for="item in navList" :key="item.path">
                        <el-text>{{ item.title }}</el-text>
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
</script>

<style lang="scss" scoped></style>