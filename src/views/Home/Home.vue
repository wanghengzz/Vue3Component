<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-05-07 17:41:47
 * @Description: 
 * @FilePath: \vue3-project\src\views\Home\Home.vue
-->
<template>
  <div class="search-container">
    <div class="form-container">
      <FormItem
        :form-config="formConfig"
        v-model="formData"
        ref="formItemRef"
        labelWidth="40px"
      ></FormItem>
      <commonButton :buttonGroup="buttonGroup" />
    </div>

    <div class="table-container">
      <TableCom
        :tableColumn="tableColumn"
        :tableData="tableData"
        :pagger="pagger"
        @update:pagger="handlePagger"
        class="table-container"
        @row-dblclick="(row: FormItem[]) => handleEdit(row)"
      >
        <template #action="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </TableCom>
    </div>

    <EditDialog
      :title="title"
      ref="dialog"
      :form-config="dialogFormConfig"
      :form-data="dialogFormData"
      :rules="rules"
      @confirm="handleConfirm"
    >
      <!-- <template #button>
        <el-button type="primary">测试</el-button>
      </template> -->
    </EditDialog>
  </div>
</template>

<script setup lang="ts">
import type { FormItem } from '@/components/types/formItem'
import { onMounted, ref, reactive } from 'vue'
import _ from 'lodash'
import * as api from '@/api/User'
import { ElMessage } from 'element-plus'
import { confirmMessage } from '@/utils/message'
import EditDialog from '@/components/EditDialog.vue'
import { getEnumeValue } from '@/hook/getEnumeValue'
const formConfig = reactive<FormItem[]>([
  {
    type: 'autocomplete',
    label: '名字',
    prop: 'name',
    placeholder: '请输入用户名',
    clearable: true,
    span: 8,
    contentKey: 'name',
    valueKey: 'name',
    fetchSuggestions: (
      query: string,
      callback: (suggestions: any[]) => void
    ) => {
      let params = {
        data: {
          name: query,
          profession: '',
        },
      }
      api.getUserLike(params).then((res) => {
        callback(res.data)
      })
    },
    selectMethod: (item: any) => {
      console.log(item)
    },
  },
  {
    type: 'select',
    label: '性别',
    prop: 'sex',
    span: 8,
    options: [
      { value: '', label: '全部' },
      { value: '男', label: '男' },
      { value: '女', label: '女' },
    ],
  },
  {
    type: 'select',
    label: '职业',
    prop: 'profession',
    span: 8,
    placeholder: '请输入职业',
    clearable: true,
    labelKey: 'enumDesc',
    valueKey: 'enumDesc',
    options: getEnumeValue('profession'),
  },
])

const buttonGroup = [
  {
    text: '查询',
    type: 'primary',
    disabled: false,
    icon: 'Search',
    iconPosition: 'right',
    onClick: async () => {
      // 模拟异步操作
      getTableData()
    },
  },
  {
    text: '新增',
    type: 'primary',
    icon: 'Plus',
    iconPosition: 'right',
    onClick: () => {
      title.value = '新增'
      dialog.value.open()
      resetDialogFormData()
    },
  },
  {
    text: '导出',
    type: 'primary',
    icon: 'Download',
    iconPosition: 'right',
    onClick: () => {
      api
        .exportUser({})
        .then((response) => {
          try {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `用户数据.xlsx`)
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)
            ElMessage.success('导出成功')
          } catch (error) {
            console.error('导出错误:', error)
            ElMessage.error('导出失败，请稍后重试')
          }
        })
        .catch((error) => {
          console.error('导出请求错误:', error)
          ElMessage.error('导出失败，请稍后重试')
        })
    },
  },
  {
    text: '导入',
    type: 'upload',
    action: '/api/users/import',
    icon: 'UploadFilled',
    iconPosition: 'right',
    autoUpload: true,
    onUploadSuccess: (response:any) => {
      ElMessage.success(response.retMsg)
      getTableData()
    },
    onUploadError: (response: any) => {
      ElMessage.error('导入失败!')
    },
  },
  {
    text: '重置',
    type: 'primary',
    icon: 'Setting',
    iconPosition: 'right',
    onClick: () => {
      formData.value.name = ''
      formData.value.sex = ''
      formData.value.profession = ''
    },
  },
]

