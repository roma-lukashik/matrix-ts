import { to1dim } from './to1dim'

describe('to1dim', () => {
  it('converts a scalar to 1 dim matrix', () => {
    expect(to1dim(2)).toEqual([2])
  })

  it('returns a copy of 1 dim matrix', () => {
    expect(to1dim([0, 1])).toEqual([0, 1])
  })

  it('converts a 2x2 matrix to 0x4 matrix', () => {
    expect(to1dim([[0, 1], [2, 3]])).toEqual([0, 1, 2, 3])
  })

  it('converts a 1x1x1x1x2 matrix to 0x2 matrix', () => {
    expect(to1dim([[[[[0, 1]]]]])).toEqual([0, 1])
  })
})
