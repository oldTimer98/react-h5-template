import { createFileRoute } from '@tanstack/react-router'
import { NavBar, Card, Tag, Toast } from 'antd-mobile'
import { useState } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/demo/icons')({
  component: IconsPage,
})

type IconItem = { icon: string; name: string }

const ICON_GROUPS: { title: string; icons: IconItem[] }[] = [
  {
    title: '通用操作',
    icons: [
      { icon: 'carbon:add', name: 'add' },
      { icon: 'carbon:close', name: 'close' },
      { icon: 'carbon:checkmark', name: 'checkmark' },
      { icon: 'carbon:edit', name: 'edit' },
      { icon: 'carbon:trash-can', name: 'trash-can' },
      { icon: 'carbon:download', name: 'download' },
      { icon: 'carbon:share', name: 'share' },
      { icon: 'carbon:copy', name: 'copy' },
      { icon: 'carbon:filter', name: 'filter' },
      { icon: 'carbon:search', name: 'search' },
      { icon: 'carbon:overflow-menu-vertical', name: 'more' },
      { icon: 'carbon:renew', name: 'renew' },
    ],
  },
  {
    title: '导航 & 方向',
    icons: [
      { icon: 'carbon:home', name: 'home' },
      { icon: 'carbon:arrow-left', name: 'arrow-left' },
      { icon: 'carbon:arrow-right', name: 'arrow-right' },
      { icon: 'carbon:chevron-right', name: 'chevron-right' },
      { icon: 'carbon:chevron-down', name: 'chevron-down' },
      { icon: 'carbon:launch', name: 'launch' },
      { icon: 'carbon:location', name: 'location' },
      { icon: 'carbon:map', name: 'map' },
    ],
  },
  {
    title: '用户 & 社交',
    icons: [
      { icon: 'carbon:user-avatar', name: 'user-avatar' },
      { icon: 'carbon:user', name: 'user' },
      { icon: 'carbon:group', name: 'group' },
      { icon: 'carbon:chat', name: 'chat' },
      { icon: 'carbon:notification', name: 'notification' },
      { icon: 'carbon:email', name: 'email' },
      { icon: 'carbon:phone', name: 'phone' },
      { icon: 'carbon:star', name: 'star' },
      { icon: 'carbon:favorite', name: 'favorite' },
      { icon: 'carbon:thumbs-up', name: 'thumbs-up' },
    ],
  },
  {
    title: '媒体 & 设备',
    icons: [
      { icon: 'carbon:camera', name: 'camera' },
      { icon: 'carbon:image', name: 'image' },
      { icon: 'carbon:video', name: 'video' },
      { icon: 'carbon:music', name: 'music' },
      { icon: 'carbon:mobile', name: 'mobile' },
      { icon: 'carbon:wifi', name: 'wifi' },
      { icon: 'carbon:wifi-off', name: 'wifi-off' },
      { icon: 'carbon:sun', name: 'sun' },
      { icon: 'carbon:moon', name: 'moon' },
      { icon: 'carbon:settings', name: 'settings' },
    ],
  },
  {
    title: '商业 & 状态',
    icons: [
      { icon: 'carbon:shopping-cart', name: 'shopping-cart' },
      { icon: 'carbon:wallet', name: 'wallet' },
      { icon: 'carbon:gift', name: 'gift' },
      { icon: 'carbon:calendar', name: 'calendar' },
      { icon: 'carbon:time', name: 'time' },
      { icon: 'carbon:warning', name: 'warning' },
      { icon: 'carbon:information', name: 'information' },
      { icon: 'carbon:checkmark-filled', name: 'checkmark-filled' },
      { icon: 'carbon:close-filled', name: 'close-filled' },
      { icon: 'carbon:locked', name: 'locked' },
    ],
  },
]

