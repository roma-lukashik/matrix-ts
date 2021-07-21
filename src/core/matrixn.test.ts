import { matrixn } from './matrixn'

describe('matrixn', () => {
  it('returns a passed matrix is it has 1 dimension', () => {
    expect(matrixn([0, 1])).toEqual([0, 1])
  })

  it('returns a passed matrix is it has 2 dimension', () => {
    expect(matrixn([[0, 1]])).toEqual([[0, 1]])
  })

  it('returns a passed matrix is it has 5 dimension', () => {
    expect(matrixn([[[[[0, 1]]]]])).toEqual([[[[[0, 1]]]]])
  })

  it('throws an error is matrix is scalar', () => {
    expect(() => matrixn(2)).toThrowError('Value 2 is not an instance of MatrixN')
  })
})
