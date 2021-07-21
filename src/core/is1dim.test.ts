import { is1dim } from './is1dim'

describe('is1dim', () => {
  it('returns TRUE for a 1 dimensional matrix', () => {
    expect(is1dim([0, 1])).toBe(true)
  })

  it('returns FALSE for a scalar', () => {
    expect(is1dim(2)).toBe(false)
  })

  it('returns FALSE for a 2 dimensional matrix', () => {
    expect(is1dim([[0, 1]])).toBe(false)
  })

  it('returns FALSE for a 5 dimensional matrix', () => {
    expect(is1dim([[[[[0, 1]]]]])).toBe(false)
  })
})
