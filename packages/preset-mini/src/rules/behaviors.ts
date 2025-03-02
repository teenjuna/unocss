import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'
import { colorResolver, handler as h } from '../utils'

export const outline: Rule<Theme>[] = [
  // size
  [/^outline-(?:width-|size-)?(.+)$/, ([, d], { theme }) => ({ 'outline-width': theme.lineWidth?.[d] ?? h.bracket.cssvar.px(d) }), { autocomplete: 'outline-(width|size)-<num>' }],

  // color
  [/^outline-(?:color-)?(.+)$/, colorResolver('outline-color', 'outline-color'), { autocomplete: 'outline-$colors' }],

  // offset
  [/^outline-offset-(.+)$/, ([, d], { theme }) => ({ 'outline-offset': theme.lineWidth?.[d] ?? h.bracket.cssvar.px(d) }), { autocomplete: 'outline-(offset)-<num>' }],

  // style
  ['outline', { 'outline-style': 'solid' }],
  ['outline-none', { 'outline': '2px solid transparent', 'outline-offset': '2px' }],
  ...['auto', 'dashed', 'dotted', 'double', 'hidden', 'solid', 'groove', 'ridge', 'inset', 'outset', 'inherit', 'initial', 'revert', 'unset'].map(v => [`outline-${v}`, { 'outline-style': v }] as Rule<Theme>),
]

export const appearance: Rule[] = [
  ['appearance-none', {
    'appearance': 'none',
    '-webkit-appearance': 'none',
  }],
]

const willChangeProperty = (prop: string): string | undefined => {
  return h.properties.auto.global(prop) ?? {
    contents: 'contents',
    scroll: 'scroll-position',
  }[prop]
}

export const willChange: Rule[] = [
  [/^will-change-(.+)/, ([, p]) => ({ 'will-change': willChangeProperty(p) })],
]
