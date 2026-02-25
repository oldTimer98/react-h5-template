import { defineConfig, presetWind4, presetAttributify, presetIcons } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetRemToPx(),
    // 自定义滚动条
    presetScrollbar(),
  ],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',
    'absolute-center': 'absolute top-50% left-50% translate--50%',
    'text-ellipsis': 'overflow-hidden text-ellipsis whitespace-nowrap',
  },
  theme: {
    colors: {
      primary: '#1677ff',
      success: '#52c41a',
      warning: '#faad14',
      danger: '#ff4d4f',
      info: '#1677ff',
    },
  },
  safelist: [],
})
