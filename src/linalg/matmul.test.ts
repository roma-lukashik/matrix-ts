import { matmul } from './matmul'

describe('matmul', () => {
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
