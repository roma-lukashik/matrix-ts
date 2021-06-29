import { array, first, size, zip } from '.'
import { constant, identity } from '../function'

describe('array', () => {
  describe('#array', () => {
    it('creates an empty array', () => {
      expect(array(0, identity)).toEqual([])
    })

    it('creates [0, 1] array', () => {
      expect(array(2, identity)).toEqual([0, 1])
    })

    it('creates [1, 1, 1] array', () => {
      expect(array(3, constant(1))).toEqual([1, 1, 1])
    })
  })

  describe('#size', () => {
    it('returns 0 for an empty array', () => {
      expect(size([])).toBe(0)
    })

    it('returns a correct array size', () => {
      expect(size([1, 2, 3, 4])).toBe(4)
    })
  })

  describe('#first', () => {
    it('returns undefined if an array is empty', () => {
      expect(first([])).toBeUndefined()
    })

    it('returns the first element of an array', () => {
      expect(first([1, 2])).toBe(1)
      expect(first([2, 3, 4])).toBe(2)
    })
  })

  describe('#zip', () => {
    it('passes a simple case', () => {
      expect(zip([1, 2], ['A', 'B'])).toEqual([
        [1, 'A'],
        [2, 'B'],
      ])
    })

    it('throws an error in case with different array sizes', () => {
      expect(() => zip([1, 2, 3], ['A', 'B'])).toThrowError('Array(3) and Array(2) are not aligned.')
      expect(() => zip(['A', 'B'], [1, 2, 3])).toThrowError('Array(2) and Array(3) are not aligned.')
    })
  })
})
