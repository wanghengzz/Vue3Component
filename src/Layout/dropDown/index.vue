<template>
  <el-dropdown>
    <div class="el-dropdown-list">
      <el-icon>
        <User />
      </el-icon>
      {{ username }}
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in list" @click="item.onClick">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/stores/index'
import {useRouter} from 'vue-router'
import { LoginOut } from '@/api/Login'
import { ElMessage } from 'element-plus'
const store = useStore()
const router=useRouter()
const username = store.login.username || ''
const list = ref([
  {
    label: '退出登录',
    onClick:async () => {
      let params={
        token:localStorage.getItem('token')||store.login.token||''
      }
      let res = await LoginOut(params) as any
      ElMessage.success(res.retMsg||'退出登录成功！')
      localStorage.clear()
      router.push({name:'Login'})
    },
  },
])
</script>

<style scoped lang="scss">
.el-dropdown-list {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
