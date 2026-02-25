import { createFileRoute } from '@tanstack/react-router'
import { NavBar, Card, Tag, Toast } from 'antd-mobile'
import { useState } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/demo/icons')({
  component: IconsPage,
})

type IconItem = { class: string; name: string }

const ICON_GROUPS: { title: string; icons: IconItem[] }[] = [
  {
    title: '通用操作',
    icons: [
      { class: 'i-carbon-add', name: 'add' },
      { class: 'i-carbon-close', name: 'close' },
      { class: 'i-carbon-checkmark', name: 'checkmark' },
      { class: 'i-carbon-edit', name: 'edit' },
      { class: 'i-carbon-trash-can', name: 'trash-can' },
      { class: 'i-carbon-download', name: 'download' },
      { class: 'i-carbon-share', name: 'share' },
      { class: 'i-carbon-copy', name: 'copy' },
      { class: 'i-carbon-filter', name: 'filter' },
      { class: 'i-carbon-search', name: 'search' },
      { class: 'i-carbon-overflow-menu-vertical', name: 'more' },
      { class: 'i-carbon-renew', name: 'renew' },
    ],
  },
  {
    title: '导航 & 方向',
    icons: [
      { class: 'i-carbon-home', name: 'home' },
      { class: 'i-carbon-arrow-left', name: 'arrow-left' },
      { class: 'i-carbon-arrow-right', name: 'arrow-right' },
      { class: 'i-carbon-chevron-right', name: 'chevron-right' },
      { class: 'i-carbon-chevron-down', name: 'chevron-down' },
      { class: 'i-carbon-launch', name: 'launch' },
      { class: 'i-carbon-location', name: 'location' },
      { class: 'i-carbon-map', name: 'map' },
    ],
  },
  {
    title: '用户 & 社交',
    icons: [
      { class: 'i-carbon-user-avatar', name: 'user-avatar' },
      { class: 'i-carbon-user', name: 'user' },
      { class: 'i-carbon-group', name: 'group' },
      { class: 'i-carbon-chat', name: 'chat' },
      { class: 'i-carbon-notification', name: 'notification' },
      { class: 'i-carbon-email', name: 'email' },
      { class: 'i-carbon-phone', name: 'phone' },
      { class: 'i-carbon-star', name: 'star' },
      { class: 'i-carbon-favorite', name: 'favorite' },
      { class: 'i-carbon-thumbs-up', name: 'thumbs-up' },
    ],
  },
  {
    title: '媒体 & 设备',
    icons: [
      { class: 'i-carbon-camera', name: 'camera' },
      { class: 'i-carbon-image', name: 'image' },
      { class: 'i-carbon-video', name: 'video' },
      { class: 'i-carbon-music', name: 'music' },
      { class: 'i-carbon-mobile', name: 'mobile' },
      { class: 'i-carbon-wifi', name: 'wifi' },
      { class: 'i-carbon-wifi-off', name: 'wifi-off' },
      { class: 'i-carbon-sun', name: 'sun' },
      { class: 'i-carbon-moon', name: 'moon' },
      { class: 'i-carbon-settings', name: 'settings' },
    ],
  },
  {
    title: '商业 & 状态',
    icons: [
      { class: 'i-carbon-shopping-cart', name: 'shopping-cart' },
      { class: 'i-carbon-wallet', name: 'wallet' },
      { class: 'i-carbon-gift', name: 'gift' },
      { class: 'i-carbon-calendar', name: 'calendar' },
      { class: 'i-carbon-time', name: 'time' },
      { class: 'i-carbon-warning', name: 'warning' },
      { class: 'i-carbon-information', name: 'information' },
      { class: 'i-carbon-checkmark-filled', name: 'checkmark-filled' },
      { class: 'i-carbon-close-filled', name: 'close-filled' },
      { class: 'i-carbon-locked', name: 'locked' },
    ],
  },
]

