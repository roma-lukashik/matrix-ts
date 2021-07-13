import { constant, defined, error, identity, nullish } from '.'

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

  describe('#defined', () => {
    it('returns false', () => {
      expect(defined(null)).toBe(false)
      expect(defined(undefined)).toBe(false)
    })

    it('returns true', () => {
      expect(defined(0)).toBe(true)
      expect(defined([])).toBe(true)
      expect(defined({})).toBe(true)
      expect(defined('')).toBe(true)
      expect(defined(false)).toBe(true)
      expect(defined(NaN)).toBe(true)
    })
  })

  describe('#nullish', () => {
    it('returns true', () => {
      expect(nullish(null)).toBe(true)
      expect(nullish(undefined)).toBe(true)
    })

    it('returns false', () => {
      expect(nullish(0)).toBe(false)
      expect(nullish([])).toBe(false)
      expect(nullish({})).toBe(false)
      expect(nullish('')).toBe(false)
      expect(nullish(false)).toBe(false)
      expect(nullish(NaN)).toBe(false)
    })
  })
})
