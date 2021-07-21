import { matrix0 } from './matrix0'

describe('matrix0', () => {
  it('returns a passed matrix is it has zero dimension', () => {
    expect(matrix0(3)).toEqual(3)
  })

  it('throws an error is matrix has one dimension', () => {
    expect(() => matrix0([0, 1])).toThrowError('Value is not an instance of Matrix0')
  })

  it('throws an error is matrix has 2 dimensions', () => {
    expect(() => matrix0([[0, 1]])).toThrowError('Value is not an instance of Matrix0')
  })
})
