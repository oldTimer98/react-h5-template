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
import todoApi from '@/api/todoApi'
import postApi from '@/api/postApi'

export const Route = createFileRoute('/demo/api')({
  component: ApiDemoPage,
})

function ApiDemoPage() {
  const navigate = Route.useNavigate()

  return (
    <div className="min-h-screen bg-#f5f5f5">
      <NavBar onBack={() => navigate({ to: '/demo/home' })}>API 请求示例</NavBar>
      <div className="p-16px flex flex-col gap-16px">
        <TodoListSection />
        <CreateTodoSection />
        <CreatePostSection />

        <div className="text-center">
          <Link to="/" className="color-primary text-14px">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// GET 请求 — useGet + todoApi
// ============================================================
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
        <div className="flex-center py-20px">
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

      <p className="mt-8px px-12px text-12px color-#999">
        useGet(['todos'], () =&gt; todoApi.getList())
      </p>
    </Card>
  )
}

// ============================================================
// POST 请求 — useMutate + invalidateKeys
// ============================================================
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
      <div className="flex gap-8px">
        <div className="flex-1">
          <Input placeholder="输入 Todo 标题" value={title} onChange={setTitle} clearable />
        </div>
        <Button color="primary" size="small" loading={isPending} onClick={handleCreate}>
          创建
        </Button>
      </div>
      <p className="mt-8px text-12px color-#999">
        useMutate(data =&gt; todoApi.create(data), {'{'} invalidateKeys: [['todos']] {'}'})
      </p>
    </Card>
  )
}

// ============================================================
// POST 请求 — 另一个模块，展示返回数据
// ============================================================
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
          <div className="bg-#f0f5ff rounded-8px p-12px text-13px">
            <p className="color-#333 font-500">返回数据：</p>
            <pre className="mt-4px color-#666 whitespace-pre-wrap">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </Space>

      <Divider />
      <p className="text-12px color-#999">useMutate(data =&gt; postApi.create(data))</p>
    </Card>
  )
}
