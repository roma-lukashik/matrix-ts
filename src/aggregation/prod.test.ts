import { prod } from './prod'
import { arange } from '../creation'
import { reshape } from '../geometry'

const matrix0x2 = arange(1, 3)
const matrix3x2 = reshape(arange(1, 7), [3, 2])
const matrix2x2x2 = reshape(arange(1, 9), [2, 2, 2])

describe('prod', () => {
  it('0x2 matrix', () => {
    expect(prod(matrix0x2)).toBe(2)
    expect(prod(matrix0x2, 0)).toBe(2)
  })

  it('3x2 matrix', () => {
    expect(prod(matrix3x2)).toEqual(720)
    expect(prod(matrix3x2, 0)).toEqual([15, 48])
    expect(prod(matrix3x2, 1)).toEqual([2, 12, 30])
    expect(prod(matrix3x2, 0, 1)).toEqual(720)
    expect(prod(matrix3x2, 1, 0)).toEqual(720)
  })

  it('2x2x2 matrix', () => {
    expect(prod(matrix2x2x2)).toEqual(40320)
    expect(prod(matrix2x2x2, 0)).toEqual([[5, 12], [21, 32]])
    expect(prod(matrix2x2x2, 1)).toEqual([[3, 8], [35, 48]])
    expect(prod(matrix2x2x2, 2)).toEqual([[2, 12], [30, 56]])
    expect(prod(matrix2x2x2, 0, 1)).toEqual([105, 384])
    expect(prod(matrix2x2x2, 0, 2)).toEqual([60, 672])
    expect(prod(matrix2x2x2, 1, 0)).toEqual([105, 384])
    expect(prod(matrix2x2x2, 1, 2)).toEqual([24, 1680])
    expect(prod(matrix2x2x2, 2, 0)).toEqual([60, 672])
    expect(prod(matrix2x2x2, 2, 1)).toEqual([24, 1680])
    expect(prod(matrix2x2x2, 0, 1, 2)).toEqual(40320)
    expect(prod(matrix2x2x2, 1, 0, 2)).toEqual(40320)
    expect(prod(matrix2x2x2, 1, 2, 0)).toEqual(40320)
    expect(prod(matrix2x2x2, 2, 0, 1)).toEqual(40320)
    expect(prod(matrix2x2x2, 2, 1, 0)).toEqual(40320)
  })
})
