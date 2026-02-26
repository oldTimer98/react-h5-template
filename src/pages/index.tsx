import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Space } from 'antd-mobile'
import { Icon } from '@iconify/react'
import { useCounterStore } from '@/stores/useCounterStore'
import reactLogo from '@/assets/react.svg'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="min-h-screen bg-bg">
      <div
        className="pt-[48px] pb-[32px] px-[16px] text-center"
        style={{
          background: 'linear-gradient(135deg, #e8f0fe 0%, #f0e6ff 50%, #fce4ec 100%)',
        }}
      >
        <div className="flex items-center justify-center gap-[16px] mb-[12px]">
          <img src={reactLogo} alt="React" className="w-[48px] h-[48px]" />
          <Icon icon="carbon:add" className="text-[20px] text-text-secondary" />
          <img src="/vite.svg" alt="Vite" className="w-[48px] h-[48px]" />
        </div>
        <h1 className="text-[22px] font-bold text-text mb-[6px]">React H5 Template</h1>
        <p className="text-[13px] text-text-secondary">
          Vite + React + TanStack Router + Zustand + antd-mobile
        </p>
      </div>

      <div className="p-[16px] flex flex-col gap-[12px]">
        <div className="bg-bg-card rounded-[12px] p-[20px] shadow-sm">
          <h2 className="text-[15px] font-semibold text-text mb-[16px]">Zustand 状态管理</h2>
          <div className="flex items-center justify-center gap-[16px] mb-[12px]">
            <Button color="primary" size="small" onClick={decrement}>
              -1
            </Button>
            <span className="text-[28px] font-bold text-primary min-w-[48px] text-center tabular-nums">
              {count}
            </span>
            <Button color="primary" size="small" onClick={increment}>
              +1
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Button size="small" fill="outline" onClick={reset}>
              重置计数
            </Button>
          </div>
        </div>

        <div className="bg-bg-card rounded-[12px] p-[20px] shadow-sm">
          <h2 className="text-[15px] font-semibold text-text mb-[16px]">功能演示</h2>
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
                <span className="flex items-center justify-center gap-[6px]">
                  <Icon icon="carbon:color-palette" className="text-[16px]" />
                  Iconify 图标
                </span>
              </Button>
            </Link>
            <Link to="/about">
              <Button block fill="none">
                <span className="text-text-secondary text-[14px]">关于 →</span>
              </Button>
            </Link>
          </Space>
        </div>
      </div>
    </div>
  )
}
