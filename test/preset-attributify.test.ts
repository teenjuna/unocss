import { createGenerator, presetUno } from 'unocss'
import presetAttributify, { variantAttributify, extractorAttributify } from '@unocss/preset-attributify'

describe('attributify', () => {
  const fixture1 = `
<button 
  class="absolute fixed"
  bg="blue-400 hover:blue-500 dark:!blue-500 dark:hover:blue-600"
  text="sm white"
  flex="~ col"
  p="t-2"
  pt="2"
  border="rounded-xl"
  :font="condition ? 'mono' : 'sans'"
  v-bind:p="y-2 x-4"
  border="2 rounded blue-200"
  un-children="m-auto"
  pt2 ma rounded-sm
  inline-block
>
  Button
</button>
`

  const fixture2 = `
<template>
  <div h-80 text-center flex select-none all:transition-400>
    <div ma group>
      <div font-100 text-4xl mb--3>
        ~
      </div>
      <div text-5xl font-100>
        unocss
      </div>
      <div op-20 font-200 mt-1 tracking-wider group-hover="text-teal-400 op-50">
        Re-imaging Atomic CSS
      </div>
    </div>
  </div>
</template>
`

  const uno = createGenerator({
    presets: [
      presetAttributify(),
      presetUno(),
    ],
  })

  test('extractor1', async() => {
    expect(await extractorAttributify()(fixture1)).toMatchSnapshot()
  })

  test('extractor2', async() => {
    expect(await extractorAttributify()(fixture2)).toMatchSnapshot()
  })

  test('variant', async() => {
    const variant = variantAttributify()
    expect(Array.from(await extractorAttributify()(fixture1) || [])
      .map(i => variant.match(i, {} as any))).toMatchSnapshot()
  })

  test('fixture1', async() => {
    const { css } = await uno.generate(fixture1)
    expect(css).toMatchSnapshot()
  })

  test('fixture2', async() => {
    const { css } = await uno.generate(fixture2)
    expect(css).toMatchSnapshot()
  })
})