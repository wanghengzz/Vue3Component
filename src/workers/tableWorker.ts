/*
 * @Author: 
 * @Date: 2025-04-22 09:51:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-22 10:35:19
 * @Description: 
 * @FilePath: \vue3-project\src\workers\tableWorker.ts
 */
type WorkerMessage = {
  type: 'process' | 'sort' | 'filter';
  data: any[];
  options?: {
    sortField?: string;
    sortOrder?: 'ascending' | 'descending';
    filterConditions?: Record<string, any>;
  };
}

self.onmessage = function(e: MessageEvent<WorkerMessage>) {
  const { type, data, options } = e.data;
  let result = [...data];

  switch (type) {
    case 'sort':
      if (options?.sortField && options.sortOrder) {
        result.sort((a, b) => {
          const aValue = Number(a[options.sortField!]);
          const bValue = Number(b[options.sortField!]);
          
          // 处理数字排序
          if (!isNaN(aValue) && !isNaN(bValue)) {
            return options.sortOrder === 'ascending' 
              ? aValue - bValue 
              : bValue - aValue;
          }
          
          // 非数字的情况使用字符串排序
          return options.sortOrder === 'ascending'
            ? String(a[options.sortField!]).localeCompare(String(b[options.sortField!]))
            : String(b[options.sortField!]).localeCompare(String(a[options.sortField!]));
        });
      }
      break;

    case 'filter':
      if (options?.filterConditions) {
        result = result.filter(item => {
          return Object.entries(options.filterConditions!).every(([key, value]) => {
            if (!value || value.length === 0) return true;
            
            const itemValue = item[key];
            
            // 处理数组类型的过滤值（多选）
            if (Array.isArray(value)) {
              return value.includes(itemValue);
            }
            
            // 处理范围类型的过滤值
            if (typeof value === 'object' && value.min !== undefined) {
              return itemValue >= value.min && itemValue <= value.max;
            }
            
            // 处理普通值的过滤
            return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
          });
        });
      }
      break;
  }

  self.postMessage({
    type,
    data: result
  });
} 