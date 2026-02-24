/**
 * 移动端调试工具 eruda
 *
 * 通过环境变量 VITE_ENABLE_ERUDA 控制开关，
 * 也支持 URL 参数 ?eruda=true 临时开启（方便测试环境调试）。
 *
 * 使用动态 import，关闭时不会打包 eruda 代码。
 */
export async function initEruda() {
  const envEnabled = import.meta.env.VITE_ENABLE_ERUDA === 'true'
  const urlEnabled = new URLSearchParams(location.search).has('eruda')

  if (!envEnabled && !urlEnabled) return

  const { default: eruda } = await import('eruda')
  eruda.init()
}
