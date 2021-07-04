import { round } from '.'

describe('math', () => {
  describe('#round', () => {
    it('rounds a number to nearest integer', () => {
      expect(round(1.49)).toBe(1)
      expect(round(1.51)).toBe(2)
      expect(round(1.5)).toBe(2)
    })

    it('rounds a number with precision', () => {
      expect(round(1.49, 0.1)).toBe(1.5)
      expect(round(1.51, 0.01)).toBe(1.51)
      expect(round(1.1234, 0.001)).toBe(1.123)
    })
  })
})
