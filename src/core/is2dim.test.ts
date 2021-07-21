import { is2dim } from './is2dim'

describe('is2dim', () => {
  it('returns TRUE for a 2 dimensional matrix', () => {
    expect(is2dim([[0, 1]])).toBe(true)
  })

  it('returns FALSE for a scalar', () => {
    expect(is2dim(2)).toBe(false)
  })

  it('returns FALSE for a 1 dimensional matrix', () => {
    expect(is2dim([0, 1])).toBe(false)
  })

  it('returns FALSE for a 5 dimensional matrix', () => {
    expect(is2dim([[[[[0, 1]]]]])).toBe(false)
  })
})
