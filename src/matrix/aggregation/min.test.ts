import { min } from './min'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('min', () => {
  it('0x2 matrix', () => {
    expect(min(matrix0x2)).toBe(1)
    expect(min(matrix0x2, 0)).toBe(1)
  })

  it('3x2 matrix', () => {
    expect(min(matrix3x2)).toEqual(1)
    expect(min(matrix3x2, 0)).toEqual([1, 2])
    expect(min(matrix3x2, 1)).toEqual([1, 3, 5])
    expect(min(matrix3x2, 0, 1)).toEqual(1)
    expect(min(matrix3x2, 1, 0)).toEqual(1)
  })

  it('2x2x2 matrix', () => {
    expect(min(matrix2x2x2)).toEqual(1)
    expect(min(matrix2x2x2, 0)).toEqual([[1, 2], [3, 4]])
    expect(min(matrix2x2x2, 1)).toEqual([[1, 2], [5, 6]])
    expect(min(matrix2x2x2, 2)).toEqual([[1, 3], [5, 7]])
    expect(min(matrix2x2x2, 0, 1)).toEqual([1, 2])
    expect(min(matrix2x2x2, 0, 2)).toEqual([1, 3])
    expect(min(matrix2x2x2, 1, 0)).toEqual([1, 2])
    expect(min(matrix2x2x2, 1, 2)).toEqual([1, 5])
    expect(min(matrix2x2x2, 2, 0)).toEqual([1, 3])
    expect(min(matrix2x2x2, 2, 1)).toEqual([1, 5])
    expect(min(matrix2x2x2, 0, 1, 2)).toEqual(1)
    expect(min(matrix2x2x2, 0, 2, 1)).toEqual(1)
    expect(min(matrix2x2x2, 1, 0, 2)).toEqual(1)
    expect(min(matrix2x2x2, 1, 2, 0)).toEqual(1)
    expect(min(matrix2x2x2, 2, 0, 1)).toEqual(1)
    expect(min(matrix2x2x2, 2, 1, 0)).toEqual(1)
  })
})
