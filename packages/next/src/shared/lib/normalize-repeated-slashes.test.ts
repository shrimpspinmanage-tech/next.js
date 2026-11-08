import { normalizeRepeatedSlashes } from './utils'

describe('normalizeRepeatedSlashes', () => {
  it('collapses repeated slashes and backslashes', () => {
    expect(normalizeRepeatedSlashes('//google.com')).toBe('/google.com')
    expect(normalizeRepeatedSlashes('/a///b\\\\c?x=1//2')).toBe('/a/b/c?x=1//2')
  })

  it('keeps a trailing slash by default', () => {
    expect(normalizeRepeatedSlashes('/a///')).toBe('/a/')
  })

  it('removes the trailing slash when requested', () => {
    expect(
      normalizeRepeatedSlashes('/a///', { removeTrailingSlash: true })
    ).toBe('/a')
    expect(
      normalizeRepeatedSlashes('/a//b//?q=1', { removeTrailingSlash: true })
    ).toBe('/a/b?q=1')
  })

  it('never removes the slash of the root path', () => {
    expect(
      normalizeRepeatedSlashes('////', { removeTrailingSlash: true })
    ).toBe('/')
    expect(
      normalizeRepeatedSlashes('//?q=1', { removeTrailingSlash: true })
    ).toBe('/?q=1')
  })
})
