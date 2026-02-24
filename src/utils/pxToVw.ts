/**
 * px 转 vw — 用于行内样式的动态转换
 *
 * PostCSS 只能处理 CSS/SCSS 文件中的 px，
 * JSX 行内 style={{ width: 100 }} 是运行时赋值，PostCSS 管不到。
 * 这个函数让行内样式也能用设计稿 px 值。
 *
 * @param px 设计稿上的 px 值
 * @param designWidth 设计稿宽度，默认 375
 * @returns vw 字符串，如 "26.66667vw"
 *
 * @example
 * <div style={{ width: pxToVw(100), height: pxToVw(50) }} />
 * // → width: "26.66667vw", height: "13.33333vw"
 *
 * @example 批量转换
 * <div style={pxToVwStyle({ width: 100, padding: 16, fontSize: 14 })} />
 */
const DESIGN_WIDTH = 375

export function pxToVw(px: number, designWidth = DESIGN_WIDTH): string {
  return `${((px / designWidth) * 100).toFixed(5)}vw`
}

/**
 * 批量将 style 对象中的数字值从 px 转为 vw
 *
 * 只转换数字类型的值，字符串值原样保留
 */
export function pxToVwStyle(
  style: Record<string, number | string>,
  designWidth = DESIGN_WIDTH,
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(style)) {
    result[key] = typeof value === 'number' ? pxToVw(value, designWidth) : value
  }
  return result
}
