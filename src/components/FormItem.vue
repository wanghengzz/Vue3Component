<!--
 * @Author: 
 * @Date: 2025-01-14 11:14:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-23 10:35:50
 * @Description: 
 * @FilePath: \vue3-project\src\components\FormItem.vue
-->
<!--
 * @Author: 
 * @Date: 2025-01-14 11:14:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-16 10:49:03
 * @Description: 
 * @FilePath: \vue3-project\src\components\FormItem.vue
-->
<template>
  <div class="form-item">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in filteredFormConfig"
          :key="index"
          :span="item.span || 6"
        >
          <span v-if="item.type === 'title'">{{ item.label }}</span>
          <el-form-item v-else :label="item.label" :prop="item.prop">
            <!-- 输入框 -->
            <el-input
              v-if="item.type === 'input'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :clearable="item.clearable"
              @input="handleInput(item, $event)"
            />

            <!-- 文本域 -->
            <el-input
              v-if="item.type === 'textarea'"
              v-model="formData[item.prop]"
              type="textarea"
              :rows="item.rows || 3"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              @input="handleInput(item, $event)"
            />

            <!-- 选择器 -->
            <el-select
              v-if="item.type === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :clearable="item.clearable"
              :multiple="item.multiple"
              :multiple-limit="item.multipleLimit"
              :filterable="item.filterable"
              :filter-method="item.filterMethod"
              :filter-placeholder="item.filterPlaceholder"
              :remote="item.remote"
              :remote-method="item.remoteMethod"
              :loading="item.loading"
              :placement="item.placement || 'bottom'"
              @select="item.selectMethod"
            >
              <el-option
                v-for="option in item.options"
                :key="option[item.valueKey || 'value']"
                :label="option[item.labelKey || 'label']"
                :value="option[item.valueKey || 'value']"
              />
            </el-select>

            <!-- 单选框组 -->
            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              @select="item.selectMethod"
            >
              <el-radio
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>

            <!-- 复选框组 -->
            <el-checkbox-group
              v-if="item.type === 'checkbox'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              @select="item.selectMethod"
            >
              <el-checkbox
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'switch'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              @select="item.selectMethod"
            />

            <!-- 日期选择器 -->
            <el-date-picker
              v-if="item.type === 'date'"
              v-model="formData[item.prop]"
              :type="item.dateType || 'date'"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :clearable="item.clearable"
              @select="item.selectMethod"
            />

            <!-- 时间选择器 -->
            <el-time-picker
              v-if="item.type === 'time'"
              v-model="formData[item.prop]"
              :is-range="item.timeType === 'timerange'"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :clearable="item.clearable"
              @select="item.selectMethod"
            />

            <!-- 级联选择器 -->
            <el-cascader
              v-if="item.type === 'cascader'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :clearable="item.clearable"
              :options="item.options"
              :props="{
                value: item.valueKey || 'value',
                label: item.labelKey || 'label',
              }"
              :show-all-levels="item.showAllLevels || false"
              :show-input-controls="item.showInputControls || false"
              @select="item.selectMethod"
            />

            <!-- 滑块 -->
            <el-slider
              v-if="item.type === 'slider'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :min="item.min || 0"
              :max="item.max || 100"
              :step="item.step || 1"
              :show-input="item.showInput || true"
              @select="item.selectMethod"
            />
            <!-- 模糊搜索 -->
            <el-autocomplete
              v-if="item.type === 'autocomplete'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :filter-method="item.filterMethod"
              :fetch-suggestions="item.fetchSuggestions"
              :value-key="item.valueKey"
              @select="item.selectMethod"
            >
              <template #default="scope">
                <div v-if="Array.isArray(item.contentKey)">
                  <span v-for="key in item.contentKey" :key="key">
                    {{ scope.item[key] }}
                  </span>
                </div>
                <div v-else-if="typeof item.contentKey === 'string'">
                  {{ scope.item[item.contentKey] }}
                </div>
                <div v-else>
                  {{ scope.item.label }}
                </div>
              </template>
            </el-autocomplete>

            <!-- 插槽 -->
            <slot v-if="item.type === 'slot'" :name="item.slotName" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, PropType, computed } from 'vue'
import type { FormItem } from './types/formItem'

const props = defineProps({
  // 表单配置
  formConfig: {
    type: Array as PropType<FormItem[]>,
    required: true,
  },
  // 表单数据
  modelValue: {
    type: Object,
    required: true,
  },
  // 表单验证规则
  rules: {
    type: Object,
    default: () => ({}),
  },
  // 标签宽度
  labelWidth: {
    type: String,
    default: '80px',
  },
  // 新增col属性
  col: {
    type: Number,
    default: 2,
  },
  // 标签位置
  labelPosition: {
    type: String,
    default: 'left',
  },
})

const emit = defineEmits(['update:modelValue'])

// 表单数据
const formData = ref(props.modelValue)

// 处理输入框输入
const handleInput = (item: FormItem, val: any) => {
  if (item.reg) {
    // 如果传入的是字符串，将其转换为RegExp对象
    const regex = typeof item.reg === 'string' ? new RegExp(item.reg) : item.reg
    // 使用正则替换，如果不匹配则替换为空字符串
    const newVal = String(val).replace(regex, '')
    // 更新表单数据
    formData.value[item.prop] = newVal
    // 触发v-model更新
    emit('update:modelValue', formData.value)
  }
  item.inputMethod && item.inputMethod(formData.value[item.prop])
}

// 表单ref
const formRef = ref()
// 表单验证方法
const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        resolve(valid)
      } else {
        reject(valid)
      }
    })
  })
}
// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
}

// 对外暴露方法
defineExpose({
  validate,
  resetForm,
})

const filteredFormConfig = computed(() => 
  props.formConfig.filter(item => item.isShow == undefined || item.isShow)
)
</script>

<style lang="scss" scoped>
.form-item {
  .el-form-item {
    margin-bottom: 18px;
  }

  // 只为特定元素设置100%宽度
  .el-input__inner,
  .el-radio-group,
  .el-input-number,
  .el-cascader,
  .el-textarea,
  .el-checkbox-group,
  .el-autocomplete,
  .el-select,
  .el-switch {
    width: 100% !important;
  }

  // 日期和时间选择器保持100%宽度
  :deep(.el-date-editor.el-input),
  :deep(.el-date-editor.el-input__wrapper),
  :deep(.el-time-editor.el-input),
  :deep(.el-time-editor.el-input__wrapper) {
    width: 100% !important;
  }

  // 移除了 .el-select 的强制宽度设置
}
</style>
