import { len } from './len'

describe('len', () => {
  it('returns 0 for scalar', () => {
    expect(len(2)).toEqual(0)
  })

  it('returns 2 for 0x2 matrix', () => {
    expect(len([0, 1])).toEqual(2)
  })

  it('returns 2 for 2x3 matrix', () => {
    expect(len([[0, 1, 2], [3, 4, 5]])).toEqual(2)
  })

  it('returns 1 for 1x1x1x1x2 matrix', () => {
    expect(len([[[[[0, 1]]]]])).toEqual(1)
  })
})