function IconsPage() {
  const navigate = Route.useNavigate()
  const [activeGroup, setActiveGroup] = useState(0)
  const [iconSize, setIconSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [iconColor, setIconColor] = useState('#333')

  const sizeClass = { sm: 'text-20px', md: 'text-28px', lg: 'text-40px' }[iconSize]

  const colorOptions = [
    { label: '默认', value: '#333' },
    { label: '主色', value: '#1677ff' },
    { label: '成功', value: '#52c41a' },
    { label: '警告', value: '#faad14' },
    { label: '危险', value: '#ff4d4f' },
    { label: '紫色', value: '#9B8EC1' },
  ]

  const handleCopy = (iconClass: string) => {
    const text = `<i className="${iconClass}" />`
    navigator.clipboard.writeText(text).then(() => {
      Toast.show({ content: '已复制', duration: 800 })
    })
  }

  return (
    <div className="min-h-screen bg-#f5f5f5">
      <NavBar onBack={() => navigate({ to: '/' })}>Iconify 图标</NavBar>

      <div className="p-16px flex flex-col gap-16px">
        <Card title="使用方式">
          <div className="flex flex-col gap-8px text-13px color-#666">
            <p>
              基于 UnoCSS <code className="bg-#f0f0f0 px-4px py-2px rounded-4px">presetIcons</code>
              ，纯 CSS 图标，零 JS 开销。
            </p>
            <div className="bg-#f8f8f8 rounded-8px p-12px font-mono text-12px color-#444">
              <p className="color-#999 mb-4px">{'// class 方式'}</p>
              <p>{'<i className="i-carbon-home text-24px color-primary" />'}</p>
              <p className="color-#999 mt-8px mb-4px">{'// attributify 方式'}</p>
              <p>{'<i i-carbon-home text-24px color-primary />'}</p>
            </div>
            <p className="mt-4px">
              <span className="i-carbon-launch mr-4px" />
              图标搜索：
              <a
                href="https://icones.js.org/collection/carbon"
                target="_blank"
                rel="noreferrer"
                className="color-primary underline"
              >
                icones.js.org/collection/carbon
              </a>
            </p>
            <p className="text-12px color-#999">
              当前仅内置 Carbon 图标集，如需其他图标集可安装对应 @iconify-json/* 包。
            </p>
          </div>
        </Card>

        <Card title="样式控制">
          <div className="flex flex-col gap-12px">
            <div>
              <p className="text-12px color-#999 mb-6px">大小</p>
              <div className="flex gap-8px">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <Tag
                    key={s}
                    color={iconSize === s ? 'primary' : 'default'}
                    onClick={() => setIconSize(s)}
                    className="cursor-pointer"
                  >
                    {{ sm: '20px', md: '28px', lg: '40px' }[s]}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="text-12px color-#999 mb-6px">颜色</p>
              <div className="flex gap-8px flex-wrap">
                {colorOptions.map((c) => (
                  <motion.div
                    key={c.value}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIconColor(c.value)}
                    className={clsx(
                      'flex items-center gap-4px px-8px py-4px rounded-full text-12px cursor-pointer border border-solid',
                      iconColor === c.value ? 'border-primary bg-#e6f4ff' : 'border-#eee bg-white',
                    )}
                  >
                    <span
                      className="w-12px h-12px rounded-full inline-block"
                      style={{ backgroundColor: c.value }}
                    />
                    {c.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-8px overflow-x-auto pb-4px">
          {ICON_GROUPS.map((group, idx) => (
            <Tag
              key={group.title}
              color={activeGroup === idx ? 'primary' : 'default'}
              onClick={() => setActiveGroup(idx)}
              className="cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              {group.title}
            </Tag>
          ))}
        </div>

        <Card title={ICON_GROUPS[activeGroup].title}>
          <motion.div
            key={activeGroup}
            className="grid gap-12px"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {ICON_GROUPS[activeGroup].icons.map((icon) => (
              <motion.div
                key={icon.class}
                whileTap={{ scale: 0.85 }}
                onClick={() => handleCopy(icon.class)}
                className="flex-col-center gap-6px py-12px rounded-8px bg-#fafafa cursor-pointer active:bg-#f0f0f0"
              >
                <i className={clsx(icon.class, sizeClass)} style={{ color: iconColor }} />
                <span className="text-10px color-#999 text-center text-ellipsis max-w-full px-2px">
                  {icon.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-11px color-#bbb mt-12px text-center">点击图标复制使用代码</p>
        </Card>

        <Card title="实际使用场景">
          <div className="flex flex-col gap-16px">
            <div>
              <p className="text-12px color-#999 mb-8px">底部导航栏</p>
              <div className="flex justify-around bg-white rounded-12px py-8px shadow-sm border border-solid border-#f0f0f0">
                {[
                  { icon: 'i-carbon-home', label: '首页', active: true },
                  { icon: 'i-carbon-search', label: '发现', active: false },
                  { icon: 'i-carbon-add-alt', label: '发布', active: false },
                  { icon: 'i-carbon-chat', label: '消息', active: false },
                  { icon: 'i-carbon-user-avatar', label: '我的', active: false },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ scale: 0.9 }}
                    className="flex-col-center gap-2px cursor-pointer"
                  >
                    <i
                      className={clsx(
                        item.icon,
                        'text-22px',
                        item.active ? 'color-primary' : 'color-#999',
                      )}
                    />
                    <span
                      className={clsx(
                        'text-10px',
                        item.active ? 'color-primary font-500' : 'color-#999',
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-12px color-#999 mb-8px">功能入口</p>
              <div className="grid gap-12px" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {[
                  { icon: 'i-carbon-wallet', label: '钱包', bg: '#fff3e8', color: '#E8845C' },
                  { icon: 'i-carbon-tag', label: '优惠券', bg: '#e8f5e9', color: '#52c41a' },
                  { icon: 'i-carbon-gift', label: '积分', bg: '#e6f4ff', color: '#1677ff' },
                  { icon: 'i-carbon-star', label: '会员', bg: '#fff8e1', color: '#F5C542' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ scale: 0.92 }}
                    className="flex-col-center gap-6px cursor-pointer"
                  >
                    <div
                      className="w-44px h-44px rounded-12px flex-center"
                      style={{ backgroundColor: item.bg }}
                    >
                      <i className={clsx(item.icon, 'text-24px')} style={{ color: item.color }} />
                    </div>
                    <span className="text-12px color-#333">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-12px color-#999 mb-8px">设置列表</p>
              <div className="rounded-12px overflow-hidden border border-solid border-#f0f0f0">
                {[
                  { icon: 'i-carbon-notification', label: '消息通知', color: '#1677ff' },
                  { icon: 'i-carbon-locked', label: '隐私安全', color: '#52c41a' },
                  { icon: 'i-carbon-color-palette', label: '主题设置', color: '#9B8EC1' },
                  { icon: 'i-carbon-help', label: '帮助反馈', color: '#faad14' },
                ].map((item, idx, arr) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ backgroundColor: '#f5f5f5' }}
                    className={clsx(
                      'flex items-center px-16px py-14px bg-white cursor-pointer',
                      idx < arr.length - 1 && 'border-b border-solid border-#f5f5f5',
                    )}
                  >
                    <i
                      className={clsx(item.icon, 'text-20px mr-12px')}
                      style={{ color: item.color }}
                    />
                    <span className="text-14px color-#333 flex-1">{item.label}</span>
                    <i className="i-carbon-chevron-right text-16px color-#ccc" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
