import * as random from '../../utils/random'
import { constant } from '../../utils/function'
import { arange, create, ones, randn, zeros } from '.'

describe('creation', () => {
  describe('#create', () => {
    it('returns one dimensional matrix', () => {
      expect(create(constant(1), 2)).toEqual([1, 1])
    })

    it('returns two dimensional matrix', () => {
      expect(create(constant(1), 2, 2)).toEqual([
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
      expect(create(constant(1), 1, 2, 3, 4, 5)).toEqual([
        [
          [matrix4x5, matrix4x5, matrix4x5],
          [matrix4x5, matrix4x5, matrix4x5],
        ],
      ])
    })
  })

  describe('#zeros', () => {
    it('returns one dimensional zero matrix', () => {
      expect(zeros(2)).toEqual([0, 0])
    })

    it('returns 5 dimensional zero matrix', () => {
      const matrix4x5 = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(zeros(1, 2, 3, 4, 5)).toEqual([
        [
          [matrix4x5, matrix4x5, matrix4x5],
          [matrix4x5, matrix4x5, matrix4x5],
        ],
      ])
    })
  })

  describe('#ones', () => {
    it('returns one dimensional ones matrix', () => {
      expect(ones(2)).toEqual([1, 1])
    })

    it('returns 5 dimensional ones matrix', () => {
      const matrix4x5 = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ]
      expect(ones(1, 2, 3, 4, 5)).toEqual([
        [
          [matrix4x5, matrix4x5, matrix4x5],
          [matrix4x5, matrix4x5, matrix4x5],
        ],
      ])
    })
  })

  describe('#arange', () => {
    it('returns an array from 0 to 5', () => {
      expect(arange(6)).toEqual([0, 1, 2, 3, 4, 5])
    })
  })

  describe('#randn', () => {
    beforeEach(() => {
      spyOn(random, 'rand').and.returnValue(1)
    })
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('returns one dimensional array', () => {
      expect(randn(2)).toEqual([1, 1])
    })

    it('returns two dimensional array', () => {
      expect(randn(2, 2)).toEqual([
        [1, 1],
        [1, 1],
      ])
    })

    it('returns two dimensional array', () => {
      expect(randn(3, 2, 2)).toEqual([
        [[1, 1], [1, 1]],
        [[1, 1], [1, 1]],
        [[1, 1], [1, 1]],
      ])
    })
  })
})
