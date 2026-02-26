import { createFileRoute, Link } from '@tanstack/react-router'
import { NavBar, List } from 'antd-mobile'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const navigate = Route.useNavigate()

  const techStack = [
    { label: '构建工具', value: 'Vite 7' },
    { label: '框架', value: 'React 19' },
    { label: '路由', value: 'TanStack Router (文件路由)' },
    { label: '状态管理', value: 'Zustand' },
    { label: '数据请求', value: 'React Query + Axios' },
    { label: 'UI 组件', value: 'antd-mobile' },
    { label: '样式方案', value: 'Tailwind CSS + Sass' },
    { label: '代码规范', value: 'ESLint + Prettier + Husky' },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <NavBar onBack={() => navigate({ to: '/' })}>关于</NavBar>

      <div className="p-[16px]">
        <div className="bg-bg-card rounded-[12px] overflow-hidden shadow-sm">
          <List header="技术栈">
            {techStack.map((item) => (
              <List.Item key={item.label} extra={item.value}>
                {item.label}
              </List.Item>
            ))}
          </List>
        </div>

        <div className="mt-[20px] text-center">
          <Link to="/" className="text-primary text-[14px]">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
