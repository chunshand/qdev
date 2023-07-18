<template>
    <client-only>
        <el-dialog width="560px" v-model="show" :show-close="false">
            <template #header>
                <el-text class="font-600 !text-[24px]">{{ state == 'login' ? '登录' : '注册' }}</el-text>
            </template>
            <el-form :model="formData" label-position="top">
                <el-form-item label="账号">
                    <el-input v-model="formData.username" size="large" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" type="password" size="large" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="再次输入密码" v-show="state == 'reg'">
                    <el-input v-model="formData.password2" type="password" size="large" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <div class="flex items-center justify-end w-full pt-4">
                        <el-button :type="state == 'login' ? 'primary' : ''" :class="{ 'w-[240px]': state == 'login' }"
                            size="large" @click="handleLogin" :loading="loading">登录</el-button>
                        <el-button :type="state == 'reg' ? 'primary' : ''" size="large"
                            :class="{ 'w-[240px]': state == 'reg' }" @click="handleReg" :loading="loading" v-if="appConfig?.openReg">注册</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div class="pt-1 flex justify-end" v-if="false">
                <el-space>
                    <el-text size="small">其他登录：</el-text>
                </el-space>
            </div>
        </el-dialog>
    </client-only>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
const appConfig = useWebAppConigState()

const show = ref(false);
const state = ref("login")
const loading = ref(false)
const formData = ref({
    username: "",
    password: "",
    password2: ""
})
const open = (_state: string = 'login') => {
    console.log("modal open");
    show.value = true;
    state.value = _state;
}
const handleLogin = async () => {
    if (state.value != 'login') {
        state.value = 'login'
        return;
    }
    loading.value = true;
    let res: any = await useLogin(formData.value);
    if (res.value.success) {
        show.value = false;
    }
    loading.value = false;


}

const handleReg = () => {
    if (state.value != 'reg') {
        state.value = 'reg'
        return;
    }
}
onMounted(() => {
    console.log('mounted!')
})
defineExpose({
    open
})
</script>
<style lang="scss" scoped></style>