<!--
 * @Author: 
 * @Date: 2025-02-27 10:44:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-22 15:57:23
 * @Description: 
 * @FilePath: \vue3-project\src\components\TableCom.vue
-->
<template>
  <div class="table-container-com">
    <div>
      <el-table
        :data="processedData.length ? processedData : tableData"
        :border="border"
        :stripe="stripe"
        style="width: 100%"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblClick"
        @sort-change="handleSortChange"
        :row-key="rowKey"
        :tree-props="{ children: treeChildKey }"
        height="100%"
        :max-height="maxHeight"
        virtual-scrolling
        :scroll-options="{
          scrollToIndex: 0,
          cache: 20,
          estimatedItemSize: 50,
        }"
      >
        <el-table-column
          v-if="showIndex"
          type="index"
          :label="`序号`"
          :width="80"
          align="center"
        />
        <el-table-column
          v-if="showSelect"
          type="selection"
          :width="80"
          align="center"
        />
        <template v-for="(item, index) in tableColumn">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            v-if="!item.slotName && !item.children"
            :align="item.align || 'center'"
            :fixed="item.fixed"
            show-overflow-tooltip
            :sortable="item.sortable"
            :filters="item.filters"
            :filter-method="item.filters ? ((value: string | number | boolean | any[], row: Record<string, any>) => filterHandler(value, row, item.prop)) : undefined"
            :filter-multiple="item.filterMultiple !== false"
          />
          <el-table-column
            v-else-if="item.children && item.children.length > 0"
            :key="item.prop || index"
            :label="item.label"
            :align="item.align || 'center'"
            :fixed="item.fixed"
          >
            <template
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
            >
              <el-table-column
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                :align="child.align || 'center'"
                :fixed="child.fixed"
                v-if="!child.slotName"
                show-overflow-tooltip
                :sortable="child.sortable"
                :filters="child.filters"
                :filter-method="child.filters ? ((value: string | number | boolean | any[], row: Record<string, any>) => filterHandler(value, row, child.prop)) : undefined"
                :filter-multiple="child.filterMultiple !== false"
              />
              <el-table-column
                v-else
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                :align="child.align || 'center'"
                :fixed="child.fixed"
              >
                <template #default="scope">
                  <slot :name="child.slotName" v-bind="scope"></slot>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align || 'center'"
            :fixed="item.fixed"
          >
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div v-if="showPagination">
      <el-pagination
        v-model:current-page="pagger.currentPage"
        v-model:page-size="pagger.pageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :total="pagger.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineEmits, onMounted, ref, watch } from 'vue'
import type { TableItem } from './types/table'

const props = defineProps({
  tableData: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  tableColumn: {
    type: Array as PropType<TableItem[]>,
    default: () => [],
  },
  border: {
    type: Boolean,
    default: true,
  },
  stripe: {
    type: Boolean,
    default: true,
  },
  pagger: {
    type: Object,
    default: () => ({
      pageSize: 20,
      currentPage: 1,
      total: 0,
    }),
  },
  pageSizes: {
    type: Array,
    default: () => [20, 40, 60, 80],
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  showSelect: {
    type: Boolean,
    default: false,
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  treeChildKey: {
    type: String,
    default: 'children',
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  maxHeight: {
    type: [String, Number],
    default: '100%',
  },
})

const emit = defineEmits(['update:pagger', 'row-click', 'row-dblclick'])

const worker = ref<Worker | null>(null)
const loading = ref(false)
const processedData = ref<any[]>([])

const handleSizeChange = (val: number) => {
  props.pagger.currentPage = 1
  props.pagger.pageSize = val
  emit('update:pagger', props.pagger)
}
const handleCurrentChange = (val: number) => {
  props.pagger.currentPage = val
  emit('update:pagger', props.pagger)
}

const handleRowClick = (row: any, column: any, event: Event) => {
  emit('row-click', row, column, event)
}

const handleRowDblClick = (row: any, column: any, event: Event) => {
  emit('row-dblclick', row, column, event)
}

// 排序处理

const handleSortChange = ({
  prop,
  order,
}: {
  prop: string
  order: 'ascending' | 'descending' | null
}) => {
  if (order) {
    handleSort(prop, order)
  } else {
    processedData.value = [...props.tableData]
  }
}
const handleSort = (field: string, order: 'ascending' | 'descending') => {
  if (!worker.value) return
  loading.value = true
  try {
    const cloneableData = JSON.parse(JSON.stringify(props.tableData))
    worker.value.postMessage({
      type: 'sort',
      data: cloneableData,
      options: {
        sortField: field,
        sortOrder: order,
      },
    })
  } catch (error) {
    console.error('排序处理错误:', error)
    loading.value = false
  }
}

// 过滤处理
const filterHandler = (
  value: string | number | boolean | any[],
  row: Record<string, any>,
  prop: string
) => {
  // 如果没有选择过滤值，返回 true 显示所有数据
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return true
  }

  try {
    if (typeof value === 'string') {
      if (value.includes('*')) {
        // 通配符过滤
        const regex = new RegExp(value.replace(/\*/g, '.*'), 'i')
        return regex.test(row[prop])
      }else if(value.includes('-')){
        let [min, max] = value.split('-');
        return row[prop] >= Number(min) && row[prop] <= Number(max);
      }else {
        // 默认字符串过滤
        return row[prop].includes(value)
      }
    } else if (Array.isArray(value)) {
      // 多选过滤
      return value.includes(row[prop])
    } else {
      // 单值过滤
      return row[prop] === value
    }
  } catch (error) {
    console.error('过滤处理错误:', error)
    return false
  }
}

// 监听 Worker 消息
onMounted(() => {
  worker.value = new Worker(new URL('../workers/tableWorker.ts', import.meta.url), { type: 'module' })

  worker.value.onmessage = (e: MessageEvent) => {
    const { type, data } = e.data
    loading.value = false

    switch (type) {
      case 'sort':
        processedData.value = data
        break
    }
  }
})

// 添加 watch 来初始化数据
watch(
  () => props.tableData,
  (newData) => {
    processedData.value = [...newData]
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.table-container-com {
  display: flex;
  flex-direction: column;
  height: 100% !important;
  width: 100%;
  & > div:nth-child(1) {
    height: 95%;
    display: flex;
    overflow: hidden;
    .el-table {
      height: 100%;
    }
  }
  & > div:nth-child(2) {
    height: 5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
