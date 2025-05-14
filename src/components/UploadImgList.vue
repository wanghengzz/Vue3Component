<!--
 * @Author: 
 * @Date: 2025-04-28 14:02:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-28 15:17:17
 * @Description: 
 * @FilePath: \vue3-project\src\components\UploadImgList.vue
-->
<template>
  <div class="avatar-upload-container">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-change="handleChange"
      :auto-upload="autoUpload"
      accept=".jpg,.jpeg,.png,.gif"
      :headers="headers"
      ref="uploadRef"
    >
      <div class="preview-container" v-if="imageUrl">
        <img :src="imageUrl" class="avatar" />
        <div class="operation-layer">
          <el-icon class="operation-icon" @click.stop="handleDelete">
            <Delete />
          </el-icon>
          <el-icon
            v-if="!autoUpload && tempFile"
            class="operation-icon"
            @click.stop="handleUpload"
          >
            <Upload />
          </el-icon>
        </div>
      </div>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete, Upload } from '@element-plus/icons-vue'
import type { UploadProps, UploadInstance } from 'element-plus'
import { useStore } from '@/stores/index'
const store = useStore()
const props = defineProps({
  uploadUrl: {
    type: String,
    default: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
  maxSize: {
    type: Number,
    default: 2, // 默认2MB
  },
})

const emit = defineEmits(['update:imageUrl', 'upload-success', 'delete'])

const uploadRef = ref<UploadInstance>()
const imageUrl = ref('')
const tempFile = ref<File | null>(null)

const headers = computed(() => ({
  Authorization: `Bearer ${localStorage.getItem('token') || store.login.token || ''}`
}))

const handleChange: UploadProps['onChange'] = (rawFile) => {
  console.log(rawFile, 'rawFile')
  if (!rawFile.raw) return
  
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(rawFile.raw.type)) {
    ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片!')
    return false
  }
  if (rawFile.raw.size / 1024 / 1024 > props.maxSize) {
    ElMessage.error(`文件大小不能超过${props.maxSize}MB!`)
    return false
  }
  if (!props.autoUpload) {
    tempFile.value = rawFile.raw
    imageUrl.value = URL.createObjectURL(rawFile.raw)
  }
  console.log(imageUrl.value,'imageUrl.value');
  
}

// 上传成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // 实际项目中这里应该使用服务器返回的图片URL
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  tempFile.value = null
  emit('upload-success', response)
  ElMessage.success('上传成功')
}

// 手动触发上传
const handleUpload = (e: Event) => {
  e.stopPropagation()
  if (tempFile.value) {
    const formData = new FormData()
    formData.append('file', tempFile.value)
    uploadRef.value?.submit()
  }
}

// 删除图片
const handleDelete = (e: Event) => {
  e.stopPropagation()
  imageUrl.value = ''
  tempFile.value = null
  emit('delete')
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.avatar-upload-container {
  display: inline-block;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}

.preview-container {
  position: relative;
  width: 178px;
  height: 178px;
}

.preview-container:hover .operation-layer {
  opacity: 1;
}

.operation-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.operation-icon {
  color: #fff;
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
}

.operation-icon:hover {
  color: var(--el-color-primary);
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
