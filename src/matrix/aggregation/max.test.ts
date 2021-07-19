import { max } from './max'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('max', () => {
  it('0x2 matrix', () => {
    expect(max(matrix0x2)).toBe(2)
    expect(max(matrix0x2, 0)).toBe(2)
  })

  it('3x2 matrix', () => {
    expect(max(matrix3x2)).toEqual(6)
    expect(max(matrix3x2, 0)).toEqual([5, 6])
    expect(max(matrix3x2, 1)).toEqual([2, 4, 6])
    expect(max(matrix3x2, 0, 1)).toEqual(6)
    expect(max(matrix3x2, 1, 0)).toEqual(6)
  })

  it('2x2x2 matrix', () => {
    expect(max(matrix2x2x2)).toEqual(8)
    expect(max(matrix2x2x2, 0)).toEqual([[5, 6], [7, 8]])
    expect(max(matrix2x2x2, 1)).toEqual([[3, 4], [7, 8]])
    expect(max(matrix2x2x2, 2)).toEqual([[2, 4], [6, 8]])
    expect(max(matrix2x2x2, 0, 1)).toEqual([7, 8])
    expect(max(matrix2x2x2, 0, 2)).toEqual([6, 8])
    expect(max(matrix2x2x2, 1, 0)).toEqual([7, 8])
    expect(max(matrix2x2x2, 1, 2)).toEqual([4, 8])
    expect(max(matrix2x2x2, 2, 0)).toEqual([6, 8])
    expect(max(matrix2x2x2, 2, 1)).toEqual([4, 8])
    expect(max(matrix2x2x2, 0, 1, 2)).toEqual(8)
    expect(max(matrix2x2x2, 0, 2, 1)).toEqual(8)
    expect(max(matrix2x2x2, 1, 0, 2)).toEqual(8)
    expect(max(matrix2x2x2, 1, 2, 0)).toEqual(8)
    expect(max(matrix2x2x2, 2, 0, 1)).toEqual(8)
    expect(max(matrix2x2x2, 2, 1, 0)).toEqual(8)
  })
})
