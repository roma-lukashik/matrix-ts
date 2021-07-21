import { isNdim } from './isndim'

describe('isNdim', () => {
  it('returns TRUE for a 1 dimensional matrix', () => {
    expect(isNdim([0, 1])).toBe(true)
  })

  it('returns TRUE for a 2 dimensional matrix', () => {
    expect(isNdim([[0, 1]])).toBe(true)
  })

  it('returns TRUE for a 5 dimensional matrix', () => {
    expect(isNdim([[[[[0, 1]]]]])).toBe(true)
  })

  it('returns FALSE for a scalar', () => {
    expect(isNdim(2)).toBe(false)
  })
})
