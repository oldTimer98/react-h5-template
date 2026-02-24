import { createRootRoute, Outlet } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const TanStackRouterDevtools =
  import.meta.env.VITE_ENABLE_DEVTOOLS === 'true'
    ? lazy(() =>
        import('@tanstack/router-devtools').then((mod) => ({
          default: mod.TanStackRouterDevtools,
        })),
      )
    : () => null

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  )
}
