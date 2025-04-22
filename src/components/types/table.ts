export interface TableItem {
  prop: string
  label: string
  width?: string
  align?: string
  type?: string
  slotName?: string
  fixed?: boolean | string
  filters?: boolean
  sortable?: boolean
  filterMultiple?: boolean
  filteredValue?: any[]
  children?: TableItem[]
}