const tableColumn = reactive([
  {
    label: '基本信息',
    children: [
      {
        prop: 'name',
        label: '名字',
        sortable: true,
        filters: [
          { text: '张三', value: '张三' },
          { text: '李四', value: '李四' }
        ]
      },
      {
        prop: 'sex',
        label: '性别',
      },
      {
        prop: 'age',
        label: '年龄',
        sortable: 'custom',
        filters: [
          { text: '20岁以下', value: 20 },
          { text: '20-30岁', value: '20-30' }
        ],
        filterMultiple: true
      },
    ],
  },
  {
    label: '附加信息',
    children: [
      {
        prop: 'profession',
        label: '职业',
      },
      {
        prop: 'address',
        label: '地址',
      },
      {
        prop: 'phone',
        label: '电话',
      },
      {
        prop: 'email',
        label: '邮箱',
      },
    ],
  },
  {
    prop: 'action',
    label: '操作',
    slotName: 'action',
    width: '200px',
    fixed: 'right',
  },
])
const tableData = ref([])
const pagger = ref({
  pageSize: 30,
  currentPage: 1,
  total: 0,
})
const formData = ref({
  name: '',
  sex: '',
  profession: '',
})

const title = ref('新增')
const dialog = ref()
const dialogFormConfig = reactive<FormItem[]>([
  {
    type: 'title',
    label: '基本信息',
    prop: 'titleDeatil',
    span: 24,
  },
  {
    type: 'input',
    label: '名字',
    prop: 'name',
    placeholder: '请输入用户名',
    clearable: true,
    span: 12,
  },
  {
    type: 'select',
    label: '性别',
    prop: 'sex',
    span: 12,
    options: [
      { value: '男', label: '男' },
      { value: '女', label: '女' },
    ],
  },
  {
    type: 'input',
    label: '年龄',
    prop: 'age',
    span: 12,
    placeholder: '请输入年龄',
    clearable: true,
  },
  {
    type: 'title',
    label: '附加信息',
    prop: 'titleShow',
    span: 24,
  },
  {
    type: 'input',
    label: '职业',
    prop: 'profession',
    span: 12,
    placeholder: '请输入职业',
    clearable: true,
  },

  {
    type: 'input',
    label: '地址',
    prop: 'address',
    span: 12,
    placeholder: '请输入地址',
    clearable: true,
  },
  {
    type: 'input',
    label: '电话',
    prop: 'phone',
    span: 12,
    placeholder: '请输入电话',
    clearable: true,
  },
  {
    type: 'input',
    label: '邮箱',
    prop: 'email',
    span: 12,
    placeholder: '请输入邮箱',
    clearable: true,
  },
])
const dialogFormData = reactive({
  name: '',
  sex: '',
  profession: '',
  age: '',
  address: '',
  phone: '',
  email: '',
})
const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
  ],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  profession: [{ required: true, message: '请输入职业', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}
const resetDialogFormData = () => {
  Object.assign(dialogFormData, {
    name: '',
    sex: '男',
    profession: '',
    age: '',
    address: '',
    phone: '',
    email: '',
  })
}

const getTableData = async () => {
  let params = {
    pageNo: pagger.value.currentPage,
    pageSize: pagger.value.pageSize,
    data: { ...formData.value },
  }
  let res = await api.getUserPage(params)
  tableData.value = res.data.data
  pagger.value.total = res.data.total
}

const handlePagger = (val: any) => {
  pagger.value.currentPage = val.currentPage
  pagger.value.pageSize = val.pageSize
  getTableData()
}

const handleEdit = (row: any) => {
  title.value = '编辑'
  dialog.value.open()
  resetDialogFormData()
  Object.assign(dialogFormData, row)
}
const handleConfirm = async () => {
  let params = { data: dialogFormData }

  if (title.value == '新增') {
    let res = await api.addUser(params)
    if (res.retCode === '200') {
      ElMessage.success(res.retMsg || '新增成功!')
      getTableData()
    }
  } else {
    let res = await api.updateUser(params)
    if (res.retCode === '200') {
      ElMessage.success(res.retMsg || '修改成功!')
      getTableData()
    }
  }
}

const handleDelete = async (row: any) => {
  confirmMessage({
    message: '确定删除用户？',
    onConfirm: async () => {
      let res = await api.delUser({ id: row.id })
      if (res.retCode === '200') {
        ElMessage.success(res.retMsg || '删除成功!')
        getTableData()
      }
    },
  })
}

onMounted(() => {
  getTableData()
})
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  flex-direction: column;
  .form-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    height: 5%;
    gap: 10px;
  }
  .table-container {
    height: 95%;
  }
}
</style>
