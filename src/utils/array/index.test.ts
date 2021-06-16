import { array, first, range, zip } from '.'
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

  describe('#range', () => {
    it('returns an array from 0 to 5', () => {
      expect(range(0, 6)).toEqual([0, 1, 2, 3, 4, 5])
    })

    it('returns an array from 1 to 10', () => {
      expect(range(1, 11)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
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

    it('passes a case with different array sizes #1', () => {
      expect(zip([1, 2, 3], ['A', 'B'])).toEqual([
        [1, 'A'],
        [2, 'B'],
      ])
    })

    it('passes a case with different array sizes #2', () => {
      expect(zip([1, 2], ['A', 'B', 'C'])).toEqual([
        [1, 'A'],
        [2, 'B'],
      ])
    })

    it('passes a case with different array sizes #3', () => {
      expect(zip([], ['A', 'B', 'C'])).toEqual([])
    })

    it('passes a case with different array sizes #4', () => {
      expect(zip([1, 2], [])).toEqual([])
    })
  })
})
