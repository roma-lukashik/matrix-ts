import { sum } from './sum'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('sum', () => {
  it('0x2 matrix', () => {
    expect(sum(matrix0x2)).toBe(3)
    expect(sum(matrix0x2, 0)).toBe(3)
  })

  it('3x2 matrix', () => {
    expect(sum(matrix3x2)).toEqual(21)
    expect(sum(matrix3x2, 0)).toEqual([9, 12])
    expect(sum(matrix3x2, 1)).toEqual([3, 7, 11])
    expect(sum(matrix3x2, 0, 1)).toEqual(21)
    expect(sum(matrix3x2, 1, 0)).toEqual(21)
  })

  it('2x2x2 matrix', () => {
    expect(sum(matrix2x2x2)).toEqual(36)
    expect(sum(matrix2x2x2, 0)).toEqual([[6, 8], [10, 12]])
    expect(sum(matrix2x2x2, 1)).toEqual([[4, 6], [12, 14]])
    expect(sum(matrix2x2x2, 2)).toEqual([[3, 7], [11, 15]])
    expect(sum(matrix2x2x2, 0, 1)).toEqual([16, 20])
    expect(sum(matrix2x2x2, 0, 2)).toEqual([14, 22])
    expect(sum(matrix2x2x2, 1, 0)).toEqual([16, 20])
    expect(sum(matrix2x2x2, 1, 2)).toEqual([10, 26])
    expect(sum(matrix2x2x2, 2, 0)).toEqual([14, 22])
    expect(sum(matrix2x2x2, 2, 1)).toEqual([10, 26])
    expect(sum(matrix2x2x2, 0, 1, 2)).toEqual(36)
    expect(sum(matrix2x2x2, 1, 0, 2)).toEqual(36)
    expect(sum(matrix2x2x2, 1, 2, 0)).toEqual(36)
    expect(sum(matrix2x2x2, 2, 0, 1)).toEqual(36)
    expect(sum(matrix2x2x2, 2, 1, 0)).toEqual(36)
  })
})
