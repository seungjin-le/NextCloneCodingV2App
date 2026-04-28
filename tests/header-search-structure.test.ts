import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const siteHeaderSource = readFileSync(join(process.cwd(), 'components/SiteHeader.tsx'), 'utf8')
const searchFormSource = readFileSync(join(process.cwd(), 'components/SearchForm.tsx'), 'utf8')

describe('header search structure', () => {
  it('does not focus duplicated search inputs through a hard-coded DOM id', () => {
    expect(siteHeaderSource).not.toContain('document.getElementById')
    expect(searchFormSource).not.toContain('id="header-search-q"')
  })

  it('uses explicit refs and unique input ids for header search fields', () => {
    expect(siteHeaderSource).toContain('mobileSearchInputRef')
    expect(siteHeaderSource).toContain('desktopSearchInputRef')
    expect(searchFormSource).toContain('useId')
    expect(searchFormSource).toContain('inputRef')
  })
})
