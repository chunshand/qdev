<template>
    <el-dialog width="640px" v-model="modal" :show-close="false">
        <el-text>登录</el-text>
        <el-form :model="formData" label-width="120px">
        </el-form>
    </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const modal = ref(false);
const formData = ref({})
onMounted(() => {
    console.log('mounted!')
})

</script>
<style lang="scss" scoped>
.el-dialog {
    --el-dialog-padding-primary: 0px
}
</style>