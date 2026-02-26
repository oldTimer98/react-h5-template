import { createFileRoute, Link } from '@tanstack/react-router'
import {
  NavBar,
  Button,
  Toast,
  Input,
  Card,
  List,
  DotLoading,
  Tag,
  Space,
  Divider,
  ErrorBlock,
} from 'antd-mobile'
import { useState } from 'react'
import { useGet, useMutate } from '@/hooks/useApi'
import todoApi from '@/api/todo'
import postApi from '@/api/post'

export const Route = createFileRoute('/demo/api')({
  component: ApiDemoPage,
})

function ApiDemoPage() {
  const navigate = Route.useNavigate()

  return (
    <div className="min-h-screen bg-bg">
      <NavBar onBack={() => navigate({ to: '/demo/home' })}>API 请求示例</NavBar>
      <div className="p-[16px] flex flex-col gap-[12px]">
        <TodoListSection />
        <CreateTodoSection />
        <CreatePostSection />

        <div className="text-center py-[8px]">
          <Link to="/" className="text-primary text-[14px]">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

function TodoListSection() {
  const { data, isLoading, isError, error, refetch } = useGet(['todos', { _limit: 5 }], () =>
    todoApi.getList({ _limit: 5 }),
  )

  return (
    <Card
      title="GET — Todo 列表"
      extra={
        <Button size="mini" onClick={() => void refetch()}>
          刷新
        </Button>
      }
    >
      {isLoading && (
        <div className="flex items-center justify-center py-[24px]">
          <DotLoading color="primary" />
        </div>
      )}

      {isError && (
        <ErrorBlock
          status="default"
          title="请求失败"
          description={error.message}
          style={{ '--image-height': '80px' }}
        />
      )}

      {data?.data && (
        <List>
          {data.data.map((todo) => (
            <List.Item
              key={todo.id}
              description={`ID: ${todo.id} · 用户: ${todo.userId}`}
              extra={
                <Tag color={todo.completed ? 'success' : 'default'}>
                  {todo.completed ? '已完成' : '未完成'}
                </Tag>
              }
            >
              {todo.title}
            </List.Item>
          ))}
        </List>
      )}

      <div className="mt-[8px] px-[12px]">
        <p className="text-[12px] text-text-tertiary bg-bg-code rounded-[6px] px-[8px] py-[4px] font-mono">
          useGet(['todos'], () =&gt; todoApi.getList())
        </p>
      </div>
    </Card>
  )
}

function CreateTodoSection() {
  const [title, setTitle] = useState('')

  const { mutate, isPending } = useMutate(
    (data: { title: string; userId: number; completed: boolean }) => todoApi.create(data),
    { invalidateKeys: [['todos']] },
  )

  const handleCreate = () => {
    if (!title.trim()) {
      Toast.show({ content: '请输入标题' })
      return
    }
    mutate(
      { title, userId: 1, completed: false },
      {
        onSuccess: (res) => {
          Toast.show({ icon: 'success', content: `创建成功 ID: ${res.data.id}` })
          setTitle('')
        },
      },
    )
  }

  return (
    <Card title="POST — 创建 Todo（自动刷新列表）">
      <div className="flex gap-[8px]">
        <div className="flex-1">
          <Input placeholder="输入 Todo 标题" value={title} onChange={setTitle} clearable />
        </div>
        <Button color="primary" size="small" loading={isPending} onClick={handleCreate}>
          创建
        </Button>
      </div>
      <div className="mt-[8px]">
        <p className="text-[12px] text-text-tertiary bg-bg-code rounded-[6px] px-[8px] py-[4px] font-mono">
          useMutate(fn, {'{'} invalidateKeys: [['todos']] {'}'})
        </p>
      </div>
    </Card>
  )
}

function CreatePostSection() {
  const {
    mutate,
    isPending,
    data: result,
  } = useMutate((data: { title: string; body: string; userId: number }) => postApi.create(data))

  return (
    <Card title="POST — 创建帖子（展示返回数据）">
      <Space direction="vertical" block>
        <Button
          color="primary"
          size="small"
          loading={isPending}
          onClick={() =>
            mutate(
              { title: `帖子 ${Date.now()}`, body: '内容', userId: 1 },
              { onSuccess: () => Toast.show({ icon: 'success', content: '创建成功' }) },
            )
          }
        >
          一键创建
        </Button>

        {result && (
          <div className="bg-[#f0f5ff] rounded-[8px] p-[12px] text-[13px]">
            <p className="text-text font-medium mb-[4px]">返回数据：</p>
            <pre className="text-text-secondary text-[12px] whitespace-pre-wrap font-mono leading-relaxed">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </Space>

      <Divider />
      <p className="text-[12px] text-text-tertiary bg-bg-code rounded-[6px] px-[8px] py-[4px] font-mono inline-block">
        useMutate(data =&gt; postApi.create(data))
      </p>
    </Card>
  )
}
