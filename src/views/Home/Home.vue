<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-15 09:43:14
 * @Description: 
 * @FilePath: \vue3-project\src\views\Home\Home.vue
-->
<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-15 09:35:19
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
    > 
      <template #slotName>
        <div>插槽内容</div>
      </template>
    </FormItem>
    <button @click="submit">提交</button>
  </div>
</template>

<script setup lang="ts">
import { ref ,watch} from 'vue'
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
    // 数字
    reg: /[^0-9]/g,
    inputMethod: (val: any) => {
      console.log(val, 'inputMethod')
    },
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
    valueKey: 'valueKey',
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
  {
    type: 'slot',
    label: '插槽',
    prop: 'slot',
    slotName: 'slotName',
  },
  {
    type: 'title',
    label: '标题',
    prop: 'title',
    span: 24,
  },
]

const formData = ref({
  username: '',
  role: '',
  remark: '',
  gender: '',
  birthday: '',
  isEnabled: '',
  autocomplete: '',
  slot: '',
})

watch(formData, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'formData')
}, { deep: true })

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}

const formItemRef = ref()

const submit = async () => {
  try {
    const valid = await formItemRef.value.validate()
    console.log(formData.value, 'formData')
    console.log(valid, 'valid')
  } catch (error) {
    console.log('验证失败')
  }
}
</script>
