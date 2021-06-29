import { divide, dot, matmul, multiply } from '.'

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

  describe('#matmul', () => {
    describe('A=(2, 2) B=(1)', () => {
      const a = [[1, 2], [3, 4]]
      const b = [2, 4]

      it('AxB', ()  => {
        expect(matmul(a, b)).toEqual([10, 22])
      })

      it('BxA', ()  => {
        expect(matmul(b, a)).toEqual([14, 20])
      })
    })

    describe('A=(2, 2) B=(2, 2)', () => {
      const a = [[1, 2], [3, 4]]
      const b = [[5, 6], [7, 8]]

      it('AxB', ()  => {
        expect(matmul(a, b)).toEqual([[19, 22], [43, 50]])
      })

      it('BxA', ()  => {
        expect(matmul(b, a)).toEqual([[23, 34], [31, 46]])
      })
    })

    describe('A=(2, 2, 2) B=(2, 2)', () => {
      const a = [
        [
          [0, 1],
          [2, 3],
        ],
        [
          [4, 5],
          [6, 7],
        ],
      ]
      const b = [
        [0, 1],
        [2, 3],
      ]

      it('AxB', ()  => {
        expect(matmul(a, b)).toEqual([
          [
            [2, 3],
            [6, 11],
          ],
          [
            [10, 19],
            [14, 27],
          ],
        ])
      })

      it('BxA', ()  => {
        expect(matmul(b, a)).toEqual([
          [
            [2, 3],
            [6, 11],
          ],
          [
            [6, 7],
            [26, 31],
          ],
        ])
      })
    })

    describe('A=(3, 3, 2) B=(3, 2, 4)', () => {
      const a = [
        [
          [6, 3],
          [7, 4],
          [6, 9],
        ],
        [
          [2, 6],
          [7, 4],
          [3, 7],
        ],
        [
          [7, 2],
          [5, 4],
          [1, 7],
        ],
      ]
      const b = [
        [
          [5, 1, 4, 0],
          [9, 5, 8, 0],
        ],
        [
          [9, 2, 6, 3],
          [8, 2, 4, 2],
        ],
        [
          [6, 4, 8, 6],
          [1, 3, 8, 1],
        ],
      ]

      it('AxB', () => {
        expect(matmul(a, b)).toEqual([
          [
            [57, 21, 48, 0],
            [71, 27, 60, 0],
            [111, 51, 96, 0],
          ],
          [
            [66, 16, 36, 18],
            [95, 22, 58, 29],
            [83, 20, 46, 23],
          ],
          [
            [44, 34, 72, 44],
            [34, 32, 72, 34],
            [13, 25, 64, 13],
          ],
        ])
      })

      it('BxA', () => {
        expect(() => matmul(b, a)).toThrowError('Shapes (3,2,4) and (3,3,2) are not aligned.')
      })
    })

    describe('throws en error', () => {
      it('A=(2, 2) B=(1, 2)', ()  => {
        const a = [[1, 2], [3, 4]]
        const b = [[2, 4]]
        expect(() => matmul(a, b)).toThrowError('Input operand does not have enough dimensions.')
      })

      it('A=(2, 2) B=(1, 3)', ()  => {
        const a = [[1, 2], [3, 4]]
        const b = [[2], [4], [5]]
        expect(() => matmul(b, a)).toThrowError('Input operand does not have enough dimensions.')
      })
    })
  })

  describe('#dot', () => {
    describe('A=(0) B=(0)', () => {
      const a = 2
      const b = 4

      it('AxB', () => {
        expect(dot(a, b)).toEqual(8)
      })

      it('BxA', () => {
        expect(dot(b, a)).toEqual(8)
      })
    })

    describe('A=(2, 2) B=(0)', () => {
      const a = [[1, 2], [3, 4]]
      const b = 2

      it('AxB', () => {
        expect(dot(a, b)).toEqual([[2, 4], [6, 8]])
      })

      it('BxA', () => {
        expect(dot(b, a)).toEqual([[2, 4], [6, 8]])
      })
    })

    describe('A=(1) B=(1)', () => {
      const a = [1, 2]
      const b = [3, 4]

      it('AxB', () => {
        expect(dot(a, b)).toEqual(11)
      })

      it('BxA', () => {
        expect(dot(b, a)).toEqual(11)
      })
    })

    describe('A=(2, 2, 2) B=(1)', () => {
      const a = [
        [
          [6, 3],
          [7, 4],
        ],
        [
          [2, 6],
          [7, 4],
        ],
      ]
      const b = [2, 4]

      it('AxB', () => {
        expect(dot(a, b)).toEqual([[24, 30], [28, 30]])
      })

      it('BxA', () => {
        expect(dot(b, a)).toEqual([[40, 22], [32, 28]])
      })
    })

    describe('A=(2, 2) B=(2, 2)', () => {
      const a = [[1, 2], [3, 4]]
      const b = [[5, 6], [7, 8]]

      it('AxB', ()  => {
        expect(dot(a, b)).toEqual([[19, 22], [43, 50]])
      })

      it('BxA', ()  => {
        expect(dot(b, a)).toEqual([[23, 34], [31, 46]])
      })
    })

    describe('A=(2, 3, 3) B=(3, 2, 4)', () => {
      const a = [
        [
          [6, 3],
          [7, 4],
          [6, 9],
        ],
        [
          [2, 6],
          [7, 4],
          [3, 7],
        ],
      ]
      const b = [
        [
          [7, 2, 5, 4],
          [1, 7, 5, 1],
        ],
        [
          [4, 0, 9, 5],
          [8, 0, 9, 2],
        ],
        [
          [6, 3, 8, 2],
          [4, 2, 6, 4],
        ],
      ]

      it('AxB', () => {
        expect(dot(a, b)).toEqual([
          [
            [
              [45, 33, 45, 27],
              [48, 0, 81, 36],
              [48, 24, 66, 24],
            ],
            [
              [53, 42, 55, 32],
              [60, 0, 99, 43],
              [58, 29, 80, 30],
            ],
            [
              [51, 75, 75, 33],
              [96, 0, 135, 48],
              [72, 36, 102, 48],
            ],
          ],
          [
            [
              [20, 46, 40, 14],
              [56, 0, 72, 22],
              [36, 18, 52, 28],
            ],
            [
              [53, 42, 55, 32],
              [60, 0, 99, 43],
              [58, 29, 80, 30],
            ],
            [
              [28, 55, 50, 19],
              [68, 0, 90, 29],
              [46, 23, 66, 34],
            ],
          ],
        ])
      })

      it('BxA', () => {
        expect(() => dot(b, a)).toThrowError('Shapes (3,2,4) and (2,3,2) are not aligned.')
      })
    })

    describe('A=(1) B=(3, 3, 4)', () => {
      const a = [6, 3, 4]
      const b = [
        [
          [7, 2, 5, 4],
          [1, 7, 5, 1],
          [1, 7, 5, 1],
        ],
        [
          [4, 0, 9, 5],
          [8, 0, 9, 2],
          [1, 7, 5, 1],
        ],
        [
          [6, 3, 8, 2],
          [4, 2, 6, 4],
          [1, 7, 5, 1],
        ],
      ]

      it('AxB', () => {
        expect(dot(a, b)).toEqual([
          [49, 61, 65, 31],
          [52, 28, 101, 40],
          [52, 52, 86, 28],
        ])
      })
    })
  })
})
