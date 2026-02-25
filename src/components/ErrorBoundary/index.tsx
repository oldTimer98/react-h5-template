import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button, ErrorBlock } from 'antd-mobile'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <ErrorBlock
        fullPage
        status="default"
        title="页面出了点问题"
        description={this.state.error?.message || '发生了未知错误'}
      >
        <Button color="primary" size="small" onClick={() => window.location.reload()}>
          重新加载
        </Button>
      </ErrorBlock>
    )
  }
}
