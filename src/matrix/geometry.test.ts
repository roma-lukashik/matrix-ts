import { at, newaxis, partition, shape } from "./geometry"
import { ones } from './creation'

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

  describe('#shape', () => {
    it('returns 0 shape for the empty matrix', () => {
      expect(shape([])).toEqual([0])
    })

    it('returns 2x2 shape', () => {
      expect(shape(ones(2, 2))).toEqual([2, 2])
    })

    it('returns 4x3x2x1 shape', () => {
      expect(shape(ones(4, 3, 2, 1))).toEqual([4, 3, 2, 1])
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
