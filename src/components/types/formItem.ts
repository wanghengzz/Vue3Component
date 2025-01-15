interface OptionType {
  [key: string]: any
  label: string
  value: any
}

export interface FormItem {
  // 基础属性
  type:
    | 'input'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'date'
    | 'time'
    | 'textarea'
    | 'cascader'
    | 'slider'
    | 'autocomplete'
    | 'title'
    | 'slot' // 表单项类型
  label: string // 标签文本
  prop: string // 表单域字段名
  placeholder?: string // 输入框占位文本
  span?: number // 栅格占据的列数
  disabled?: boolean // 是否禁用
  clearable?: boolean // 是否可清空
  inputMethod?: (val: any) => void // 输入框输入方法
  reg?: RegExp | string // 正则表达式
  // 选项相关属性
  options?: OptionType[] // 选项数组，用于select/radio/checkbox等
  labelKey?: string // 选项标签的键名
  valueKey?: string // 选项值的键名
  multiple?: boolean // 是否多选
  multipleLimit?: number // 多选时用户最多可以选择的项目数

  // 过滤相关属性
  filterable?: boolean // 是否可搜索
  filterMethod?: (query: string, item: any) => boolean // 自定义搜索方法
  filterPlaceholder?: string // 搜索框占位文本
  remote?: boolean // 是否为远程搜索
  remoteMethod?: (query: string) => void // 远程搜索方法
  loading?: boolean // 是否正在从远程获取数据

  // 日期时间相关属性
  dateType?: 'date' | 'datetime' | 'daterange' | 'datetimerange' // 日期选择类型
  timeType?: 'time' | 'timerange' // 时间选择类型

  // 文本域特有属性
  rows?: number // 输入框行数，仅 type="textarea" 时有效

  // 下拉框位置
  placement?:
    | 'top'
    | 'bottom'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end' // 下拉框出现的位置

  // 数值滑块相关属性
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 步长
  showInput?: boolean // 是否显示输入框
  showInputControls?: boolean // 是否显示输入框的控制按钮

  // 级联选择器相关属性
  showAllLevels?: boolean // 输入框中是否显示选中值的完整路径

  // 自动完成相关属性
  fetchSuggestions?: (
    query: string,
    callback: (suggestions: any[]) => void
  ) => void // 返回输入建议的方法
  selectMethod?: (item: any) => void // 选中项变化时触发

  // 自定义内容相关属性
  contentKey?: string | string[] // 内容键名
  slotName?: string // 插槽名称
}
