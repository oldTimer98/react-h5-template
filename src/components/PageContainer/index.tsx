import type { CSSProperties, ReactNode } from 'react'
import { NavBar, SafeArea, Skeleton } from 'antd-mobile'
import { useRouter } from '@tanstack/react-router'
import { clsx } from 'clsx'

interface PageContainerProps {
  /** 页面标题（不传则不渲染 NavBar） */
  title?: string
  /** 是否显示返回按钮，默认 true */
  showBack?: boolean
  /** 自定义返回行为 */
  onBack?: () => void
  /** NavBar 右侧内容 */
  right?: ReactNode
  /** 是否启用底部安全区域，默认 true */
  safeBottom?: boolean
  /** 是否显示骨架屏加载态 */
  loading?: boolean
  /** 内容区域额外 className */
  className?: string
  /** 内容区域额外 style */
  style?: CSSProperties
  children?: ReactNode
}

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={3} animated />
      <div className="flex gap-[12px]">
        <Skeleton animated style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
        <div className="flex-1 flex flex-col gap-[8px]">
          <Skeleton.Title animated />
          <Skeleton.Paragraph lineCount={2} animated />
        </div>
      </div>
      <Skeleton.Paragraph lineCount={4} animated />
      <div className="flex gap-[12px]">
        <Skeleton animated style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
        <div className="flex-1 flex flex-col gap-[8px]">
          <Skeleton.Title animated />
          <Skeleton.Paragraph lineCount={2} animated />
        </div>
      </div>
    </div>
  )
}

export default function PageContainer({
  title,
  showBack = true,
  onBack,
  right,
  safeBottom = true,
  loading = false,
  className,
  style,
  children,
}: PageContainerProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {title && (
        <NavBar
          onBack={showBack ? handleBack : undefined}
          backIcon={showBack ? undefined : null}
          right={right}
        >
          {title}
        </NavBar>
      )}
      <div className={clsx('flex-1', !loading && 'p-[16px]', className)} style={style}>
        {loading ? <PageSkeleton /> : children}
      </div>
      {safeBottom && <SafeArea position="bottom" />}
    </div>
  )
}
