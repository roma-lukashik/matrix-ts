import { at } from './at'
import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'

describe('at', () => {
  describe('single case', () => {
    const a = arange(4)

    it('returns a proper element starting from the beginning', () => {
      expect(at(a, 2)).toBe(2)
    })

    it('returns a proper element starting from the end', () => {
      expect(at(a, -2)).toBe(2)
    })

    it('throws an error if index is out of the array bounds #1', () => {
      expect(() => at(a, 4)).toThrowError('Index 4 out of bounds [0, 3].')
    })

    it('throws an error if index is out of the array bounds #2', () => {
      expect(() => at(a, -5)).toThrowError('Index -1 out of bounds [0, 3].')
    })
  })

  describe('nested case', () => {
    const a = reshape(arange(8), [2, 2, 2])

    it('passes case #1', () => {
      expect(at(a, 0)).toEqual([[0, 1], [2, 3]])
    })

    it('passes case #2', () => {
      expect(at(a, 0, 1)).toEqual([2, 3])
    })

    it('passes case #3', () => {
      expect(at(a, 0, 1, 0)).toEqual(2)
    })
  })
})
