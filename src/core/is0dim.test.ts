import { is0dim } from './is0dim'

describe('is0dim', () => {
  it('returns TRUE for a scalar', () => {
    expect(is0dim(2)).toBe(true)
  })

  it('returns FALSE for a 1 dimensional matrix', () => {
    expect(is0dim([0, 1])).toBe(false)
  })

  it('returns FALSE for a 2 dimensional matrix', () => {
    expect(is0dim([[0, 1]])).toBe(false)
  })

  it('returns FALSE for a 5 dimensional matrix', () => {
    expect(is0dim([[[[[0, 1]]]]])).toBe(false)
  })
})
