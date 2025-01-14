interface OptionType {
  [key: string]: any;
  label: string;
  value: any;
}

export interface FormItem {
  type: 'input' | 'select' | 'radio' | 'checkbox' | 'switch' | 'date' | 'time' | 'textarea' | 'cascader' | 'slider' | 'autocomplete'
  label: string
  prop: string
  placeholder?: string
  options?: OptionType[]
  span?: number
  rows?: number
  disabled?: boolean
  clearable?: boolean
  dateType?: 'date' | 'datetime' | 'daterange' | 'datetimerange'
  timeType?: 'time' | 'timerange'
  multiple?: boolean
  multipleLimit?: number
  filterable?: boolean
  filterMethod?: (query: string, item: any) => boolean
  filterPlaceholder?: string
  remote?: boolean
  remoteMethod?: (query: string) => void
  loading?: boolean
  placement?: 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  labelKey?: string 
  valueKey?: string
  min?: number
  max?: number
  step?: number
  showInput?: boolean
  showInputControls?: boolean
  showAllLevels?: boolean
  fetchSuggestions?: (query: string, callback: (suggestions: any[]) => void) => void
  selectMethod?: (item: any) => void
  contentKey?: string | string[]
  contentValue?: string
}
