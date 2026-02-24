import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { patchAntdMobileForReact19 } from './utils/patchAntdMobile'
import { initEruda } from './utils/initEruda'
import App from './App'
import 'virtual:uno.css'
import 'antd-mobile/es/global'
import './styles/global.scss'

patchAntdMobileForReact19()
initEruda()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
