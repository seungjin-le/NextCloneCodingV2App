import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const globalsCss = readFileSync(join(process.cwd(), 'app', 'globals.css'), 'utf8')
const rootLayoutSource = readFileSync(join(process.cwd(), 'app', 'layout.tsx'), 'utf8')

describe('Tailwind theme tokens', () => {
  it('defines every custom color token used by project class names', () => {
    const expectedColorTokens = [
      'background',
      'foreground',
      'dark-200',
      'dark-500',
      'dark-600',
      'blurple-500',
      'blurple-600',
      'neutral-10',
      'neutral-30',
      'neutral-50',
      'neutral-60',
      'neutral-70',
      'neutral-90',
      'primary-20',
      'primary-80',
      'red-20',
      'red-50',
      'red-60',
    ]

    for (const token of expectedColorTokens) {
      expect(globalsCss).toContain(`--color-${token}:`)
    }
  })

  it('defines every custom typography token used by project class names', () => {
    const expectedTextTokens = ['body-sm', 'body-md', 'caption-s']

    for (const token of expectedTextTokens) {
      expect(globalsCss).toContain(`--text-${token}:`)
      expect(globalsCss).toContain(`--text-${token}--line-height:`)
    }
  })

  it('keeps font setup buildable without external Google Fonts fetches', () => {
    expect(rootLayoutSource).not.toContain('next/font/google')
    expect(globalsCss).toContain('--font-noto-sans-kr:')
    expect(globalsCss).toContain('--font-geist-mono:')
  })
})
