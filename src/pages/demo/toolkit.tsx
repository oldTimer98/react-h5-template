import { createFileRoute } from '@tanstack/react-router'
import { NavBar, Card, Button, Tag, Switch, Toast } from 'antd-mobile'
import { useState, useMemo } from 'react'
import { clsx } from 'clsx'
import { chunk, uniq, shuffle, sortBy, groupBy, debounce } from 'es-toolkit'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/demo/toolkit')({
  component: ToolkitPage,
})

const COLORS = [
  { id: 1, name: '珊瑚橙', hex: '#FF6F61', group: '暖色' },
  { id: 2, name: '薄荷绿', hex: '#98D4BB', group: '冷色' },
  { id: 3, name: '天际蓝', hex: '#6BB5E0', group: '冷色' },
  { id: 4, name: '琥珀黄', hex: '#F5C542', group: '暖色' },
  { id: 5, name: '薰衣紫', hex: '#9B8EC1', group: '冷色' },
  { id: 6, name: '蜜桃粉', hex: '#F7A8B8', group: '暖色' },
  { id: 7, name: '松石绿', hex: '#40B5AD', group: '冷色' },
  { id: 8, name: '暮光橘', hex: '#E8845C', group: '暖色' },
]

function ClsxDemo() {
  const [active, setActive] = useState(false)
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')

  const boxClass = clsx(
    'rounded-[12px] transition-all duration-300 flex items-center justify-center font-bold text-white shadow-md',
    {
      'bg-[#FF6F61]': active,
      'bg-[#6BB5E0]': !active,
      'w-[72px] h-[72px] text-[14px]': size === 'sm',
      'w-[110px] h-[110px] text-[18px]': size === 'md',
      'w-[148px] h-[148px] text-[24px]': size === 'lg',
    },
  )

  return (
    <Card title="clsx — 条件样式拼接">
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <motion.div
          className={boxClass}
          whileTap={{ scale: 0.9 }}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {active ? 'ON' : 'OFF'}
        </motion.div>

        <div className="flex items-center gap-[12px]">
          <span className="text-[14px] text-text-secondary">切换颜色</span>
          <Switch checked={active} onChange={setActive} />
        </div>

        <div className="flex gap-[8px]">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Tag
              key={s}
              color={size === s ? 'primary' : 'default'}
              onClick={() => setSize(s)}
              className="cursor-pointer"
            >
              {s.toUpperCase()}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  )
}

