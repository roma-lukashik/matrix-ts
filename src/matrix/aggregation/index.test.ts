import { max, min, prod, sum } from '.'

describe('aggregation', () => {
  const matrix0x2 = [1, 2]

  const matrix3x2 = [
    [1, 2],
    [3, 4],
    [5, 6],
  ]

  const matrix2x2x2 = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
  ]

  describe('#sum', () => {
    it('0x2 matrix', () => {
      expect(sum(matrix0x2)).toBe(3)
      expect(sum(matrix0x2, 0)).toBe(3)
    })

    it('3x2 matrix', () => {
      expect(sum(matrix3x2)).toEqual(21)
      expect(sum(matrix3x2, 0)).toEqual([9, 12])
      expect(sum(matrix3x2, 1)).toEqual([3, 7, 11])
      expect(sum(matrix3x2, 0, 1)).toEqual(21)
      expect(sum(matrix3x2, 1, 0)).toEqual(21)
    })

    it('2x2x2 matrix', () => {
      expect(sum(matrix2x2x2)).toEqual(36)
      expect(sum(matrix2x2x2, 0)).toEqual([[6, 8], [10, 12]])
      expect(sum(matrix2x2x2, 1)).toEqual([[4, 6], [12, 14]])
      expect(sum(matrix2x2x2, 2)).toEqual([[3, 7], [11, 15]])
      expect(sum(matrix2x2x2, 0, 1)).toEqual([16, 20])
      expect(sum(matrix2x2x2, 0, 2)).toEqual([14, 22])
      expect(sum(matrix2x2x2, 1, 0)).toEqual([16, 20])
      expect(sum(matrix2x2x2, 1, 2)).toEqual([10, 26])
      expect(sum(matrix2x2x2, 2, 0)).toEqual([14, 22])
      expect(sum(matrix2x2x2, 2, 1)).toEqual([10, 26])
      expect(sum(matrix2x2x2, 0, 1, 2)).toEqual(36)
      expect(sum(matrix2x2x2, 1, 0, 2)).toEqual(36)
      expect(sum(matrix2x2x2, 1, 2, 0)).toEqual(36)
      expect(sum(matrix2x2x2, 2, 0, 1)).toEqual(36)
      expect(sum(matrix2x2x2, 2, 1, 0)).toEqual(36)
    })
  })

  describe('#prod', () => {
    it('0x2 matrix', () => {
      expect(prod(matrix0x2)).toBe(2)
      expect(prod(matrix0x2, 0)).toBe(2)
    })

    it('3x2 matrix', () => {
      expect(prod(matrix3x2)).toEqual(720)
      expect(prod(matrix3x2, 0)).toEqual([15, 48])
      expect(prod(matrix3x2, 1)).toEqual([2, 12, 30])
      expect(prod(matrix3x2, 0, 1)).toEqual(720)
      expect(prod(matrix3x2, 1, 0)).toEqual(720)
    })

    it('2x2x2 matrix', () => {
      expect(prod(matrix2x2x2)).toEqual(40320)
      expect(prod(matrix2x2x2, 0)).toEqual([[5, 12], [21, 32]])
      expect(prod(matrix2x2x2, 1)).toEqual([[3, 8], [35, 48]])
      expect(prod(matrix2x2x2, 2)).toEqual([[2, 12], [30, 56]])
      expect(prod(matrix2x2x2, 0, 1)).toEqual([105, 384])
      expect(prod(matrix2x2x2, 0, 2)).toEqual([60, 672])
      expect(prod(matrix2x2x2, 1, 0)).toEqual([105, 384])
      expect(prod(matrix2x2x2, 1, 2)).toEqual([24, 1680])
      expect(prod(matrix2x2x2, 2, 0)).toEqual([60, 672])
      expect(prod(matrix2x2x2, 2, 1)).toEqual([24, 1680])
      expect(prod(matrix2x2x2, 0, 1, 2)).toEqual(40320)
      expect(prod(matrix2x2x2, 1, 0, 2)).toEqual(40320)
      expect(prod(matrix2x2x2, 1, 2, 0)).toEqual(40320)
      expect(prod(matrix2x2x2, 2, 0, 1)).toEqual(40320)
      expect(prod(matrix2x2x2, 2, 1, 0)).toEqual(40320)
    })
  })

  describe('#max', () => {
    it('0x2 matrix', () => {
      expect(max(matrix0x2)).toBe(2)
      expect(max(matrix0x2, 0)).toBe(2)
    })

    it('3x2 matrix', () => {
      expect(max(matrix3x2)).toEqual(6)
      expect(max(matrix3x2, 0)).toEqual([5, 6])
      expect(max(matrix3x2, 1)).toEqual([2, 4, 6])
      expect(max(matrix3x2, 0, 1)).toEqual(6)
      expect(max(matrix3x2, 1, 0)).toEqual(6)
    })

    it('2x2x2 matrix', () => {
      expect(max(matrix2x2x2)).toEqual(8)
      expect(max(matrix2x2x2, 0)).toEqual([[5, 6], [7, 8]])
      expect(max(matrix2x2x2, 1)).toEqual([[3, 4], [7, 8]])
      expect(max(matrix2x2x2, 2)).toEqual([[2, 4], [6, 8]])
      expect(max(matrix2x2x2, 0, 1)).toEqual([7, 8])
      expect(max(matrix2x2x2, 0, 2)).toEqual([6, 8])
      expect(max(matrix2x2x2, 1, 0)).toEqual([7, 8])
      expect(max(matrix2x2x2, 1, 2)).toEqual([4, 8])
      expect(max(matrix2x2x2, 2, 0)).toEqual([6, 8])
      expect(max(matrix2x2x2, 2, 1)).toEqual([4, 8])
      expect(max(matrix2x2x2, 0, 1, 2)).toEqual(8)
      expect(max(matrix2x2x2, 0, 2, 1)).toEqual(8)
      expect(max(matrix2x2x2, 1, 0, 2)).toEqual(8)
      expect(max(matrix2x2x2, 1, 2, 0)).toEqual(8)
      expect(max(matrix2x2x2, 2, 0, 1)).toEqual(8)
      expect(max(matrix2x2x2, 2, 1, 0)).toEqual(8)
    })
  })

  describe('#min', () => {
    it('0x2 matrix', () => {
      expect(min(matrix0x2)).toBe(1)
      expect(min(matrix0x2, 0)).toBe(1)
    })

    it('3x2 matrix', () => {
      expect(min(matrix3x2)).toEqual(1)
      expect(min(matrix3x2, 0)).toEqual([1, 2])
      expect(min(matrix3x2, 1)).toEqual([1, 3, 5])
      expect(min(matrix3x2, 0, 1)).toEqual(1)
      expect(min(matrix3x2, 1, 0)).toEqual(1)
    })

    it('2x2x2 matrix', () => {
      expect(min(matrix2x2x2)).toEqual(1)
      expect(min(matrix2x2x2, 0)).toEqual([[1, 2], [3, 4]])
      expect(min(matrix2x2x2, 1)).toEqual([[1, 2], [5, 6]])
      expect(min(matrix2x2x2, 2)).toEqual([[1, 3], [5, 7]])
      expect(min(matrix2x2x2, 0, 1)).toEqual([1, 2])
      expect(min(matrix2x2x2, 0, 2)).toEqual([1, 3])
      expect(min(matrix2x2x2, 1, 0)).toEqual([1, 2])
      expect(min(matrix2x2x2, 1, 2)).toEqual([1, 5])
      expect(min(matrix2x2x2, 2, 0)).toEqual([1, 3])
      expect(min(matrix2x2x2, 2, 1)).toEqual([1, 5])
      expect(min(matrix2x2x2, 0, 1, 2)).toEqual(1)
      expect(min(matrix2x2x2, 0, 2, 1)).toEqual(1)
      expect(min(matrix2x2x2, 1, 0, 2)).toEqual(1)
      expect(min(matrix2x2x2, 1, 2, 0)).toEqual(1)
      expect(min(matrix2x2x2, 2, 0, 1)).toEqual(1)
      expect(min(matrix2x2x2, 2, 1, 0)).toEqual(1)
    })
  })
})
