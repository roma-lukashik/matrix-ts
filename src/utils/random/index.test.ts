import * as random from '.'

describe('random', () => {
  describe('#normal', () => {
    const { normal } = random
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('returns correct random value', () => {
      const randomSpy = spyOn(random, 'random')

      randomSpy.and.returnValue(0.2)
      expect(normal()).toBe(0.5544143665919695)

      randomSpy.and.returnValue(0.4)
      expect(normal()).toBe(-1.0951895451525855)

      randomSpy.and.returnValue(0.6)
      expect(normal()).toBe(-0.8177282083136579)

      randomSpy.and.returnValue(0.8)
      expect(normal()).toBe(0.20643794737362572)
    })
  })
})
