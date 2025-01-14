// 递归获取所有 .vue 组件，包括子目录
const components = import.meta.glob('./**/*.vue', { eager: true })

// 导出组件对象和注册函数
export default {
  // 导出所有组件
  components: Object.fromEntries(
    Object.entries(components).map(([path, module]) => {
      // 提取组件名称（移除路径和.vue后缀）
      const componentName = path.replace(/^\.\/(.*)\.vue$/, '$1').split('/').pop()
      return [componentName, (module as any).default]
    })
  ),
  
  // 注册函数
  install(app: any) {
    Object.entries(components).forEach(([path, module]) => {
      const componentName = path.replace(/^\.\/(.*)\.vue$/, '$1').split('/').pop()
      app.component(componentName, (module as any).default)
    })
  }
}
