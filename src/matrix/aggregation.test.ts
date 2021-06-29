import { max, sum } from './aggregation'

describe('aggregation', () => {
  describe('#sum', () => {
    it('calculates a sum of a simple matrix', () => {
      expect(sum([0.5, 1.5])).toBe(2)
      expect(sum([0.5, 1.5], [0])).toBe(2)
    })

    it('calculates a sum of 3x2 matrix', () => {
      const m = [
        [0.5, 1.5],
        [2.0, 4.0],
        [1.0, 3.0],
      ]

      expect(sum(m)).toEqual(12)
      expect(sum(m, [0])).toEqual([3.5, 8.5])
      expect(sum(m, [1])).toEqual([2, 6, 4])
      expect(sum(m, [0, 1])).toEqual(12)
      expect(sum(m, [1, 0])).toEqual(12)
    })

    it('calculates a sum of 2x2x2 matrix', () => {
      const m = [
        [
          [0.5, 1.5],
          [2.0, 4.0],
        ],
        [
          [0.5, 2.5],
          [2.5, 0.0],
        ]
      ]

      expect(sum(m)).toEqual(13.5)
      expect(sum(m, [0])).toEqual([[1, 4], [4.5, 4]])
      expect(sum(m, [1])).toEqual([[2.5, 5.5], [3, 2.5]])
      expect(sum(m, [2])).toEqual([[2, 6], [3, 2.5]])
      expect(sum(m, [0, 1])).toEqual([5.5, 8])
      expect(sum(m, [0, 2])).toEqual([5, 8.5])
      expect(sum(m, [1, 0])).toEqual([5.5, 8])
      expect(sum(m, [1, 2])).toEqual([8, 5.5])
      expect(sum(m, [2, 0])).toEqual([5, 8.5])
      expect(sum(m, [2, 1])).toEqual([8, 5.5])
      expect(sum(m, [0, 1, 2])).toEqual(13.5)
      expect(sum(m, [1, 0, 2])).toEqual(13.5)
      expect(sum(m, [1, 2, 0])).toEqual(13.5)
      expect(sum(m, [2, 0, 1])).toEqual(13.5)
      expect(sum(m, [2, 1, 0])).toEqual(13.5)
    })
  })

  describe('#max', () => {
    it('calculates a max of a simple matrix', () => {
      expect(max([0.5, 1.5])).toBe(1.5)
      expect(max([0.5, 1.5], [0])).toBe(1.5)
    })

    it('calculates a max of 3x2 matrix', () => {
      const m = [
        [0.5, 1.5],
        [2.0, 4.0],
        [1.0, 3.0],
      ]

      expect(max(m)).toEqual(4)
      expect(max(m, [0])).toEqual([2, 4])
      expect(max(m, [1])).toEqual([1.5, 4, 3])
      expect(max(m, [0, 1])).toEqual(4)
      expect(max(m, [1, 0])).toEqual(4)
    })

    it('calculates a max of 2x2x2 matrix', () => {
      const m = [
        [
          [0.5, 1.5],
          [2.0, 4.0],
        ],
        [
          [0.5, 2.5],
          [2.5, 0.0],
        ]
      ]

      expect(max(m)).toEqual(4)
      expect(max(m, [0])).toEqual([[0.5, 2.5], [2.5, 4]])
      expect(max(m, [1])).toEqual([[2, 4], [2.5, 2.5]])
      expect(max(m, [2])).toEqual([[1.5, 4], [2.5, 2.5]])
      expect(max(m, [0, 1])).toEqual([2.5, 4])
      expect(max(m, [0, 2])).toEqual([2.5, 4])
      expect(max(m, [1, 0])).toEqual([2.5, 4])
      expect(max(m, [1, 2])).toEqual([4, 2.5])
      expect(max(m, [2, 0])).toEqual([2.5, 4])
      expect(max(m, [2, 1])).toEqual([4, 2.5])
      expect(max(m, [0, 1, 2])).toEqual(4)
      expect(max(m, [0, 2, 1])).toEqual(4)
      expect(max(m, [1, 0, 2])).toEqual(4)
      expect(max(m, [1, 2, 0])).toEqual(4)
      expect(max(m, [2, 0, 1])).toEqual(4)
      expect(max(m, [2, 1, 0])).toEqual(4)
    })
  })
})
