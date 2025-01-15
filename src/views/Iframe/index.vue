<template>
  <div class="iframe">
    <iframe :src="iframeUrl" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

// 定义 props 接收 iframe 地址
defineProps<{
  iframeUrl: string
}>()

window.addEventListener('message', (e) => {
  console.log(e, '收到信息')
  if (typeof e.data.data === 'string') {
    ElMessage.success(e.data.data)
  }
  // 回复信息
  // 处理来自iframe的消息
  if (e.data.type === 'FROM_IFRAME') {
    console.log('收到iframe消息:', e.data.data);
    // 发送回复消息给iframe
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'FROM_PARENT',
        data: `这是父页面的回复${Math.random()}`,
      }, '*');
    }
  }
})
</script>