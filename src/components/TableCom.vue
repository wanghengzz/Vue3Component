<!--
 * @Author: 
 * @Date: 2025-02-27 10:44:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-14 10:13:19
 * @Description: 
 * @FilePath: \vue3-project\src\components\TableCom.vue
-->
<template>
  <div class="table-container-com">
    <div>
      <el-table
        :data="tableData"
        :border="border"
        :stripe="stripe"
        style="width: 100%"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblClick"
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
          />
          <el-table-column
            v-else-if="item.children && item.children.length > 0"
            :key="item.prop || index"
            :label="item.label"
            :align="item.align || 'center'"
            :fixed="item.fixed"
          >
            <template v-for="(child, childIndex) in item.children" :key="childIndex">
              <el-table-column
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                :align="child.align || 'center'"
                :fixed="child.fixed"
                v-if="!child.slotName"
                show-overflow-tooltip
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
        :layout=paginationLayout
        :total="pagger.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineEmits } from 'vue'
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
  paginationLayout:{
    type:String,
    default:'total, sizes, prev, pager, next, jumper'
  }
})

const emit = defineEmits(['update:pagger', 'row-click', 'row-dblclick'])

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