function IconsPage() {
  const navigate = Route.useNavigate()
  const [activeGroup, setActiveGroup] = useState(0)
  const [iconSize, setIconSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [iconColor, setIconColor] = useState('#333')

  const sizeValue = { sm: 20, md: 28, lg: 40 }[iconSize]

  const colorOptions = [
    { label: '默认', value: '#333' },
    { label: '主色', value: '#1677ff' },
    { label: '成功', value: '#52c41a' },
    { label: '警告', value: '#faad14' },
    { label: '危险', value: '#ff4d4f' },
    { label: '紫色', value: '#9B8EC1' },
  ]

  const handleCopy = (iconName: string) => {
    const text = `<Icon icon="${iconName}" />`
    navigator.clipboard.writeText(text).then(() => {
      Toast.show({ content: '已复制', duration: 800 })
    })
  }

  return (
    <div className="min-h-screen bg-bg">
      <NavBar onBack={() => navigate({ to: '/' })}>Iconify 图标</NavBar>

      <div className="p-[16px] flex flex-col gap-[12px]">
        <Card title="使用方式">
          <div className="flex flex-col gap-[8px] text-[13px] text-text-secondary">
            <p>
              基于{' '}
              <code className="bg-bg-code px-[4px] py-[2px] rounded-[4px] text-[12px]">
                @iconify/react
              </code>
              ，支持所有 Iconify 图标集，按需网络加载。
            </p>
            <div className="bg-bg-code rounded-[8px] p-[12px] font-mono text-[12px] text-[#444]">
              <p className="text-text-tertiary mb-[4px]">{'// 组件方式'}</p>
              <p>{'<Icon icon="carbon:home" className="text-primary" />'}</p>
              <p className="text-text-tertiary mt-[8px] mb-[4px]">{'// 指定大小和颜色'}</p>
              <p>{'<Icon icon="carbon:home" width={24} color="#1677ff" />'}</p>
            </div>
            <p className="mt-[4px] flex items-center gap-[4px]">
              <Icon icon="carbon:launch" width={14} />
              <span>图标搜索：</span>
              <a
                href="https://icones.js.org/collection/carbon"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                icones.js.org
              </a>
            </p>
            <p className="text-[12px] text-text-tertiary">
              支持所有 Iconify 图标集（Carbon / MDI / Lucide 等），无需额外安装依赖。
            </p>
          </div>
        </Card>

        <Card title="样式控制">
          <div className="flex flex-col gap-[12px]">
            <div>
              <p className="text-[12px] text-text-tertiary mb-[6px]">大小</p>
              <div className="flex gap-[8px]">
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
              <p className="text-[12px] text-text-tertiary mb-[6px]">颜色</p>
              <div className="flex gap-[6px] flex-wrap">
                {colorOptions.map((c) => (
                  <motion.div
                    key={c.value}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIconColor(c.value)}
                    className={clsx(
                      'flex items-center gap-[4px] px-[8px] py-[4px] rounded-full text-[12px] cursor-pointer border border-solid transition-colors',
                      iconColor === c.value
                        ? 'border-primary bg-[#e6f4ff] text-primary'
                        : 'border-border bg-bg-card text-text-secondary',
                    )}
                  >
                    <span
                      className="w-[10px] h-[10px] rounded-full inline-block"
                      style={{ backgroundColor: c.value }}
                    />
                    {c.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-[8px] overflow-x-auto pb-[4px] -mx-[16px] px-[16px]">
          {ICON_GROUPS.map((group, idx) => (
            <Tag
              key={group.title}
              color={activeGroup === idx ? 'primary' : 'default'}
              onClick={() => setActiveGroup(idx)}
              className="cursor-pointer whitespace-nowrap shrink-0"
            >
              {group.title}
            </Tag>
          ))}
        </div>

        <Card title={ICON_GROUPS[activeGroup].title}>
          <motion.div
            key={activeGroup}
            className="grid grid-cols-4 gap-[10px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {ICON_GROUPS[activeGroup].icons.map((item) => (
              <motion.div
                key={item.icon}
                whileTap={{ scale: 0.85 }}
                onClick={() => handleCopy(item.icon)}
                className="flex flex-col items-center justify-center gap-[4px] py-[10px] rounded-[8px] bg-bg-code cursor-pointer active:bg-bg-hover transition-colors"
              >
                <Icon icon={item.icon} width={sizeValue} color={iconColor} />
                <span className="text-[10px] text-text-tertiary text-center truncate max-w-full px-[2px]">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-[11px] text-text-quaternary mt-[10px] text-center">
            点击图标复制使用代码
          </p>
        </Card>

        <Card title="实际使用场景">
          <div className="flex flex-col gap-[16px]">
            <div>
              <p className="text-[12px] text-text-tertiary mb-[8px]">底部导航栏</p>
              <div className="flex justify-around bg-bg-card rounded-[12px] py-[10px] shadow-sm border border-border">
                {[
                  { icon: 'carbon:home', label: '首页', active: true },
                  { icon: 'carbon:search', label: '发现', active: false },
                  { icon: 'carbon:add-alt', label: '发布', active: false },
                  { icon: 'carbon:chat', label: '消息', active: false },
                  { icon: 'carbon:user-avatar', label: '我的', active: false },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-[3px] cursor-pointer"
                  >
                    <Icon icon={item.icon} width={22} color={item.active ? '#1677ff' : '#999'} />
                    <span
                      className={clsx(
                        'text-[10px]',
                        item.active ? 'text-primary font-medium' : 'text-text-tertiary',
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] text-text-tertiary mb-[8px]">功能入口</p>
              <div className="grid grid-cols-4 gap-[12px]">
                {[
                  { icon: 'carbon:wallet', label: '钱包', bg: '#fff3e8', color: '#E8845C' },
                  { icon: 'carbon:tag', label: '优惠券', bg: '#e8f5e9', color: '#52c41a' },
                  { icon: 'carbon:gift', label: '积分', bg: '#e6f4ff', color: '#1677ff' },
                  { icon: 'carbon:star', label: '会员', bg: '#fff8e1', color: '#F5C542' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ scale: 0.92 }}
                    className="flex flex-col items-center justify-center gap-[6px] cursor-pointer"
                  >
                    <div
                      className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
                      style={{ backgroundColor: item.bg }}
                    >
                      <Icon icon={item.icon} width={24} color={item.color} />
                    </div>
                    <span className="text-[12px] text-text">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] text-text-tertiary mb-[8px]">设置列表</p>
              <div className="rounded-[12px] overflow-hidden border border-border">
                {[
                  { icon: 'carbon:notification', label: '消息通知', color: '#1677ff' },
                  { icon: 'carbon:locked', label: '隐私安全', color: '#52c41a' },
                  { icon: 'carbon:color-palette', label: '主题设置', color: '#9B8EC1' },
                  { icon: 'carbon:help', label: '帮助反馈', color: '#faad14' },
                ].map((item, idx, arr) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ backgroundColor: '#f5f5f5' }}
                    className={clsx(
                      'flex items-center px-[16px] py-[14px] bg-bg-card cursor-pointer',
                      idx < arr.length - 1 && 'border-b border-border-light',
                    )}
                  >
                    <Icon
                      icon={item.icon}
                      width={20}
                      color={item.color}
                      className="mr-[12px] shrink-0"
                    />
                    <span className="text-[14px] text-text flex-1">{item.label}</span>
                    <Icon icon="carbon:chevron-right" width={16} color="#ccc" />
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
