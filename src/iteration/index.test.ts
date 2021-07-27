import { neach } from './index'
import { reshape } from '../geometry/reshape'
import { arange } from '../creation/arange'

describe('iteration', () => {
  describe('neach', () => {
    it('iterates over Matrix0', () => {
      const args: [number][] = []
      neach(1, (...arg) => args.push(arg))
      expect(args).toEqual([[1]])
    })

    it('iterates over all matrix elements in a proper way', () => {
      const m = reshape(arange(12), [3, 2, 2])

      const args: [number, number, number, number][] = []
      neach(m, (...arg) => args.push(arg))

      expect(args).toEqual([
        [0, 0, 0, 0],
        [1, 0, 0, 1],
        [2, 0, 1, 0],
        [3, 0, 1, 1],
        [4, 1, 0, 0],
        [5, 1, 0, 1],
        [6, 1, 1, 0],
        [7, 1, 1, 1],
        [8, 2, 0, 0],
        [9, 2, 0, 1],
        [10, 2, 1, 0],
        [11, 2, 1, 1],
      ])
    })
  })
})
