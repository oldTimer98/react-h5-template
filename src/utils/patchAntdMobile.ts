import { unstableSetRender } from 'antd-mobile'
import { createRoot } from 'react-dom/client'

/**
 * antd-mobile React 19 兼容补丁
 *
 * Toast、Dialog 等命令式组件内部依赖 ReactDOM.render，
 * React 19 已移除该 API，需通过 unstableSetRender 注册 createRoot 替代。
 *
 * 跟踪 issue: https://github.com/ant-design/ant-design-mobile/pull/6860
 * 等官方正式支持 React 19 后可删除此文件及 main.tsx 中的引用。
 */
export function patchAntdMobileForReact19() {
  unstableSetRender((node, container) => {
    const c = container as unknown as Record<string, ReturnType<typeof createRoot>>
    const root = (c._reactRoot ||= createRoot(container))
    root.render(node)
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
      root.unmount()
    }
  })
}
