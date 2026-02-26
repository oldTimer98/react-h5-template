import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button, Card, Switch, Tag } from 'antd-mobile'
import PageContainer from '@/components/PageContainer'
import ErrorBoundary from '@/components/ErrorBoundary'

export const Route = createFileRoute('/demo/components')({
  component: ComponentsPage,
})

function BombComponent(): never {
  throw new Error('')
}

function PageContent() {
  const [loading, setLoading] = useState(true)
  const [showBack, setShowBack] = useState(true)
  const [safeBottom, setSafeBottom] = useState(true)
  const [showBomb, setShowBomb] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (showBomb) return <BombComponent />

  return (
    <PageContainer
      title="公共组件"
      right={<span className="text-[13px] text-text-tertiary">demo</span>}
      loading={loading}
      showBack={showBack}
      safeBottom={safeBottom}
    >
      <div className="flex flex-col gap-[12px]">
        <Card title="PageContainer 骨架屏">
          <div className="flex flex-col gap-[10px] text-[13px] text-text-secondary">
            <p>进入页面自动显示 1.5s 骨架屏，传 loading 属性控制。</p>
            <div className="bg-bg-code rounded-[8px] p-[12px] font-mono text-[12px] text-[#444]">
              {'<PageContainer title="标题" loading={isLoading}>'}
              <br />
              {'  {children}'}
              <br />
              {'</PageContainer>'}
            </div>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 1500)
              }}
            >
              再看一次骨架屏
            </Button>
          </div>
        </Card>

        <Card title="ErrorBoundary 错误边界">
          <div className="flex flex-col gap-[10px] text-[13px] text-text-secondary">
            <p>包裹在 App 最外层，当子组件渲染崩溃时自动捕获，显示整页的友好错误提示而不是白屏。</p>
            <div className="bg-bg-code rounded-[8px] p-[12px] font-mono text-[12px] text-[#444]">
              {'<ErrorBoundary>'}
              <br />
              {'  <App />'}
              <br />
              {'</ErrorBoundary>'}
            </div>
            <p className="text-[12px] text-text-tertiary">
              点击下方按钮模拟整页崩溃，点击「重新加载」可恢复：
            </p>
            <Button size="small" color="danger" onClick={() => setShowBomb(true)}>
              模拟组件崩溃（整页效果）
            </Button>
          </div>
        </Card>

        <Card title="PageContainer Props 控制">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text">显示返回按钮</span>
              <Switch checked={showBack} onChange={setShowBack} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text">底部安全区域</span>
              <Switch checked={safeBottom} onChange={setSafeBottom} />
            </div>
          </div>
        </Card>

        <Card title="功能说明">
          <div className="flex flex-col gap-[8px] text-[13px] text-text-secondary">
            <p>当前模板包含 2 个公共组件：</p>
            <div className="flex flex-wrap gap-[6px]">
              <Tag color="primary" fill="outline">
                PageContainer
              </Tag>
              <Tag color="primary" fill="outline">
                ErrorBoundary
              </Tag>
            </div>
            <p className="text-[12px] text-text-tertiary mt-[4px]">
              其他 UI 组件（空状态、加载更多、卡片等）直接使用 antd-mobile 即可。
            </p>
          </div>
        </Card>

        <Card title="PageContainer Props">
          <div className="flex flex-col font-mono text-[12px]">
            {[
              ['title?', 'string', '页面标题'],
              ['showBack?', 'boolean', '显示返回按钮 (true)'],
              ['onBack?', '() => void', '自定义返回'],
              ['right?', 'ReactNode', 'NavBar 右侧'],
              ['loading?', 'boolean', '骨架屏加载 (false)'],
              ['safeBottom?', 'boolean', '底部安全区 (true)'],
              ['className?', 'string', '内容区 class'],
              ['style?', 'CSSProperties', '内容区 style'],
            ].map(([name, type, desc]) => (
              <div
                key={name}
                className="flex items-start gap-[8px] py-[8px] border-b border-border-light last:border-b-0"
              >
                <span className="text-primary min-w-[76px] shrink-0">{name}</span>
                <span className="text-text-tertiary min-w-[86px] shrink-0">{type}</span>
                <span className="text-text-secondary">{desc}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}

function ComponentsPage() {
  return (
    <ErrorBoundary>
      <PageContent />
    </ErrorBoundary>
  )
}
