/*
 * @Author:
 * @Date: 2024-11-12 14:45:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-13 09:40:17
 * @Description:
 * @FilePath: \vue3-project\src\components\helper\button.ts
 */
export interface ButtonType {
  text: string
  type: 'primary' | 'danger' | 'warning' | 'success'
  disabled?: boolean
  onClick?: () => void
}

interface Options {
  label: string
  value: string,
  disabled:boolean
}

type formType =
  | 'input'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'date'
  | 'time'
  | 'datetime'
  | 'slot'
  | 'number'
  |'rate'
  |"slider"
  |'color'
  |'cascader'
  |'transfer'

export interface FormItem {
  // 基础属性
  label: string // 表单项标签
  type: formType // 表单项类型
  placeholder?: string // 占位提示
  disabled?: boolean // 是否禁用
  clearable?: boolean // 是否可清空
  elCol?: number // 栅格布局列数

  // 输入框相关
  maxlength?: number // 最大输入长度
  showWordLimit?: boolean // 是否显示字数统计
  input?: (v: string) => void // 输入事件回调

  // 选择器相关
  multiple?: boolean // 是否多选
  collapseTags?: boolean // 多选时是否折叠标签
  options?: Options[] // 选项数据

  // 开关相关
  activeText?: string // 开启时的文字描述
  inactiveText?: string // 关闭时的文字描述
  activeValue?: string | number | boolean // 开启时的值
  inactiveValue?: string | number | boolean // 关闭时的值

  // 日期选择器相关
  dateType?: 'date' | 'datetime' | 'week' | 'month' | 'year' | 'dates' // 日期类型
  format?: string // 显示格式
  valueFormat?: string // 值格式
  startPlaceholder?: string // 范围选择时开始日期占位内容
  endPlaceholder?: string // 范围选择时结束日期占位内容

  // 数字输入框相关
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 步长
  precision?: number // 精度

  // 评分相关
  allowHalf?: boolean // 是否允许半选
  showText?: boolean // 是否显示辅助文字

  // 滑块相关
  showStops?: number // 是否显示间断点

  // 颜色选择器相关
  showAlpha?: boolean // 是否支持透明度选择

  // 级联选择器相关
  props?: Record<string, any> // 配置选项

  controls?: boolean // 是否显示控制按钮

  range?: boolean // 是否范围选择

  rows?: number // 文本域行数
}

export interface FormType {
  validate: () => boolean
  reset: () => void
}

export type Form<T> = {
  [K in keyof T]: Partial<FormItem>
}
