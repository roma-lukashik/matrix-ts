import { range } from '.'

describe('array', () => {
  describe('#range', () => {
    it('returns an array from 0 to 5', () => {
      expect(range(0, 6)).toEqual([0, 1, 2, 3, 4, 5])
    })

    it('returns an array from 1 to 10', () => {
      expect(range(1, 11)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
  })
})
