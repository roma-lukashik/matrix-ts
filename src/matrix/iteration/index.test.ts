import { neach } from '.'

describe('iteration', () => {
  describe('neach', () => {
    it('iterates over all matrix elements in a proper way', () => {
      const m = [
        [[0, 1], [2, 3]],
        [[4, 5], [6, 7]],
        [[8, 9], [10, 11]],
      ]
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
