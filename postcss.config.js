import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

const DESIGN_WIDTH = 375

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    pxToViewport({
      viewportWidth: DESIGN_WIDTH,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore-vw'],
      minPixelValue: 1,
      mediaQuery: false,
      landscape: false,
      exclude: [/node_modules[\\/]antd-mobile/],
    }),
  ],
}
