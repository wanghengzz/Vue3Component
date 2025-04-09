<template>
  <div class="login-page">
    <el-container class="login-container">
      <el-main>
        <div class="login-box">
          <h1 class="login-title">欢迎登录</h1>
          <el-form ref="ruleFormRef" :model="form" status-icon :rules="rules" label-width="auto" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" class="login-button">
                登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleRegister" class="login-button secondary">
                注册
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
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度为3到10位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 15, message: '密码长度为5到15位', trigger: 'blur' },
  ],
};
const handleLogin = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      store.login.login(form.value.username, form.value.password).then(() => {
        console.log('登录成功');
        router.push({ name: 'Home' });
        store.enum.setEnumData();
      });
    } else {
      return false;
    }
  });
};
const handleRegister = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      store.login.RegisterUser(form.value.username, form.value.password);
    } else {
      return false;
    }
  });
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(-45deg, #a8e6cf, #dcedc1, #ffd3b6, #ffaaa5);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-box {
  background: white;
  padding: 40px 35px;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.login-title {
  color: #4b5c6b;
  font-size: 28px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 600;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6c8ad7 0%, #9aa9d7 100%);
  border: none;
  margin-top: 12px;
  transition: all 0.3s ease;
}

.login-button.secondary {
  background: linear-gradient(135deg, #ff7c7c 0%, #ff5f5f 100%);
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(108, 138, 215, 0.3);
}

.login-button.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 92, 92, 0.3);
}

/* 添加输入框焦点样式 */
:deep(.el-input__inner:focus) {
  border-color: #6c8ad7;
  box-shadow: 0 0 6px rgba(108, 138, 215, 0.5);
}

/* 更加简洁的表单项间距 */
.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.el-input:focus {
  border-color: #6c8ad7;
}
</style>