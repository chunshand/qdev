<!-- 配置项表单 -->
<script lang="ts" setup>
import { ref, defineExpose, getCurrentInstance } from "vue";
import { FormOptions } from "./interface"
import { useTransformOnBind } from "../help";
import { FormInstance, FormRules } from "element-plus";
const props = defineProps<{
  Form: FormOptions
}>()
const formData = ref<any>({
})
/**
 * 设置表单数据
 * @param data
 */
const handleSetformData = (data: any) => {
  formData.value = data;
}
const transform = useTransformOnBind()
const formRef = ref<FormInstance | null>(null)
/**
 * 表单验证
 */
const handleValidate = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid: boolean) => {
      console.log(valid);
      resolve(valid);
    })
  })
}

defineExpose({
  handleSetformData,
  handleValidate
})
</script>

<template>
  <!-- {{props.Form.rules()}} -->
  <el-form :model="formData" :rules="props.Form.rules" ref="formRef">
    <el-form-item v-for="item in props.Form.columns" :label="item.label" :prop="item.model.toString()">
      <!-- 文本输入 -->
      <el-input v-if="item.component == 'el-input'" v-model="formData[item.model]" v-on="transform(item.on, item)"
        v-bind="transform(item.attr, item)"></el-input>

      <!-- 开关 -->
      <el-switch v-else-if="item.component == 'el-switch'" v-model="formData[item.model]" v-on="transform(item.on, item)"
        v-bind="transform(item.attr, item)"></el-switch>

      <!-- 数字 -->
      <el-input-number v-else-if="item.component == 'el-input-number'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)"></el-input-number>

      <!-- 单选 -->
      <el-radio-group v-else-if="item.component == 'el-radio-group'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)">
        <template v-if="item.optionIsBtn">
          <el-radio-button :label="option.value" v-for="option, index in item.options" :key="index">{{ option.label
          }}</el-radio-button>
        </template>
        <template v-else>
          <el-radio :label="option.value" v-for="option, index in item.options" :key="index">{{ option.label }}</el-radio>
        </template>
      </el-radio-group>

      <!-- 多选 -->
      <el-checkbox-group v-else-if="item.component == 'el-checkbox-group'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)">
        <template v-if="item.optionIsBtn">
          <el-checkbox-button :label="option.label" :value="option.value" v-for="option, index in item.options"
            :key="index"></el-checkbox-button>
        </template>
        <template v-else>
          <el-checkbox :label="option.label" :value="option.value" v-for="option, index in item.options"
            :key="index"></el-checkbox>
        </template>
      </el-checkbox-group>

      <!-- 选择器 -->
      <el-select v-else-if="item.component == 'el-select'" v-model="formData[item.model]" v-on="transform(item.on, item)"
        v-bind="transform(item.attr, item)">
        <el-option :label="option.label" :value="option.value" v-for="option in item.options"></el-option>
      </el-select>

      <!-- 滑块 -->
      <el-slider v-else-if="item.component == 'el-slider'" v-model="formData[item.model]" v-on="transform(item.on, item)"
        v-bind="transform(item.attr, item)" />


      <!-- 级联选择 -->
      <el-cascader v-else-if="item.component == 'el-cascader'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)" :options="item.options" />

      <!-- 取色 -->
      <el-color-picker v-else-if="item.component == 'el-picker'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)" />

      <!-- 日期选择 -->
      <el-date-picker v-else-if="item.component == 'el-picker'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)" />

      <!-- 日期时间选择 -->
      <el-date-picker v-else-if="item.component == 'el-picker'" v-model="formData[item.model]"
        v-on="transform(item.on, item)" v-bind="transform(item.attr, item)" />

      <!-- 评分 -->
      <el-rate v-else-if="item.component == 'el-rate'" v-model="formData[item.model]" v-on="transform(item.on, item)"
        v-bind="transform(item.attr, item)" />

      <!-- 图片上传 -->
      <!-- 文件上传 -->
      <!-- 视频上传 -->
      <!-- TODO 上传在el-upload之上包装下 -->
      <el-upload v-else-if="item.component == 'el-upload'" v-model="formData[item.model]" v-on="transform(item.on, item)"
        v-bind="transform(item.attr, item)">
        <el-button type="primary">Click to upload</el-button>
      </el-upload>

      <!-- 上传自定义的 -->
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
