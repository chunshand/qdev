<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-card shadow="never" class="search-wrapper">
          <el-space>
            <el-text size="large">角色</el-text>
            <el-button type="text">添加</el-button>
          </el-space>
          <el-scrollbar height="600px">
            <el-menu>
              <el-menu-item index="2">
                <span>Navigator Two</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="20" style="padding-left: 8px;box-sizing: border-box;">
        <el-card shadow="never" class="search-wrapper">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
