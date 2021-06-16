import { constant, error, identity } from '.'

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
})
