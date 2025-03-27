<template>
  <div class="login-page">
    <el-container class="login-container">
      <el-main>
        <div class="login-box">
          <h1 class="login-title">欢迎登录</h1>
          <el-form ref="ruleFormRef" :model="form" status-icon :rules="rules" label-width="auto"
            class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="form.password" type="password"  />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" class="login-button">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index';
const router = useRouter();
const store = useStore();
const ruleFormRef = ref(null);
const form = ref({
  username: '',
  password: ''
});
const rules={
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度为三到五位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 15, message: '长度为三到五位', trigger: 'blur' },
  ],
}
const handleLogin = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      store.login.login(form.value.username, form.value.password).then(() => {
        console.log('登录成功');
        router.push({ name: 'Home' });
        store.enum.setEnumData()
      })
    } else {
      return false;
    }
  })
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  /* 更改为柔和的渐变背景 */
  background: linear-gradient(135deg, #E6E9F0 0%, #EEF1F5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  /* 调整阴影使其更柔和 */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.login-title {
  /* 调整标题颜色使其更柔和 */
  color: #5a6c84;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
}


.login-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  border-radius: 8px;
  /* 更改为柔和的渐变按钮 */
  background: linear-gradient(135deg, #88a2d0 0%, #a5b6da 100%);
  border: none;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  /* 添加柔和的阴影效果 */
  box-shadow: 0 4px 12px rgba(136, 162, 208, 0.3);
}

/* 添加输入框焦点样式 */
:deep(.el-input__inner:focus) {
  border-color: #88a2d0;
}
</style>