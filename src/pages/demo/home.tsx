import { createFileRoute, Link } from '@tanstack/react-router'
import { NavBar, Button, Toast, Dialog, Input, Card, Space } from 'antd-mobile'
import { useState } from 'react'

export const Route = createFileRoute('/demo/home')({
  component: DemoPage,
})

function DemoPage() {
  const navigate = Route.useNavigate()
  const [inputVal, setInputVal] = useState('')

  return (
    <div className="min-h-screen bg-bg">
      <NavBar onBack={() => navigate({ to: '/' })}>组件示例</NavBar>

      <div className="p-[16px] flex flex-col gap-[12px]">
        <Card title="按钮">
          <div className="flex flex-wrap gap-[8px]">
            <Button color="primary" size="small">
              主要
            </Button>
            <Button color="success" size="small">
              成功
            </Button>
            <Button color="warning" size="small">
              警告
            </Button>
            <Button color="danger" size="small">
              危险
            </Button>
          </div>
        </Card>

        <Card title="输入框">
          <Input placeholder="请输入内容" value={inputVal} onChange={setInputVal} clearable />
          {inputVal && (
            <p className="mt-[8px] text-[12px] text-text-tertiary">输入内容：{inputVal}</p>
          )}
        </Card>

        <Card title="反馈组件">
          <Space>
            <Button
              size="small"
              onClick={() => {
                Toast.show({ icon: 'success', content: '操作成功' })
              }}
            >
              Toast
            </Button>
            <Button
              size="small"
              onClick={async () => {
                const ok = await Dialog.confirm({ content: '确认执行此操作吗？' })
                if (ok) Toast.show({ content: '已确认' })
              }}
            >
              Dialog
            </Button>
          </Space>
        </Card>

        <Card title="更多示例">
          <Link to="/demo/api">
            <Button block color="primary">
              查看 API 请求示例 →
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
