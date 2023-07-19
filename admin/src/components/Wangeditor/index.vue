<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const toolbarConfig: Partial<IToolbarConfig> = {  // TS 语法
  // toolbarKeys: [
  //   // h1-7
  //   'headerSelect',
  //   // 加粗
  //   'bold',
  //   // 斜体
  //   'italic',
    
  // ]
}
const valueHtml = defineModel<string>();

const mode = "simple"
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML

const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <div class="min-w-[640px] w-full shadow-md">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" />
  </div>
</template>

<style lang="scss" scoped></style>