import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Space } from 'antd-mobile'
import { useCounterStore } from '@/stores/useCounterStore'
import reactLogo from '@/assets/react.svg'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="min-h-screen bg-#f5f5f5 p-16px">
      <div className="flex-col-center py-40px">
        <h1 className="text-24px font-bold color-#1a1a2e mb-8px">React H5 Template</h1>
        <div className="flex-center gap-12px mb-8px">
          <img src={reactLogo} alt="React" />
          <span className="i-carbon-add text-24px" />
          <img src="/vite.svg" alt="Vite" />
        </div>
        <p className="text-14px color-#666 mb-32px">
          Vite + React + TanStack Router + Zustand + antd-mobile
        </p>
      </div>

      <div className="bg-white rounded-12px p-20px mb-16px shadow-sm">
        <h2 className="text-16px font-600 color-#333 mb-16px">Zustand 状态管理</h2>
        <div className="flex-center gap-12px mb-16px">
          <Button color="primary" size="small" onClick={decrement}>
            -1
          </Button>
          <span className="text-24px font-bold color-primary min-w-60px text-center">{count}</span>
          <Button color="primary" size="small" onClick={increment}>
            +1
          </Button>
        </div>
        <div className="flex-center">
          <Button size="small" onClick={reset}>
            重置
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-12px p-20px mb-16px shadow-sm">
        <h2 className="text-16px font-600 color-#333 mb-16px">页面导航</h2>
        <Space direction="vertical" block>
          <Link to="/demo/home">
            <Button block color="default">
              组件示例
            </Button>
          </Link>
          <Link to="/demo/api">
            <Button block color="primary">
              API 请求示例
            </Button>
          </Link>
          <Link to="/demo/toolkit">
            <Button block color="primary" fill="outline">
              工具库示例
            </Button>
          </Link>
          <Link to="/demo/components">
            <Button block color="warning" fill="outline">
              公共组件
            </Button>
          </Link>
          <Link to="/demo/icons">
            <Button block color="success" fill="outline">
              <span className="flex-center gap-6px">
                <i className="i-carbon-color-palette text-16px" />
                Iconify 图标
              </span>
            </Button>
          </Link>
          <Link to="/about">
            <Button block color="default">
              关于
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  )
}
