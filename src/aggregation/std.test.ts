import { std } from './std'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('#std', () => {
  it('0x2 matrix', () => {
    expect(std(matrix0x2)).toBe(0.5)
    expect(std(matrix0x2, 0)).toBe(0.5)
  })

  it('3x2 matrix', () => {
    expect(std(matrix3x2)).toEqualMatrix(1.708)
    expect(std(matrix3x2, 0)).toEqualMatrix([1.633, 1.633])
    expect(std(matrix3x2, 1)).toEqualMatrix([0.5, 0.5, 0.5])
    expect(std(matrix3x2, 0, 1)).toEqualMatrix(1.708)
    expect(std(matrix3x2, 1, 0)).toEqualMatrix(1.708)
  })

  it('2x2x2 matrix', () => {
    expect(std(matrix2x2x2)).toEqualMatrix(2.291)
    expect(std(matrix2x2x2, 0)).toEqualMatrix([[2, 2], [2, 2]])
    expect(std(matrix2x2x2, 1)).toEqualMatrix([[1, 1], [1, 1]])
    expect(std(matrix2x2x2, 2)).toEqualMatrix([[0.5, 0.5], [0.5, 0.5]])
    expect(std(matrix2x2x2, 0, 1)).toEqualMatrix([2.236, 2.236])
    expect(std(matrix2x2x2, 0, 2)).toEqualMatrix([2.062, 2.062])
    expect(std(matrix2x2x2, 1, 0)).toEqualMatrix([2.236, 2.236])
    expect(std(matrix2x2x2, 1, 2)).toEqualMatrix([1.118, 1.118])
    expect(std(matrix2x2x2, 2, 0)).toEqualMatrix([2.062, 2.062])
    expect(std(matrix2x2x2, 2, 1)).toEqualMatrix([1.118, 1.118])
    expect(std(matrix2x2x2, 0, 1, 2)).toEqualMatrix(2.291)
    expect(std(matrix2x2x2, 0, 2, 1)).toEqualMatrix(2.291)
    expect(std(matrix2x2x2, 1, 0, 2)).toEqualMatrix(2.291)
    expect(std(matrix2x2x2, 1, 2, 0)).toEqualMatrix(2.291)
    expect(std(matrix2x2x2, 2, 0, 1)).toEqualMatrix(2.291)
    expect(std(matrix2x2x2, 2, 1, 0)).toEqualMatrix(2.291)
  })
})
