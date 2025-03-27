export interface TableItem {
  prop: string
  label: string
  width?: string
  align?: string
  type?: string
  slotName?: string
  fixed?:boolean|string,
  children?: TableItem[]
}
