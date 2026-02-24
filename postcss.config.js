import pxToViewport from 'postcss-px-to-viewport-8-plugin'

// 设计稿宽度（一般 375 或 750）
const DESIGN_WIDTH = 375

export default {
  plugins: [
    pxToViewport({
      viewportWidth: DESIGN_WIDTH,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore-vw'],
      minPixelValue: 1,
      mediaQuery: false,
      landscape: false,
      // 排除第三方组件库（antd-mobile 自己做了适配，不需要再转）
      exclude: [/node_modules\/antd-mobile/],
    }),
  ],
}
