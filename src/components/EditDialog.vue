<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width" :close-on-click-modal="false" @close="handleClose">
    <!-- 弹窗内容插槽 -->
    <FormItem :form-config="formConfig" v-model="props.formData" :rules="rules" ref="formItemRef" labelWidth="60px">
    </FormItem>

    <!-- 底部按钮插槽 -->
    <template #footer>
      <slot name="footer">
        <span class="dialog-footer">
          <slot name="button"></slot>
          <el-button @click="handleClose" v-if="defaultButton">取消</el-button>
          <el-button type="primary" @click="handleConfirm" v-if="defaultButton">确定</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormItem } from '@/components/types/formItem'
import { ref, PropType } from 'vue'
import { message } from '@/utils/message'
// 定义组件属性
const props = defineProps({
  // 弹窗标题
  title: {
    type: String,
    default: '标题',
  },
  // 弹窗宽度
  width: {
    type: String,
    default: '40%',
  },
  formConfig: {
    type: Array as PropType<FormItem[]>,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => {},
  },
  rules:{
    type: Object,
    default: () => {},
  },
  defaultButton:{
    type:Boolean,
    default:true
  }
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

// 控制弹窗显示状态
const dialogVisible = ref(false)
const formItemRef = ref()
// 关闭弹窗
const handleClose = () => {
  dialogVisible.value = false
  formItemRef.value.resetForm()
  emit('close')
}

// 确认按钮
const handleConfirm = async() => {
  try {
    await formItemRef.value.validate()
  } catch (error) {
    message('请填写完整必填信息!', 'error')
    return
  }
  emit('confirm')
  dialogVisible.value = false
}

// 暴露方法给父组件
defineExpose({
  open: () => (dialogVisible.value = true),
  close: () => (dialogVisible.value = false),
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
