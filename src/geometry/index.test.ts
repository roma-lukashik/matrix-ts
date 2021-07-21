import { at, newaxis, partition, transpose } from './index'
import { arange } from '../creation/arange'
import { ones } from '../creation/ones'
import { reshape } from './reshape'
import { shape } from './shape'

describe('geometry', () => {
  describe('#at', () => {
    describe('single case', () => {
      const a = [1, 2, 3, 4]

      it('returns a proper element starting from the beginning', () => {
        expect(at(a, 2)).toBe(3)
      })

      it('returns a proper element starting from the end', () => {
        expect(at(a, -2)).toBe(3)
      })

      it('throws an error if index is out of the array bounds #1', () => {
        expect(() => at(a, 4)).toThrowError('Index 4 out of bounds [0, 3].')
      })

      it('throws an error if index is out of the array bounds #2', () => {
        expect(() => at(a, -5)).toThrowError('Index -1 out of bounds [0, 3].')
      })
    })

    describe('nested case', () => {
      const a = [
        [[1, 2], [3, 4]],
        [[5, 6], [7, 8]],
      ]

      it('passes case #1', () => {
        expect(at(a, 0)).toEqual([[1, 2], [3, 4]])
      })

      it('passes case #2', () => {
        expect(at(a, 0, 1)).toEqual([3, 4])
      })

      it('passes case #3', () => {
        expect(at(a, 0, 1, 0)).toEqual(3)
      })
    })
  })

  describe('#transpose', () => {
    it('transposes 0x3 matrix', () => {
      const m = arange(3)
      expect(transpose(m)).toEqual(m)
    })

    it('transposes 2x2 matrix', () => {
      const m = reshape(arange(4), [2, 2])
      expect(transpose(m)).toEqual([[0, 2], [1, 3]])
    })

    it('transposes 1x2x3 matrix', () => {
      const m = ones(1, 2, 3)
      expect(shape(transpose(m, 2, 1, 0))).toEqual([3, 2, 1])
    })

    it('transposes 2x3x4x2 matrix to 4x2x2x3', () => {
      const m = reshape(arange(2 * 3 * 4 * 2), [2, 3, 4, 2])
      expect(transpose(m, 2, 0, 3, 1)).toEqual([
        [
          [[0, 8, 16], [1, 9, 17]],
          [[24, 32, 40], [25, 33, 41]],
        ],
        [
          [[2, 10, 18], [3, 11, 19]],
          [[26, 34, 42], [27, 35, 43]],
        ],
        [
          [[4, 12, 20], [5, 13, 21]],
          [[28, 36, 44], [29, 37, 45]],
        ],
        [
          [[6, 14, 22], [7, 15, 23]],
          [[30, 38, 46], [31, 39, 47]],
        ],
      ])
    })

    it('transposes 2x3x4x2 matrix to 2x2x3x4', () => {
      const m = reshape(arange(2 * 3 * 4 * 2), [2, 3, 4, 2])
      expect(transpose(m, 3, 0, 1, 2)).toEqual([
        [
          [
            [0, 2, 4, 6],
            [8, 10, 12, 14],
            [16, 18, 20, 22],
          ],
          [
            [24, 26, 28, 30],
            [32, 34, 36, 38],
            [40, 42, 44, 46],
          ],
        ],
        [
          [
            [1, 3, 5, 7],
            [9, 11, 13, 15],
            [17, 19, 21, 23],
          ],
          [
            [25, 27, 29, 31],
            [33, 35, 37, 39],
            [41, 43, 45, 47],
          ],
        ],
      ])
    })
  })

  describe('#partition', () => {
    it('returns 2x2 sample from 3x4 matrix', () => {
      const matrix3x4 = [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ]
      expect(partition(matrix3x4, [1, 3], [2, 4])).toEqual([
        [3, 4],
        [3, 4],
      ])
    })
  })

  describe('#newaxis', () => {
    it('returns 0x1 matrix', () => {
      expect(newaxis(1, 0)).toEqual([1])
    })

    it('returns 1x2 matrix', () => {
      expect(newaxis([1, 2], 0)).toEqual([[1, 2]])
    })

    it('returns 1x2x2 matrix', () => {
      expect(newaxis([[1, 2], [3, 4]], 0)).toEqual([
        [[1, 2], [3, 4]],
      ])
    })

    it('returns 2x1x2 matrix', () => {
      expect(newaxis([[1, 2], [3, 4]], 1)).toEqual([
        [[1, 2]],
        [[3, 4]],
      ])
    })

    it('returns 2x2x1 matrix', () => {
      expect(newaxis([[1, 2], [3, 4]], 2)).toEqual([
        [[1], [2]],
        [[3], [4]],
      ])
    })

    it('returns 2x2x1 matrix if axis index is out of matrix dimensions', () => {
      expect(newaxis([[1, 2], [3, 4]], 3)).toEqual([
        [[1], [2]],
        [[3], [4]],
      ])
    })
  })
})
