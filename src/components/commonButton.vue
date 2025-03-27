<!--
 * @Author: 
 * @Date: 2025-01-14 10:51:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-20 15:35:49
 * @Description: 
 * @FilePath: \vue3-project\src\components\commonButton.vue
-->
<template>
  <div class="common-button">
    <template v-for="(item, index) in buttonGroup" :key="index">
      <el-button
        :type="item.type"
        :disabled="item.disabled"
        @click="handleClick(item, index)"
        :loading="loadingStates[index]"
        v-if="item.type != 'upload'"
        :size="item.size || 'small'"
      >
        <el-icon
          v-if="item.icon && item.iconPosition === 'left'"
          :size="props.size"
        >
          <component :is="item.icon" />
        </el-icon>
        <span class="button-text">{{ item.text }}</span>
        <el-icon
          v-if="item.icon && item.iconPosition === 'right'"
          :size="props.size"
        >
          <component :is="item.icon" />
        </el-icon>
      </el-button>

      <el-upload
        ref="uploadRef"
        v-else
        :action="item.action"
        :show-file-list="false"
        :auto-upload="item.autoUpload != undefined ? item.autoUpload : true"
        :on-success="(response:any) => handleUploadSuccess(response, item)"
        :on-error="(response: any) => handleUploadError(response, item)"
        :limit="1"
      >
        <template #trigger>
          <el-button
            type="primary"
            :disabled="item.disabled"
            :loading="loadingStates[index]"
            :size="item.size || 'small'"
          >
            <el-icon
              v-if="item.icon && item.iconPosition === 'left'"
              :size="props.size"
            >
              <component :is="item.icon" />
            </el-icon>
            <span class="button-text">{{ item.text }}</span>
            <el-icon
              v-if="item.icon && item.iconPosition === 'right'"
              :size="props.size"
            >
              <component :is="item.icon" />
            </el-icon>
          </el-button>
        </template>
      </el-upload>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ButtonItem } from './types/button'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}
const props = defineProps({
  buttonGroup: {
    type: Array as PropType<ButtonItem[]>,
    required: true,
  },
  size: {
    type: Number,
    default: 16,
  },
})

// // 创建一个数组来存储每个按钮的loading状态
const loadingStates = ref<boolean[]>([])
watch(
  () => props.buttonGroup,
  (newVal) => {
    loadingStates.value = new Array(newVal.length).fill(false)
  }
)

const handleClick = async (item: ButtonItem, index: number) => {
  try {
    loadingStates.value[index] = true
    await item.onClick()
  } finally {
    loadingStates.value[index] = false
  }
}

// ... existing code ...
const handleUploadSuccess = (response: any, item: ButtonItem) => {
  if (item.onUploadSuccess) {
    item.onUploadSuccess(response)
  }
}
const handleUploadError = (response: any, item: ButtonItem) => {
  if (item.onUploadError) {
    item.onUploadError(response)
  }
}

// ... existing code ...
</script>

<style lang="scss" scoped>
.common-button {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  .el-button {
    margin: 0px;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    .icon-wrapper {
      margin-right: 4px;
    }
  }
}
.button-text {
  font-size: 14px;
  margin-right: 4px;
}
</style>
