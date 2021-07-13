import { exp } from '.'

describe('math', () => {
  describe('#exp', () => {
    it('passes a basic case', () => {
      const a = [
        [
          [1, 2],
          [3, 4],
        ],
        [
          [5, 6],
          [7, 8],
        ],
      ]

      expect(exp(a)).toEqual([
        [
          [2.718281828459045, 7.38905609893065],
          [20.085536923187668, 54.598150033144236],
        ],
        [
          [148.4131591025766, 403.4287934927351],
          [1096.6331584284585, 2980.9579870417283],
        ],
      ])
    })
  })
})