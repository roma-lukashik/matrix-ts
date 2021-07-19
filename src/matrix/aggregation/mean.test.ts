import { mean } from './mean'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('mean', () => {
  it('0x2 matrix', () => {
    expect(mean(matrix0x2)).toBe(1.5)
    expect(mean(matrix0x2, 0)).toBe(1.5)
  })

  it('3x2 matrix', () => {
    expect(mean(matrix3x2)).toEqual(3.5)
    expect(mean(matrix3x2, 0)).toEqual([3, 4])
    expect(mean(matrix3x2, 1)).toEqual([1.5, 3.5, 5.5])
    expect(mean(matrix3x2, 0, 1)).toEqual(3.5)
    expect(mean(matrix3x2, 1, 0)).toEqual(3.5)
  })

  it('2x2x2 matrix', () => {
    expect(mean(matrix2x2x2)).toEqual(4.5)
    expect(mean(matrix2x2x2, 0)).toEqual([[3, 4], [5, 6]])
    expect(mean(matrix2x2x2, 1)).toEqual([[2, 3], [6, 7]])
    expect(mean(matrix2x2x2, 2)).toEqual([[1.5, 3.5], [5.5, 7.5]])
    expect(mean(matrix2x2x2, 0, 1)).toEqual([4, 5])
    expect(mean(matrix2x2x2, 0, 2)).toEqual([3.5, 5.5])
    expect(mean(matrix2x2x2, 1, 0)).toEqual([4, 5])
    expect(mean(matrix2x2x2, 1, 2)).toEqual([2.5, 6.5])
    expect(mean(matrix2x2x2, 2, 0)).toEqual([3.5, 5.5])
    expect(mean(matrix2x2x2, 2, 1)).toEqual([2.5, 6.5])
    expect(mean(matrix2x2x2, 0, 1, 2)).toEqual(4.5)
    expect(mean(matrix2x2x2, 0, 2, 1)).toEqual(4.5)
    expect(mean(matrix2x2x2, 1, 0, 2)).toEqual(4.5)
    expect(mean(matrix2x2x2, 1, 2, 0)).toEqual(4.5)
    expect(mean(matrix2x2x2, 2, 0, 1)).toEqual(4.5)
    expect(mean(matrix2x2x2, 2, 1, 0)).toEqual(4.5)
  })
})
