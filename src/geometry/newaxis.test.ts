import { newaxis } from './newaxis'

describe('newaxis', () => {
  it('returns 0x1 matrix', () => {
    expect(newaxis(1, 0)).toEqual([1])
  })

  it('returns 1x2 matrix', () => {
    expect(newaxis([0, 1], 0)).toEqual([[0, 1]])
  })

  it('returns 1x2x2 matrix', () => {
    expect(newaxis([[0, 1], [2, 3]], 0)).toEqual([
      [[0, 1], [2, 3]],
    ])
  })

  it('returns 2x1x2 matrix', () => {
    expect(newaxis([[0, 1], [2, 3]], 1)).toEqual([
      [[0, 1]],
      [[2, 3]],
    ])
  })

  it('returns 2x2x1 matrix', () => {
    expect(newaxis([[0, 1], [2, 3]], 2)).toEqual([
      [[0], [1]],
      [[2], [3]],
    ])
  })

  it('returns 2x2x1 matrix if axis index is out of matrix dimensions', () => {
    expect(newaxis([[0, 1], [2, 3]], 3)).toEqual([
      [[0], [1]],
      [[2], [3]],
    ])
  })
})
