<template>
    <div class="w-full flex justify-center">
        <div class="container shadow-md p-[16px]">
            <el-text>关于</el-text>
        </div> 
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
onMounted(() => {
    console.log('mounted!')
})
</script>
<style lang="scss" scoped></style>