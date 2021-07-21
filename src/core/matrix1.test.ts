import { matrix1 } from './matrix1'

describe('matrix1', () => {
  it('returns a passed matrix is it has only one dimension', () => {
    expect(matrix1([0, 1])).toEqual([0, 1])
  })

  it('throws an error is matrix has zero dimension', () => {
    expect(() => matrix1(3)).toThrowError('Value is not an instance of Matrix1')
  })

  it('throws an error is matrix has 2 dimensions', () => {
    expect(() => matrix1([[0, 1]])).toThrowError('Value is not an instance of Matrix1')
  })
})
