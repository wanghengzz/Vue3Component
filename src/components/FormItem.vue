<!--
 * @Author: 
 * @Date: 2024-11-12 15:41:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-12-06 10:32:45
 * @Description: 
 * @FilePath: \vue3-project\src\components\FormItem.vue
-->
<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="form"
    :label-width="labelWidth"
    :inline="true"
  >
    <el-form-item
      v-for="(item, key) in formItem"
      :key="key"
      :label="item.label"
      :prop="key"
    >
      <!-- 输入框 -->
      <el-input 
        v-if="item.type === 'input'"
        v-model="form[key]"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :maxlength="item.maxlength"
        :show-word-limit="item.showWordLimit"
        @input="item.input"
      ></el-input>

      <!-- 选择器 -->
      <el-select
        v-else-if="item.type === 'select'"
        v-model="form[key]"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :multiple="item.multiple"
        :collapse-tags="item.collapseTags"
      >
        <el-option
          v-for="(option, index) in item.options"
          :key="index"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
        ></el-option>
      </el-select>

      <!-- 多选框组 -->
      <el-checkbox-group
        v-else-if="item.type === 'checkbox'"
        v-model="form[key]"
        :disabled="item.disabled"
      >
        <el-checkbox
          v-for="(option, index) in item.options"
          :key="index"
          :label="option.value"
          :disabled="option.disabled"
        >{{ option.label }}</el-checkbox>
      </el-checkbox-group>

      <!-- 单选框组 -->
      <el-radio-group 
        v-else-if="item.type === 'radio'"
        v-model="form[key]"
        :disabled="item.disabled"
      >
        <el-radio
          v-for="(option, index) in item.options"
          :key="index"
          :label="option.value"
          :disabled="option.disabled"
        >{{ option.label }}</el-radio>
      </el-radio-group>

      <!-- 开关 -->
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="form[key]"
        :disabled="item.disabled"
        :active-text="item.activeText"
        :inactive-text="item.inactiveText"
        :active-value="item.activeValue"
        :inactive-value="item.inactiveValue"
      ></el-switch>

      <!-- 日期选择器 -->
      <el-date-picker
        v-else-if="item.type === 'date'"
        v-model="form[key]"
        :type="item.dateType || 'date'"
        :placeholder="item.placeholder || '选择日期'"
        :format="item.format"
        :value-format="item.valueFormat || 'YYYY-MM-DD'"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        style="width: 100%"
      ></el-date-picker>

      <!-- 时间选择器 -->
      <el-time-picker
        v-else-if="item.type === 'time'"
        v-model="form[key]"
        :placeholder="item.placeholder || '选择时间'"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :format="item.format"
        :value-format="item.valueFormat || 'HH:mm:ss'"
        style="width: 100%"
      ></el-time-picker>

      <!-- 日期时间选择器 -->
      <el-date-picker
        v-else-if="item.type === 'datetime'"
        v-model="form[key]"
        type="datetime"
        :placeholder="item.placeholder || '选择日期时间'"
        :format="item.format"
        :value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
        :disabled="item.disabled"
        :clearable="item.clearable"
        style="width: 100%"
      ></el-date-picker>

      <!-- 文本域 -->
      <el-input
        v-else-if="item.type === 'textarea'"
        v-model="form[key]"
        type="textarea"
        :rows="item.rows || 3"
        :placeholder="item.placeholder || '请输入'"
        :maxlength="item.maxlength"
        :show-word-limit="item.showWordLimit"
        :disabled="item.disabled"
      ></el-input>

      <!-- 数字输入框 -->
      <el-input-number
        v-else-if="item.type === 'number'"
        v-model="form[key]"
        :min="item.min"
        :max="item.max"
        :step="item.step"
        :precision="item.precision"
        :disabled="item.disabled"
        :controls="item.controls"
      ></el-input-number>

      <!-- 评分 -->
      <el-rate
        v-else-if="item.type === 'rate'"
        v-model="form[key]"
        :max="item.max"
        :disabled="item.disabled"
        :allow-half="item.allowHalf"
        :show-text="item.showText"
      ></el-rate>

      <!-- 滑块 -->
      <el-slider
        v-else-if="item.type === 'slider'"
        v-model="form[key]"
        :min="item.min"
        :max="item.max"
        :step="item.step"
        :disabled="item.disabled"
        :show-stops="item.showStops"
        :range="item.range"
      ></el-slider>

      <!-- 颜色选择器 -->
      <el-color-picker
        v-else-if="item.type === 'color'"
        v-model="form[key]"
        :disabled="item.disabled"
        :show-alpha="item.showAlpha"
      ></el-color-picker>

      <!-- 级联选择器 -->
      <el-cascader
        v-else-if="item.type === 'cascader'"
        v-model="form[key]"
        :options="item.options"
        :props="item.props"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.clearable"
      ></el-cascader>


      <!-- 远程搜索输入框 -->
      <!-- <el-autocomplete
        v-else-if="item.type === 'remoteSearch'"
        v-model="form[key]"
        :fetch-suggestions="item.fetchSuggestions"
        :placeholder="item.placeholder || '请输入关键词搜索'"
        :trigger-on-focus="item.triggerOnFocus"
        :disabled="item.disabled"
        :clearable="item.clearable"
        @select="item.select"
      ></el-autocomplete> -->

      <!-- 自定义插槽 -->
      <slot :name="key" v-else-if="item.type==='slot'"></slot>
      
    </el-form-item>
  </el-form>
</template>

<script lang="ts" name="" setup>
import { defineProps, ref, defineExpose } from 'vue'
import { Form } from './helper/button'
import type { FormRules } from 'element-plus'

interface Item {
  name: string
  region: string
  [key: string]: any
}

interface Props {
  form: {
    name: string
    region: string
    [key: string]: any
  }
  formItem: Form<Item>
  labelWidth: number
  rules: FormRules<Item>
}

const { form, formItem, labelWidth = 100, rules } = defineProps<Props>()
const formRef = ref() // 创建一个 ref 来引用 el-form

// 暴露 validate 方法
defineExpose({
  validate: () => {
    // 表单验证逻辑
    return formRef.value.validate() // 或根据你的逻辑调用
  },
  reset: () => {
    // 表单重置逻辑
    return formRef.value.resetFields() // 或根据你的逻辑调用
  },
})
</script>

<style scoped lang="scss">
:deep(.el-input) {
  min-width: 250px;
}
:deep(.el-select) {
  min-width: 250px;
}
:deep(.el-cascader) {
  min-width: 250px;
}
:deep(.el-date-picker) {
  min-width: 250px;
}
:deep(.el-time-picker) {
  min-width: 250px;
}
</style>
