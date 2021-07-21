import { size } from './size'

describe('size', () => {
  it('returns 1 for scalar', () => {
    expect(size(2)).toEqual(1)
  })

  it('returns 3 for 0x3 matrix', () => {
    expect(size([0, 1, 2])).toEqual(3)
  })

  it('returns 6 for 2x3 matrix', () => {
    expect(size([[0, 1, 2], [3, 4, 5]])).toEqual(6)
  })

  it('returns 2 for 1x1x1x1x2 matrix', () => {
    expect(size([[[[[0, 1]]]]])).toEqual(2)
  })
})
