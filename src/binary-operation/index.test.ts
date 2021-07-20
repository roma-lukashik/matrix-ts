import { divide, multiply } from './index'

describe('binary operation', () => {
  describe('#multiply', () => {
    it('multiplies (3) and (3) matrix', () => {
      const a = [1, 2, 3]
      const b = [2, 4, 6]
      const c = [2, 8, 18]

      expect(multiply(a, b)).toEqual(c)
      expect(multiply(b, a)).toEqual(c)
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

      expect(multiply(a, b)).toEqual(c)
      expect(multiply(b, a)).toEqual(c)
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

      expect(multiply(a, b)).toEqual(c)
      expect(multiply(b, a)).toEqual(c)
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

      expect(multiply(a, b)).toEqual(c)
      expect(multiply(b, a)).toEqual(c)
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

      expect(multiply(a, b)).toEqual(c)
      expect(multiply(b, a)).toEqual(c)
    })

    it('throws an error if matrix cannot broadcast together', () => {
      const a = [[1, 2, 3]]
      const b = [[1, 2], [3, 4]]

      expect(() => multiply(a, b)).toThrowError('Matrix could not be broadcast together.')
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
      expect(divide(m, 2)).toEqual([
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
})
