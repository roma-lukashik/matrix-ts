import { arange } from './arange'

describe('arange', () => {
  it('returns an array from 0 to 5', () => {
    expect(arange(6)).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('returns an array from 1 to 5', () => {
    expect(arange(1, 6)).toEqual([1, 2, 3, 4, 5])
  })

  it('throws an error if start is greater than end', () => {
    expect(() => arange(6, 1)).toThrowError('Start (6) cannot be greater than end (1).')
  })
})
