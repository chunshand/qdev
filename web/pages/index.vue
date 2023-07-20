<template>
    <div class="w-full flex justify-center">
        <div class="container">
            首页
            <div class="h-[3000px]"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue"
const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let temp = document.documentElement || document.body;
    if (scrollTop + temp.clientHeight >= temp.scrollHeight) {
        console.log("滚动到了底部");
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