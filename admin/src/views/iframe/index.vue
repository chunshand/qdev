<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"
const route = useRoute()
const url = ref<string>("");
onMounted(() => {
  url.value = route.query.url as string
})
</script>

<template>
  <iframe :src="url" frameborder="0" class="iframe-container"></iframe>
</template>

<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  height: 100%;
}
</style>
