import * as matrix from '.'
import { constant } from '../utils/function'

const one = constant(1)

describe('matrix', () => {
  describe('#create', () => {
    it('returns one dimensional matrix', () => {
      expect(matrix.create(one, 2)).toEqual([1, 1])
    })

    it('returns two dimensional matrix', () => {
      expect(matrix.create(one, 2, 2)).toEqual([
        [1, 1],
        [1, 1],
      ])
    })

    it('returns 5 dimensional matrix', () => {
      const matrix4x5 = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ]
      expect(matrix.create(one, 1, 2, 3, 4, 5)).toEqual([
        [
          [matrix4x5, matrix4x5, matrix4x5],
          [matrix4x5, matrix4x5, matrix4x5],
        ],
      ])
    })
  })

  describe('#zeros', () => {
    it('returns one dimensional zero matrix', () => {
      expect(matrix.zeros(2)).toEqual([0, 0])
    })

    it('returns 5 dimensional zero matrix', () => {
      const matrix4x5 = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(matrix.zeros(1, 2, 3, 4, 5)).toEqual([
        [
          [matrix4x5, matrix4x5, matrix4x5],
          [matrix4x5, matrix4x5, matrix4x5],
        ],
      ])
    })
  })

  describe('#shape', () => {
    it('returns 0 shape for the empty matrix', () => {
      expect(matrix.shape([])).toEqual([0])
    })

    it('returns 2x2 shape', () => {
      expect(matrix.shape(matrix.create(one, 2, 2))).toEqual([2, 2])
    })

    it('returns 4x3x2x1 shape', () => {
      expect(matrix.shape(matrix.create(one, 4, 3, 2, 1))).toEqual([4, 3, 2, 1])
    })
  })

  describe('#sample', () => {
    it('returns 2x2 sample from 3x4 matrix', () => {
      const matrix3x4 = [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ]
      expect(matrix.sample(matrix3x4, [1, 3], [2, 4])).toEqual([
        [3, 4],
        [3, 4],
      ])
    })
  })

  describe('#divide', () => {
    it('passes simple case #1', () => {
      const m = [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [7, 8, 9],
          [8, 7, 6],
        ],
      ]
      expect(matrix.divide(m, 2)).toEqual([
        [
          [0.5, 1.0, 1.5],
          [2.0, 2.5, 3.0],
        ],
        [
          [3.5, 4.0, 4.5],
          [4.0, 3.5, 3.0],
        ],
      ])
    })
  })

  describe('#multiply', () => {
    it('multiplies (3) and (3) matrix', () => {
      const a = [1, 2, 3]
      const b = [2, 4, 6]
      const c = [2, 8, 18]

      expect(matrix.multiply(a, b)).toEqual(c)
      expect(matrix.multiply(b, a)).toEqual(c)
    })

    it('multiplies (4x3) and (3) matrix', () => {
      const a = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ]

      const b = [1, 2, 3]

      const c = [
        [0, 0, 0],
        [1, 2, 3],
        [2, 4, 6],
        [3, 6, 9],
      ]

      expect(matrix.multiply(a, b)).toEqual(c)
      expect(matrix.multiply(b, a)).toEqual(c)
    })

    it('multiplies (4x3) and (1x4) matrix', () => {
      const a = [
        [0, 1, 2],
        [3, 0, 4],
        [5, 6, 0],
        [7, 8, 9],
      ]

      const b = [
        [1],
        [2],
        [3],
        [4],
      ]

      const c = [
        [0, 1, 2],
        [6, 0, 8],
        [15, 18, 0],
        [28, 32, 36],
      ]

      expect(matrix.multiply(a, b)).toEqual(c)
      expect(matrix.multiply(b, a)).toEqual(c)
    })

    it('multiplies (2x3x3) and (3x3) matrix', () => {
      const a = [
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        [
          [9, 8, 7],
          [6, 5, 4],
          [3, 2, 1],
        ],
      ]

      const b = [
        [2, 4, 6],
        [1, 3, 5],
        [-1, -1, -1],
      ]

      const c = [
        [
          [2, 8, 18],
          [4, 15, 30],
          [-7, -8, -9],
        ],
        [
          [18, 32, 42],
          [6, 15, 20],
          [-3, -2, -1],
        ],
      ]

      expect(matrix.multiply(a, b)).toEqual(c)
      expect(matrix.multiply(b, a)).toEqual(c)
    })

    it('multiplies (2x3x3) and (2x1x3) matrix', () => {
      const a = [
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        [
          [9, 8, 7],
          [6, 5, 4],
          [3, 2, 1],
        ],
      ]

      const b = [
        [
          [2, 4, 6],
        ],
        [
          [1, 3, 5]
        ]
      ]

      const c = [
        [
          [2, 8, 18],
          [8, 20, 36],
          [14, 32, 54],
        ],
        [
          [9, 24, 35],
          [6, 15, 20],
          [3, 6, 5],
        ],
      ]

      expect(matrix.multiply(a, b)).toEqual(c)
      expect(matrix.multiply(b, a)).toEqual(c)
    })
  })

  describe('#sum', () => {
    it('calculates a sum of a simple matrix', () => {
      expect(matrix.sum([0.5, 1.5])).toBe(2)
      expect(matrix.sum([0.5, 1.5], [0])).toBe(2)
    })

    it('calculates a sum of 3x2 matrix', () => {
      const m = [
        [0.5, 1.5],
        [2.0, 4.0],
        [1.0, 3.0],
      ]
      expect(matrix.sum(m)).toEqual(12)
      expect(matrix.sum(m, [0])).toEqual([3.5, 8.5])
      expect(matrix.sum(m, [1])).toEqual([2, 6, 4])
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

      expect(matrix.sum(m)).toEqual(13.5)
      expect(matrix.sum(m, [0])).toEqual([[1, 4], [4.5, 4]])
      expect(matrix.sum(m, [1])).toEqual([[2.5, 5.5], [3, 2.5]])
      expect(matrix.sum(m, [2])).toEqual([[2, 6], [3, 2.5]])
      expect(matrix.sum(m, [0, 1])).toEqual([5.5, 8])
      expect(matrix.sum(m, [0, 2])).toEqual([5, 8.5])
      expect(matrix.sum(m, [1, 0])).toEqual([5.5, 8])
      expect(matrix.sum(m, [1, 2])).toEqual([8, 5.5])
      expect(matrix.sum(m, [2, 0])).toEqual([5, 8.5])
      expect(matrix.sum(m, [2, 1])).toEqual([8, 5.5])
    })
  })

  describe('#max', () => {
    it('calculates a max of a simple matrix', () => {
      expect(matrix.max([0.5, 1.5])).toBe(1.5)
      expect(matrix.max([0.5, 1.5], [0])).toBe(1.5)
    })

    it('calculates a max of 3x2 matrix', () => {
      const m = [
        [0.5, 1.5],
        [2.0, 4.0],
        [1.0, 3.0],
      ]
      expect(matrix.max(m)).toEqual(4)
      expect(matrix.max(m, [0])).toEqual([2, 4])
      expect(matrix.max(m, [1])).toEqual([1.5, 4, 3])
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

      expect(matrix.max(m)).toEqual(4)
      expect(matrix.max(m, [0])).toEqual([[0.5, 2.5], [2.5, 4]])
      expect(matrix.max(m, [1])).toEqual([[2, 4], [2.5, 2.5]])
      expect(matrix.max(m, [2])).toEqual([[1.5, 4], [2.5, 2.5]])
      expect(matrix.max(m, [0, 1])).toEqual([2.5, 4])
      expect(matrix.max(m, [0, 2])).toEqual([2.5, 4])
      expect(matrix.max(m, [1, 0])).toEqual([2.5, 4])
      expect(matrix.max(m, [1, 2])).toEqual([4, 2.5])
      expect(matrix.max(m, [2, 0])).toEqual([2.5, 4])
      expect(matrix.max(m, [2, 1])).toEqual([4, 2.5])
    })
  })
})
