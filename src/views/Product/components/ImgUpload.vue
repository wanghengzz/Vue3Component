<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-28 15:12:48
 * @Description: 
 * @FilePath: \vue3-project\src\views\Product\components\ImgUpload.vue
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
  <div class="ImgUpload">
    <UploadImgList
      :auto-upload="false"
      :upload-url="uploadUrl"
      :max-size="2"
      @upload-success="handleUploadSuccess"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import UploadImgList from '@/components/UploadImgList.vue'
const uploadUrl = '/api/uploads/avatar'

const handleUploadSuccess = (response: any) => {
  console.log('上传成功:', response)
}

const handleDelete = () => {
  console.log('图片已删除')
}
</script>

<style lang="scss">
.ImgUpload {
  height: 100%;
}
</style>
