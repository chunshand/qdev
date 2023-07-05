<script lang="ts" setup>
import { type PropType, computed } from "vue"
import { type RouteRecordRaw } from "vue-router"
import SidebarItemLink from "./SidebarItemLink.vue"
import { Grid } from '@element-plus/icons-vue'
const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw | any>,
    required: true
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
})

</script>

<template>
  <!-- :class="{ 'simple-mode': props.isCollapse, 'first-level': props.isFirstLevel }" -->
  <div :class="{ 'simple-mode': props.isCollapse }">
    <template v-if="props.item.children.length == 0 || !props.item.children">
      <el-menu-item :index="String(props.item.id)">
        <!-- <svg-icon v-if="props.item.svgIcon" :name="props.item.svgIcon" />
        <component v-else-if="props.item.elIcon" :is="props.item.elIcon" class="el-icon" />
        <el-icon v-else>
          <Grid />
        </el-icon> -->
        <template v-if="props.item.title" #title>
          {{ props.item.title }}
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="String(props.item.id)" teleported>
      <template #title>
        <svg-icon v-if="props.item.svgIcon" :name="props.item.svgIcon" />
        <component v-else-if="props.item.elIcon" :is="props.item.elIcon" class="el-icon" />
        <el-icon v-else>
          <Grid />
        </el-icon> <span v-if="props.item.title">{{ props.item.title }}</span>
      </template>
      <template v-if="props.item.children">
        <sidebar-item v-for="child in props.item.children" :key="child.path" :item="child" />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }

      span {
        visibility: hidden;
      }
    }
  }
}
</style>