function EsToolkitDemo() {
  const [items, setItems] = useState(COLORS)
  const [groupMode, setGroupMode] = useState(false)

  const grouped = useMemo(() => groupBy(items, (c) => c.group), [items])

  const handleShuffle = debounce(() => {
    setItems((prev) => shuffle([...prev]))
    Toast.show({ content: 'shuffle 打乱完成', duration: 800 })
  }, 300)

  const handleSort = () => {
    setItems((prev) => sortBy([...prev], [(c) => c.name]))
    Toast.show({ content: 'sortBy 按名称排序', duration: 800 })
  }

  const handleChunk = () => {
    const chunked = chunk(items, 4)
    Toast.show({
      content: `chunk(4) → ${chunked.length} 组，每组 ${chunked[0]?.length} 个`,
      duration: 1200,
    })
  }

  const handleUniq = () => {
    const doubled = [...items, ...items.slice(0, 3)]
    const result = uniq(doubled)
    Toast.show({
      content: `${doubled.length} 项 → uniq → ${result.length} 项`,
      duration: 1200,
    })
  }

  const renderColorItems = (list: typeof COLORS) => (
    <div className="flex flex-wrap gap-[8px]">
      <AnimatePresence mode="popLayout">
        {list.map((color) => (
          <motion.div
            key={color.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="rounded-[8px] px-[12px] py-[8px] text-[12px] text-white font-medium cursor-pointer shadow-sm"
            style={{ backgroundColor: color.hex }}
            whileTap={{ scale: 0.9 }}
          >
            {color.name}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  return (
    <Card title="es-toolkit — 数组操作">
      <div className="flex flex-col gap-[14px]">
        <div className="flex flex-wrap gap-[8px]">
          <Button size="mini" color="primary" onClick={handleShuffle}>
            shuffle 打乱
          </Button>
          <Button size="mini" color="success" onClick={handleSort}>
            sortBy 排序
          </Button>
          <Button size="mini" color="warning" onClick={handleChunk}>
            chunk 分组
          </Button>
          <Button size="mini" color="danger" onClick={handleUniq}>
            uniq 去重
          </Button>
        </div>

        <div className="flex items-center gap-[8px]">
          <span className="text-[13px] text-text-secondary">按冷暖色 groupBy</span>
          <Switch checked={groupMode} onChange={setGroupMode} />
        </div>

        {groupMode ? (
          <div className="flex flex-col gap-[12px]">
            {Object.entries(grouped).map(([group, list]) => (
              <div key={group}>
                <p className="text-[12px] text-text-tertiary mb-[6px]">{group}</p>
                {renderColorItems(list)}
              </div>
            ))}
          </div>
        ) : (
          renderColorItems(items)
        )}
      </div>
    </Card>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: 'spring' as const, stiffness: 260, damping: 24 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

function FramerMotionDemo() {
  const [showCards, setShowCards] = useState(true)
  const [dragged, setDragged] = useState(false)

  return (
    <Card title="Framer Motion — 动画与手势">
      <div className="flex flex-col gap-[20px]">
        <div>
          <p className="text-[13px] text-text-secondary mb-[8px]">拖拽交互 — 试试拖动方块</p>
          <div className="h-[100px] bg-bg-code rounded-[12px] flex items-center justify-center overflow-hidden relative">
            <motion.div
              drag
              dragConstraints={{ top: -30, bottom: 30, left: -100, right: 100 }}
              whileDrag={{ scale: 1.15, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
              onDragStart={() => setDragged(true)}
              className={clsx(
                'w-[56px] h-[56px] rounded-[12px] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md',
                dragged ? 'bg-[#FF6F61]' : 'bg-[#6BB5E0]',
              )}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-[20px]">✋</span>
            </motion.div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-[10px]">
            <p className="text-[13px] text-text-secondary">列表编排动画</p>
            <Button size="mini" color="primary" onClick={() => setShowCards((v) => !v)}>
              {showCards ? '收起' : '展开'}
            </Button>
          </div>

          <AnimatePresence>
            {showCards && (
              <motion.div
                className="flex flex-col gap-[8px]"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {['淡入 + 上移', '弹簧物理', '延迟编排', '手势反馈'].map((text, i) => (
                  <motion.div
                    key={text}
                    custom={i}
                    variants={cardVariants}
                    whileTap={{ scale: 0.97, backgroundColor: '#f0f5ff' }}
                    className="bg-bg-card rounded-[8px] px-[16px] py-[12px] text-[14px] text-text shadow-sm border border-border cursor-pointer"
                  >
                    <span className="text-text-tertiary mr-[8px] text-[12px]">{`0${i + 1}`}</span>
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <p className="text-[13px] text-text-secondary mb-[8px]">按压反馈 — 长按试试</p>
          <div className="flex gap-[12px]">
            {['#FF6F61', '#98D4BB', '#6BB5E0', '#F5C542'].map((color) => (
              <motion.div
                key={color}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.85, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-pointer shadow-md"
                style={{ backgroundColor: color }}
              >
                <span className="text-[16px] text-white/80">●</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function ToolkitPage() {
  const navigate = Route.useNavigate()

  return (
    <div className="min-h-screen bg-bg">
      <NavBar onBack={() => navigate({ to: '/' })}>工具库示例</NavBar>

      <motion.div
        className="p-[16px] flex flex-col gap-[12px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ClsxDemo />
        <EsToolkitDemo />
        <FramerMotionDemo />
      </motion.div>
    </div>
  )
}
