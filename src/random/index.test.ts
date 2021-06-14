import * as random from '.'

describe('random', () => {
  describe('#randn', () => {
    const { randn } = random
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

  describe('#rand', () => {
    const { rand } = random
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('returns correct random value', () => {
      const randomSpy = spyOn(random, 'random')

      randomSpy.and.returnValue(0.2)
      expect(rand()).toBe(0.5544143665919695)

      randomSpy.and.returnValue(0.4)
      expect(rand()).toBe(-1.0951895451525855)

      randomSpy.and.returnValue(0.6)
      expect(rand()).toBe(-0.8177282083136579)

      randomSpy.and.returnValue(0.8)
      expect(rand()).toBe(0.20643794737362572)
    })
  })
})
