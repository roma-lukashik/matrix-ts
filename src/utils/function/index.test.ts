import { constant, error, identity, isDefined } from '.'

describe('function', () => {
  describe('#identity', () => {
    it('returns a passed argument', () => {
      const object = {}
      expect(identity(object)).toBe(object)
      expect(identity(object, 1, 2)).toBe(object)
    })
  })

  describe('#constant', () => {
    it('creates a function that returns passed value', () => {
      const object = {}
      const returnObject = constant(object)
      expect(returnObject()).toBe(object)
      expect(returnObject(1, 2)).toBe(object)
    })
  })

  describe('#error', () => {
    it('throws an error with a passed message', () => {
      expect(() => error('This is an error.')).toThrowError('This is an error.')
    })
  })

  describe('#isDefined', () => {
    it('returns true', () => {
      expect(isDefined(0)).toBe(true)
      expect(isDefined([])).toBe(true)
      expect(isDefined({})).toBe(true)
      expect(isDefined('')).toBe(true)
      expect(isDefined(false)).toBe(true)
      expect(isDefined(NaN)).toBe(true)
    })

    it('returns false', () => {
      expect(isDefined(null)).toBe(false)
      expect(isDefined(undefined)).toBe(false)
    })
  })
})
