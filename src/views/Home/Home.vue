<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-14 15:22:35
 * @Description: 
 * @FilePath: \vue3-project\src\views\Home\Home.vue
-->
<template>
  <div class="home">
    <!-- <h1>首页</h1> -->
    <commonButton :buttonGroup="buttonGroup" />

    <FormItem
      :form-config="formConfig"
      v-model="formData"
      :rules="rules"
      ref="formItemRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormItem } from '@/components/types/formItem'
const buttonGroup = [
  {
    text: '按钮1',
    type: 'primary',
    disabled: false,
    onClick: () => {
      console.log('按钮1')
    },
  },
  {
    text: '按钮2',
    type: 'primary',
    disabled: true,
    onClick: () => {
      console.log('按钮2')
    },
  },
  {
    text: '按钮3',
    type: 'primary',
    disabled: false,
    onClick: () => {
      console.log('按钮3')
    },
  },
  {
    text: '按钮4',
    type: 'primary',
    disabled: false,
    onClick: () => {
      console.log('按钮4')
    },
  },
  {
    text: '按钮5',
    type: 'primary',
    disabled: false,
    onClick: () => {
      console.log('按钮5')
    },
  },
]

const formConfig: FormItem[] = [
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    clearable: true,
  },
  {
    type: 'select',
    label: '角色',
    prop: 'role',
    placeholder: '请选择角色',
    options: [
      {
        label: '管理员',
        value: 'admin',
        labelKey: 'label111',
        valueKey: 'value111',
      },
      {
        label: '用户',
        value: 'user',
        labelKey: 'label222',
        valueKey: 'value222',
      },
    ],
    labelKey: 'labelKey',
    valueKey: 'valueKey',
  },
  {
    type: 'textarea',
    label: '备注',
    prop: 'remark',
    rows: 1,
  },
  {
    type: 'radio',
    label: '性别',
    prop: 'gender',
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 },
    ],
  },
  {
    type: 'date',
    label: '出生日期',
    prop: 'birthday',
    dateType: 'date',
  },
  {
    type: 'time',
    label: '出生时间',
    prop: 'birthday',
    timeType: 'time',
  },
  {
    type: 'switch',
    label: '是否启用',
    prop: 'isEnabled',
    disabled: false,
  },
  {
    type: 'autocomplete',
    label: '自动补全',
    prop: 'autocomplete',
    placeholder: '请输入内容',
    // contentKey: ['labelKey', 'valueKey'],
    contentKey: 'labelKey',
    fetchSuggestions: (query: string,callback: (suggestions: any[]) => void) => {
      setTimeout(() => {
        callback([
          { label: '选项1', value: 'value1', labelKey: 'label1', valueKey: 'value1' },
          { label: '选项2', value: 'value2', labelKey: 'label2', valueKey: 'value2' },
        ])
      }, 1000)
    },
    selectMethod: (item: any) => {
      console.log(item)
    },
  },
]

const formData = ref({
  username: '',
  role: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}
</script>
