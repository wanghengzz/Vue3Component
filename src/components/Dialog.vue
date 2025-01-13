<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width" :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape" :before-close="handleClose" :destroy-on-close="destroyOnClose"
    class="base-dialog">
    <!-- 自定义头部插槽 -->
    <template #header v-if="$slots.header">
      <slot name="header"></slot>
    </template>

    <!-- 内容区域 -->
    <slot></slot>

    <!-- 底部按钮区域 -->
    <template #footer v-if="!hideFooter">
      <slot name="footer">
        <span class="dialog-footer">
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  // 控制弹窗显示
  modelValue: {
    type: Boolean,
    default: false
  },
  // 标题
  title: {
    type: String,
    default: '标题'
  },
  // 宽度
  width: {
    type: [String, Number],
    default: '50%'
  },
  // 是否可以通过点击 modal 关闭
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  // 是否可以通过按下 ESC 关闭
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  // 关闭时销毁内容
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  // 隐藏底部按钮
  hideFooter: {
    type: Boolean,
    default: false
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '确定'
  }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

// 控制弹窗显示状态
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 关闭前的回调
const handleClose = (done: () => void) => {
  emit('cancel')
  done()
}

// 点击取消
const handleCancel = () => {
  dialogVisible.value = false
  emit('cancel')
}

// 点击确认
const handleConfirm = () => {
  dialogVisible.value = false
  emit('confirm')
}
</script>

<style scoped>
.base-dialog {
  border-radius: 8px;
}

.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>