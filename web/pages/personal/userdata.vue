<template>
    <div>
        <div class="w-[640px] shadow-md p-[24px] border-rd-[8px]">
            <div class="pb-[24px]">
                <el-text class="!text-[24px]">个人资料</el-text>
            </div>
            <el-form :model="formData" label-position="top" v-loading="loading">
                <el-form-item label="头像">
                    <UploadAvatar v-model="formData.avatar"></UploadAvatar>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="formData.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="w-full flex justify-end pt-[16px]">
                        <el-button  size="large" class="w-[120px]" @click="handleSave">保存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"
const formData = ref({
    avatar: '',
    nickname: '',
    phone: '',
    email: '',
})
const loading = ref(false);
const handleGetInfo = async () => {
    loading.value = true;
    const data: any = await useGetUserInfoApi$();
    if (data.success) {
        formData.value = data.data;
    } else {
        ElMessage.warning("信息获取失败")
    }
    loading.value = false;

}
handleGetInfo();

const handleSave = async () => {
    let { data }: any = await useUpdateUserInfoApi(formData.value)
    if (data.value.success) {
        ElMessage.success("信息更新成功")
        useRefreshUserInfo()
    } else {
        ElMessage.warning(data.value.message)
    }
}
</script>

<style lang="scss" scoped></style>