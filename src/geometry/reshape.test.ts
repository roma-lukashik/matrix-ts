import { reshape } from './reshape'
import { arange } from '../creation/arange'

describe('reshape', () => {
  it('converts scalar to 1x1 matrix', () => {
    expect(reshape(2, [1, 1])).toEqual([[2]])
  })

  it('converts 0x6 matrix to 2x3 matrix', () => {
    expect(reshape(arange(6), [2, 3])).toEqual([[0, 1, 2], [3, 4, 5]])
  })

  it('converts 0x6 matrix to 3x2 matrix', () => {
    expect(reshape(arange(6), [3, 2])).toEqual([[0, 1], [2, 3], [4, 5]])
  })

  it('converts 2x3 matrix to 3x2 matrix', () => {
    expect(reshape([[0, 1, 2], [3, 4, 5]], [3, 2])).toEqual([[0, 1], [2, 3], [4, 5]])
  })

  it('converts 2x3 matrix to 0x6 matrix', () => {
    expect(reshape([[0, 1, 2], [3, 4, 5]], [6])).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('converts 2x2x2x2 matrix to 4x4 matrix', () => {
    const m = [
      [
        [[0, 1], [2, 3]],
        [[4, 5], [6, 7]],
      ],
      [
        [[8, 9], [10, 11]],
        [[12, 13], [14, 15]],
      ],
    ]
    expect(reshape(m, [4, 4])).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ])
  })

  it('converts 0x24 matrix to 2x3x2x2 matrix', () => {
    expect(reshape(arange(24), [2, 3, 2, 2])).toEqual([
      [
        [[0, 1], [2, 3]],
        [[4, 5], [6, 7]],
        [[8, 9], [10, 11]],
      ],
      [
        [[12, 13], [14, 15]],
        [[16, 17], [18, 19]],
        [[20, 21], [22, 23]],
      ],
    ])
  })

  it('throws an error in case when shapes are not compatible', () => {
    const m = [[1, 2], [3, 4]]
    expect(() => reshape(m, [2, 3])).toThrowError('Incompatible shape (2,3) for reshaping of (2,2) matrix.')
  })
})
