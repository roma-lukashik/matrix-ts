import * as matrix from '.'
import { identity } from '../utils/function'

const one = identity(1)

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
    it('returns 2x2 shape', () => {
      expect(matrix.shape(matrix.create(one, 2, 2))).toEqual([2, 2])
    })

    it('returns 4x3x2x1 shape', () => {
      expect(matrix.shape(matrix.create(one, 4, 3, 2, 1))).toEqual([4, 3, 2, 1])
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
})
