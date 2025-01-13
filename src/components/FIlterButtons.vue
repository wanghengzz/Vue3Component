<template>
  <div class="filter-buttons">
    <el-button
      v-for="(item, index) in buttonList"
      :key="index"
      :type="item.selected ? 'primary' : 'default'" 
      @click="handleClick(item)"
      :class="{ 'is-active': item.selected }"
    >
      {{ item.label }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface ButtonItem {
  label: string
  value: string | number
  selected: boolean
}

const props = defineProps<{
  buttons: Array<ButtonItem>
  multiple?: boolean // 是否多选
  defaultAll?: boolean // 是否默认全选
}>()

const emit = defineEmits(['change'])

const buttonList = ref<ButtonItem[]>([
  { label: '全部', value: 'all', selected: props.defaultAll || false },
  ...props.buttons.map(btn => ({
    ...btn,
    selected: props.defaultAll || false
  }))
])

// 处理点击事件
const handleClick = (item: ButtonItem) => {
  if (item.value === 'all') {
    // 点击全部按钮
    const allSelected = !item.selected
    buttonList.value.forEach(btn => {
      btn.selected = allSelected
    })
  } else {
    if (props.multiple) {
      // 多选模式
      item.selected = !item.selected
      // 更新全部按钮状态
      const allBtn = buttonList.value[0]
      allBtn.selected = buttonList.value.slice(1).every(btn => btn.selected)
    } else {
      // 单选模式
      buttonList.value.forEach(btn => {
        btn.selected = btn === item
      })
    }
  }
  
  // 发送选中值
  emit('change', getSelectedValues())
}

// 获取选中的值
const getSelectedValues = () => {
  const selected = buttonList.value.filter(btn => btn.selected && btn.value !== 'all')
  return selected.map(btn => btn.value)
}

// 监听按钮数据变化
watch(() => props.buttons, (newVal) => {
  buttonList.value = [
    buttonList.value[0],
    ...newVal.map(btn => ({
      ...btn,
      selected: props.defaultAll || false
    }))
  ]
}, { deep: true })
</script>

<style scoped lang="scss">
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  :deep(.el-button) {
    &.is-active {
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      color: #fff;
      
      &:hover {
        background-color: var(--el-color-primary-light-3);
        border-color: var(--el-color-primary-light-3);
      }
    }
  }
}
</style>
