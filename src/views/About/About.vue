<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-21 10:14:51
 * @Description: 
 * @FilePath: \vue3-project\src\views\About\About.vue
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
    <FormItem :form-config="formConfig" v-model="formData" :rules="rules" ref="formItemRef">
      <template #slotName>
        <div>插槽内容</div>
      </template>
    </FormItem>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue'
import type { FormItem } from '@/components/types/formItem'
import { getEnumeValue } from '@/hook/getEnumeValue'
import { message, confirmMessage, notification } from '@/utils/message'
const buttonGroup = [
  {
    text: '按钮1',
    type: 'primary',
    disabled: false,
    icon: 'Edit',
    iconPosition: 'right',
    onClick: async () => {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000))
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

const formConfig = reactive<FormItem[]>([
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    clearable: true,
    // 数字
    reg: /[^0-9]/g,
    isShow: true,
    size: 'large',
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
    labelKey: 'enumDesc',
    valueKey: 'enumValue',
    options: getEnumeValue('gender'),
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
    fetchSuggestions: (
      query: string,
      callback: (suggestions: any[]) => void
    ) => {
      setTimeout(() => {
        callback([
          {
            label: '选项1',
            value: 'value1',
            labelKey: 'label1',
            valueKey: 'value1',
          },
          {
            label: '选项2',
            value: 'value2',
            labelKey: 'label2',
            valueKey: 'value2',
          },
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
  {
    type: 'twoInput',
    label: '价格区间',
    prop: 'price',
    prop1: 'minPrice',
    prop2: 'maxPrice',
    placeholder1: '最小值',
    placeholder2: '最大值',
    centerContent: '至',
    span: 12,
    size: 'large'
  }
])

const formData = ref({
  username: '',
  role: '',
  remark: '',
  gender: '',
  birthday: '',
  isEnabled: '',
  autocomplete: '',
  slot: '',
  minPrice: '',
  maxPrice: '',
})

watch(
  formData,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, 'formData')
  },
  { deep: true }
)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  minPrice: [
    { required: true, message: '请输入最小值', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value < 0) {
          callback(new Error('最小值不能小于0'))
        } else if (formData.value.maxPrice && value > Number(formData.value.maxPrice)) {
          callback(new Error('最小值不能大于最大值'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  maxPrice: [
    { required: true, message: '请输入最大值', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value < 0) {
          callback(new Error('最大值不能小于0'))
        } else if (formData.value.minPrice && value < Number(formData.value.minPrice)) {
          callback(new Error('最大值不能小于最小值'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

const formItemRef = ref()

const submit = async () => {
  try {
    const valid = await formItemRef.value.validate()
    console.log(formData.value, 'formData')
    console.log(valid, 'valid')
    message('验证成功', 'success')
  } catch (error) {
    message('验证失败', 'error')
  }
}

onMounted(async () => {
  // confirmMessage({
  //   message: '确定要删除吗？',
  //   title: '提示',
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  //   onConfirm: () => {
  //     message('删除成功', 'success')
  //   },
  //   onCancel: () => {
  //     message('删除取消', 'info')
  //   },
  // })
  notification({
    message: '通知',
    title: '提示',
    type: 'success',
  })
})
</script>


<style lang="scss"></style>
