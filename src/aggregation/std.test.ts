import { std } from './std'
import { arange } from '../creation/arange'
import { reshape } from '../geometry/reshape'

describe('std', () => {
  it('0x2 matrix', () => {
    const m = arange(1, 3)
    expect(std(m)).toBe(0.5)
    expect(std(m, 0)).toBe(0.5)
  })

  it('3x2 matrix', () => {
    const m = reshape(arange(1, 7), [3, 2])
    expect(std(m)).toEqualMatrix(1.708)
    expect(std(m, 0)).toEqualMatrix([1.633, 1.633])
    expect(std(m, 1)).toEqualMatrix([0.5, 0.5, 0.5])
    expect(std(m, 0, 1)).toEqualMatrix(1.708)
    expect(std(m, 1, 0)).toEqualMatrix(1.708)
  })

  it('2x2x2 matrix', () => {
    const m = reshape(arange(1, 9), [2, 2, 2])
    expect(std(m)).toEqualMatrix(2.291)
    expect(std(m, 0)).toEqualMatrix([[2, 2], [2, 2]])
    expect(std(m, 1)).toEqualMatrix([[1, 1], [1, 1]])
    expect(std(m, 2)).toEqualMatrix([[0.5, 0.5], [0.5, 0.5]])
    expect(std(m, 0, 1)).toEqualMatrix([2.236, 2.236])
    expect(std(m, 0, 2)).toEqualMatrix([2.062, 2.062])
    expect(std(m, 1, 0)).toEqualMatrix([2.236, 2.236])
    expect(std(m, 1, 2)).toEqualMatrix([1.118, 1.118])
    expect(std(m, 2, 0)).toEqualMatrix([2.062, 2.062])
    expect(std(m, 2, 1)).toEqualMatrix([1.118, 1.118])
    expect(std(m, 0, 1, 2)).toEqualMatrix(2.291)
    expect(std(m, 0, 2, 1)).toEqualMatrix(2.291)
    expect(std(m, 1, 0, 2)).toEqualMatrix(2.291)
    expect(std(m, 1, 2, 0)).toEqualMatrix(2.291)
    expect(std(m, 2, 0, 1)).toEqualMatrix(2.291)
    expect(std(m, 2, 1, 0)).toEqualMatrix(2.291)
  })
})
