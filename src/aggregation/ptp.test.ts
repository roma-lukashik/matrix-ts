import { ptp } from './ptp'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('ptp', () => {
  it('0x2 matrix', () => {
    expect(ptp(matrix0x2)).toBe(1)
    expect(ptp(matrix0x2, 0)).toBe(1)
  })

  it('3x2 matrix', () => {
    expect(ptp(matrix3x2)).toEqual(5)
    expect(ptp(matrix3x2, 0)).toEqual([4, 4])
    expect(ptp(matrix3x2, 1)).toEqual([1, 1, 1])
    expect(ptp(matrix3x2, 0, 1)).toEqual(5)
    expect(ptp(matrix3x2, 1, 0)).toEqual(5)
  })

  it('2x2x2 matrix', () => {
    expect(ptp(matrix2x2x2)).toEqual(7)
    expect(ptp(matrix2x2x2, 0)).toEqual([[4, 4], [4, 4]])
    expect(ptp(matrix2x2x2, 1)).toEqual([[2, 2], [2, 2]])
    expect(ptp(matrix2x2x2, 2)).toEqual([[1, 1], [1, 1]])
    expect(ptp(matrix2x2x2, 0, 1)).toEqual([6, 6])
    expect(ptp(matrix2x2x2, 0, 2)).toEqual([5, 5])
    expect(ptp(matrix2x2x2, 1, 0)).toEqual([6, 6])
    expect(ptp(matrix2x2x2, 1, 2)).toEqual([3, 3])
    expect(ptp(matrix2x2x2, 2, 0)).toEqual([5, 5])
    expect(ptp(matrix2x2x2, 2, 1)).toEqual([3, 3])
    expect(ptp(matrix2x2x2, 0, 1, 2)).toEqual(7)
    expect(ptp(matrix2x2x2, 0, 2, 1)).toEqual(7)
    expect(ptp(matrix2x2x2, 1, 0, 2)).toEqual(7)
    expect(ptp(matrix2x2x2, 1, 2, 0)).toEqual(7)
    expect(ptp(matrix2x2x2, 2, 0, 1)).toEqual(7)
    expect(ptp(matrix2x2x2, 2, 1, 0)).toEqual(7)
  })
})
